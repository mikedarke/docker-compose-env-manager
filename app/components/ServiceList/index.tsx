import React, { useState, useEffect, SyntheticEvent } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import DockerServices from '../../lib/docker-compose';
import ServiceListItem from './ServiceListItem';
import ContainerInformation, {
  ContainerStatus
} from '../../lib/docker-compose/ContainerInformation';
import ServiceBar from './ServiceBar';
import DockerComposeFile from '../../lib/docker-compose/DockerComposeFile';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%'
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  },
  flexContainer: {
    flex: 'auto'
  }
}));

export type OnSelectedCallback = (
  event: SyntheticEvent<HTMLButtonElement, Event>
) => void;

type Props = {
  dockerCompose: DockerComposeFile;
};

export default function ServicesList({ dockerCompose }: Props) {
  const classes = useStyles();
  const [containers, setContainers] = useState(
    new Map<string, ContainerInformation>()
  );

  const [refresh, setRefresh] = useState(0);

  const dockerServices: DockerServices = new DockerServices({
    cwd: dockerCompose.FileInfo.path.substring(
      0,
      dockerCompose.FileInfo.path.lastIndexOf('/')
    ),
    config: [dockerCompose.FileInfo.name]
  });

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
  }, []);

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

  const onStartAll = async () => {
    dockerServices.startServices(Array.from(containers.keys()));
  };

  const onStopAll = async () => {
    dockerServices.stopServices(Array.from(containers.keys()));
  };

  const onRefresh = () => {
    setRefresh(refresh + 1);
  };

  return (
    <Paper>
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="docker-services"
          id="docker-services-header"
        >
          <ServiceBar
            name={dockerCompose.Name}
            onStartAllClicked={onStartAll}
            onStopAllClicked={onStopAll}
            onRefreshClicked={onRefresh}
            onSelectAllClicked={onAllSelected}
            containers={containers}
          />
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <List
            component="nav"
            aria-label="docker-services"
            className={classes.flexContainer}
          >
            {Array.from(containers.values()).map(service => (
              <ServiceListItem
                key={service.Name}
                containerInfo={service}
                checked={service.Selected}
                onSelected={onSelected}
                onStartStopClicked={onStartStop}
              />
            ))}
          </List>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </Paper>
  );
}
