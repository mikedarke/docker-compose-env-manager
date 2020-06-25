import React, { useState, useEffect, SyntheticEvent } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import { DockerServices } from '../../lib/docker-compose';
import ServiceListItem from './ServiceListItem';
import { DockerComposeConfig } from '../../reducers/types';
import ContainerGroup from '../../lib/docker-compose/ContainerGroup';
import ContainerInformation, {
  ContainerStatus
} from '../../lib/docker-compose/ContainerInformation';
import ServiceBar from './ServiceBar';

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
  dockerCompose: DockerComposeConfig;
};

export default function ServicesList({ dockerCompose }: Props) {
  const classes = useStyles();
  const [containerGroup, setContainerGroup] = useState(new ContainerGroup());
  const [refresh, setRefresh] = useState(0);
  const { cwd } = dockerCompose;
  const dockerServices: DockerServices = new DockerServices(cwd);
  const servicesList = ContainerGroup.GetServicesList(containerGroup.Services);

  useEffect(() => {
    async function loadServiceInformation() {
      const list = await dockerServices.getServiceInformation();
      setContainerGroup(list);
    }
    loadServiceInformation();
  }, [refresh]);

  setTimeout(() => setRefresh(refresh + 1), 10000);

  const onSelected = (serviceName: string) => {
    const updatedServices = { ...containerGroup };
    const containerInfo = updatedServices.Services.get(serviceName);
    if (containerInfo) {
      containerInfo.Selected = !containerInfo.Selected;
    }
    setContainerGroup(updatedServices);
  };

  const onStartStop = async (service: ContainerInformation) => {
    if (service.Status === ContainerStatus.Stopped) {
      await dockerServices.startService(service.Name);
      return;
    }

    await dockerServices.stopService(service.Name);
  };

  const onStartAll = async () => {
    const list = servicesList.map(s => s.Name);
    dockerServices.startServices(list);
  };

  const onStopAll = async () => {
    const list = servicesList.map(s => s.Name);
    dockerServices.stopServices(list);
  };

  const onRefresh = () => {
    setRefresh(refresh + 1);
  };

  return (
    <Paper>
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <ServiceBar
            onStartAllClicked={onStartAll}
            onStopAllClicked={onStopAll}
            onRefreshClicked={onRefresh}
            containerGroup={containerGroup}
          />
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <List
            component="nav"
            aria-label="docker services"
            className={classes.flexContainer}
          >
            {servicesList.map(service => (
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
