export default class DockerComposeFile {
  public fileName: string;

  public filePath: string;

  public name: string;

  constructor(fileName: string, filePath: string, name = '') {
    this.filePath = filePath;
    this.fileName = fileName;
    this.name = name;
  }
}
