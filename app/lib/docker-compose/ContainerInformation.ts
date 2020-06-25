export enum ContainerStatus {
  Started = 0,
  Stopped,
  Starting,
  Stopping
}

export default class ContainerInformation {
  public Name: string;

  public Status: ContainerStatus;

  public Selected: boolean;

  constructor() {
    this.Name = 'Unknown';
    this.Selected = false;
    this.Status = ContainerStatus.Stopped;
  }
}
