import React, { SyntheticEvent } from 'react';
import path from 'path';
import DockerServices from '../../lib/docker-compose';
import DockerActionsWrapper from './DockerActionsWrapper';
import DockerComposeFile from '../../lib/docker-compose/DockerComposeFile';
import { EnvironmentDefinition } from '../../lib/environments';
import ServiceViews from './ServiceViews';

export type OnSelectedCallback = (
  event: SyntheticEvent<HTMLButtonElement, Event>
) => void;

type Props = {
  environment: EnvironmentDefinition;
  environmentConfigPath: string;
  view: string;
};

function getDockerServices(
  dockerComposeFiles: DockerComposeFile[],
  environmentConfigPath: string
) {
  const files = dockerComposeFiles.map(d => d.filePath);
  const { dir } = path.parse(environmentConfigPath);

  return new DockerServices({
    cwd: dir,
    config: files
  });
}

export default function ServicesView({
  view,
  environment,
  environmentConfigPath
}: Props) {
  if (view === ServiceViews.GROUPED) {
    const serviceLists = environment.files.map(f => {
      const dockerServices = getDockerServices([f], environmentConfigPath);
      return (
        <DockerActionsWrapper
          key={f.filePath}
          view={view}
          listName={f.name}
          dockerServices={dockerServices}
          environmentConfigPath={environmentConfigPath}
        />
      );
    });

    return serviceLists;
  }

  if (view === ServiceViews.A_TO_Z) {
    const dockerServices = getDockerServices(
      environment.files,
      environmentConfigPath
    );
    return (
      <DockerActionsWrapper
        view={view}
        listName="A to Z of services"
        dockerServices={dockerServices}
        environmentConfigPath={environmentConfigPath}
      />
    );
  }

  return <div>No view available</div>;
}
