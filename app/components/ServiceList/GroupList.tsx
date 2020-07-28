import React from 'react';
import {
  Paper,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  List
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { makeStyles } from '@material-ui/core/styles';
import ServiceBar from './ServiceBar';
import ServiceListItem from './ServiceListItem';
import { ServiceListProps } from './types';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: '1ch'
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  },
  flexContainer: {
    flex: 'auto'
  }
}));

export default function GroupList(props: ServiceListProps) {
  const classes = useStyles();

  const {
    onSelected,
    onStartStop,
    onPull,
    onBuild,
    onStartAll,
    onStopAll,
    onAllSelected,
    onRefresh,
    containers,
    name
  } = props;

  return (
    <Paper className={classes.root}>
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="docker-services"
          id="docker-services-header"
        >
          <ServiceBar
            name={name}
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
                onPull={onPull}
                onBuild={onBuild}
              />
            ))}
          </List>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </Paper>
  );
}
