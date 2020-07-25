import ContainerInformation from './ContainerInformation';

export default class DockerComposeFile {
  public FileInfo: File;

  public FileName: string;

  public Name: string;

  public Services: Map<string, ContainerInformation>;

  constructor(fileInfo: File, name = '') {
    this.FileInfo = fileInfo;
    this.FileName = this.FileInfo.name;
    this.Name = name;
    this.Services = new Map();
  }

  public GetServicesList(): ContainerInformation[] {
    return Array.from(this.Services, ([, value]) => value);
  }
}
