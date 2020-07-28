import React, { useState, useEffect } from 'react';
import DockerServices from '../../lib/docker-compose';
import ContainerInformation, {
  ContainerStatus
} from '../../lib/docker-compose/ContainerInformation';
import GroupList from './GroupList';
import ServiceViews from './ServiceViews';
import AtoZList from './AtoZList';

type Props = {
  dockerServices: DockerServices;
  environmentConfigPath: string;
  view: string;
  listName: string;
};

export default function DockerActionsWrapper({
  dockerServices,
  view,
  listName
}: Props) {
  const [containers, setContainers] = useState(
    new Map<string, ContainerInformation>()
  );

  const [refresh, setRefresh] = useState(0);

  const loadInfo = async () => {
    const list = await dockerServices.getContainerInformation(
      new Map(containers)
    );
    setContainers(list);
  };

  useEffect(() => {
    loadInfo();
  }, [refresh]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setRefresh(refresh + 1);
    }, 10000);

    return () => clearTimeout(timer);
  });

  const onSelected = (serviceName: string) => {
    const updatedContainers = new Map(containers);
    const containerInfo = updatedContainers.get(serviceName);
    if (containerInfo) {
      containerInfo.Selected = !containerInfo.Selected;
    }
    setContainers(updatedContainers);
  };

  const onAllSelected = (selectedState: boolean) => {
    const updatedContainers = new Map<string, ContainerInformation>();

    containers.forEach((value, key) => {
      const info = value;
      info.Selected = selectedState;
      updatedContainers.set(key, info);
    });

    setContainers(updatedContainers);
  };

  const onStartStop = async (service: ContainerInformation) => {
    if (service.Status === ContainerStatus.Stopped) {
      await dockerServices.startService(service.Name);
      return;
    }

    await dockerServices.stopService(service.Name);
  };

  const onPull = async (service: ContainerInformation) => {
    console.log(`Pull image for service ${service.Name}`);
  };

  const onBuild = async (service: ContainerInformation) => {
    console.log(`Build image for service ${service.Name}`);
  };

  const onStartAll = async () => {
    dockerServices.startServices(Array.from(containers.keys()));
  };

  const onStopAll = async () => {
    dockerServices.stopServices(Array.from(containers.keys()));
  };

  const onRefresh = () => {
    setRefresh(refresh + 1);
  };

  const getServiceView = () => {
    if (view === ServiceViews.GROUPED) {
      return GroupList;
    }

    // Defaults to A to Z
    return AtoZList;
  };

  const ViewComponent = getServiceView();

  return (
    <ViewComponent
      onSelected={onSelected}
      onStartStop={onStartStop}
      onPull={onPull}
      onBuild={onBuild}
      onStartAll={onStartAll}
      onStopAll={onStopAll}
      onAllSelected={onAllSelected}
      onRefresh={onRefresh}
      containers={containers}
      name={listName}
    />
  );
}
