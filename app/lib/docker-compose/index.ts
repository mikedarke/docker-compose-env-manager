import {
  configServices,
  ps,
  IDockerComposeOptions,
  upOne,
  upMany,
  stopOne
} from 'docker-compose';
import ContainerInformation, { ContainerStatus } from './ContainerInformation';

export default class DockerServices {
  options: IDockerComposeOptions;

  constructor(options: IDockerComposeOptions) {
    this.options = options;
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

  async getContainerInformation(
    containers = new Map<string, ContainerInformation>()
  ): Promise<Map<string, ContainerInformation>> {
    console.log('Getting services');
    const allServices = await this.getAllServices();
    const runningServices = await this.getRunningServices();

    allServices.forEach(serviceName => {
      const isRunning = DockerServices.isRunningService(
        runningServices,
        serviceName
      );

      const existingInfo = containers.get(serviceName);
      if (existingInfo) {
        existingInfo.Status = isRunning
          ? ContainerStatus.Started
          : ContainerStatus.Stopped;

        containers.set(serviceName, existingInfo);
        return;
      }

      const info: ContainerInformation = {
        Name: serviceName,
        Status: isRunning ? ContainerStatus.Started : ContainerStatus.Stopped,
        Selected: false
      };
      containers.set(serviceName, info);
    });

    return containers;
  }
}
