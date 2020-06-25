import {
  configServices,
  ps,
  IDockerComposeOptions,
  upOne,
  upMany,
  stopOne
} from 'docker-compose';
import ContainerInformation, { ContainerStatus } from './ContainerInformation';
import ContainerGroup from './ContainerGroup';

const DockerComposeParser = (searchLocations: string[]) => {
  const ParseFile = (file: string) => {
    return {};
  };

  const FindDockerComposeFiles = (location: string): string[] => {
    return ['docker-compose.core.yml', 'docker-compose.transaction.yml'];
  };

  const ParseAll = (locations: string[]) => {
    const dockerComposeDetails = [];
    locations.forEach(location => {
      const files = FindDockerComposeFiles(location);
      files.forEach(file => {
        const instance = ParseFile(file);
        if (instance != null) {
          dockerComposeDetails.push(instance);
        }
      });
    });
  };

  ParseAll(searchLocations);
};

export class DockerServices {
  cwd: string;

  options: IDockerComposeOptions;

  constructor(cwd: string) {
    this.cwd = cwd;
    this.options = {
      cwd,
      config: ['docker-compose.yml']
    };
  }

  async getAllServices(): Promise<string[]> {
    const list = await configServices(this.options);
    return list.out.trim().split('\n');
  }

  async getRunningServices(): Promise<string[]> {
    const runningServiceResponse = await ps(this.options);
    const runningServiceList = runningServiceResponse.out
      .trim()
      .split('\n')
      .splice(2);

    const filteredList = runningServiceList.map(row => {
      const parts = row
        .split('   ')
        .filter(section => section.length > 0)
        .map(section => section.trim());
      return parts;
    });

    return filteredList.filter(s => s[2] === 'Up').map(s => s[0]);
  }

  async startService(serviceName: string) {
    await upOne(serviceName, this.options);
  }

  async stopService(serviceName: string) {
    await stopOne(serviceName, this.options);
  }

  async startServices(services: string[]) {
    upMany(services, this.options);
  }

  async stopServices(services: string[]) {
    services.forEach(async s => stopOne(s, this.options));
  }

  static isRunningService(
    runningServices: string[],
    serviceName: string
  ): boolean {
    const reg = new RegExp(`(^.*_${serviceName}_\\d{1,})`, 'g');
    const serviceStatus = runningServices.filter(s => s.match(reg)).shift();
    return !!(serviceStatus && serviceStatus?.length > 0);
  }

  async getServiceInformation(): Promise<ContainerGroup> {
    const allServices = await this.getAllServices();
    const runningServices = await this.getRunningServices();
    const containerGroup = new ContainerGroup();

    allServices.forEach(serviceName => {
      const isRunning = DockerServices.isRunningService(
        runningServices,
        serviceName
      );

      const info: ContainerInformation = {
        Name: serviceName,
        Status: isRunning ? ContainerStatus.Started : ContainerStatus.Stopped,
        Selected: false
      };
      containerGroup.Services.set(serviceName, info);
    });

    return containerGroup;
  }
}

export default DockerComposeParser;
