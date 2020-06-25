import ContainerInformation from './ContainerInformation';

export default class ContainerGroup {
  public FileName: string;

  public GroupName: string;

  public Services: Map<string, ContainerInformation>;

  constructor() {
    this.FileName = 'docker-compose.yml';
    this.GroupName = this.FileName;
    this.Services = new Map<string, ContainerInformation>();
  }

  static GetServicesList(
    services: Map<string, ContainerInformation>
  ): ContainerInformation[] {
    return Array.from(services, ([key, value]) => value);
  }
}
