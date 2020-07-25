import DockerComposeFile from '../docker-compose/DockerComposeFile';

export default class EnvironmentDefinition {
  public name: string;

  public files: DockerComposeFile[];

  constructor() {
    this.name = '';
    this.files = [];
  }
}
