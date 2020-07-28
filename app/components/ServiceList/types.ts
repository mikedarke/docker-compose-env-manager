import ContainerInformation from '../../lib/docker-compose/ContainerInformation';

export type ServiceListProps = {
  onStartStop: Function;
  onSelected: Function;
  onPull: Function;
  onBuild: Function;
  onStartAll: Function;
  onStopAll: Function;
  onAllSelected: Function;
  onRefresh: Function;
  containers: Map<string, ContainerInformation>;
  name: string;
};
