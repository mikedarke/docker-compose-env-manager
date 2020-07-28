import React, { useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import RefreshIcon from '@material-ui/icons/Refresh';
import PlayCircleFilledWhiteIcon from '@material-ui/icons/PlayCircleFilledWhite';
import StopIcon from '@material-ui/icons/Stop';
import ContainerInformation, {
  ContainerStatus
} from '../../lib/docker-compose/ContainerInformation';
import { ListItemIcon, Checkbox } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    },
    menuButton: {
      marginRight: theme.spacing(2)
    },
    title: {
      flexGrow: 1
    }
  })
);

type Props = {
  name: string;
  containers: Map<string, ContainerInformation>;
  onStopAllClicked: Function;
  onStartAllClicked: Function;
  onRefreshClicked: Function;
  onSelectAllClicked: Function;
};

export default function ServiceBar(props: Props) {
  const {
    name,
    containers,
    onStopAllClicked,
    onStartAllClicked,
    onRefreshClicked,
    onSelectAllClicked
  } = props;
  const classes = useStyles();
  const [allSelected, setAllSelected] = useState(false);

  const containerList = Array.from(containers.values());
  const runningCount = containerList.filter(
    c => c.Status === ContainerStatus.Started
  ).length;
  const runningCountMsg = `${runningCount}/${containerList.length} running`;

  return (
    <div className={classes.root}>
      <Toolbar>
        <ListItemIcon>
          <Checkbox
            edge="start"
            name="All"
            checked={allSelected}
            tabIndex={-1}
            disableRipple
            onChange={() => {
              console.log('Select all');
              setAllSelected(!allSelected);
              onSelectAllClicked(!allSelected);
            }}
            inputProps={{ 'aria-labelledby': 'Select All' }}
          />
        </ListItemIcon>
        <Typography variant="h6" className={classes.title}>
          {name}
        </Typography>
        <Typography variant="caption" className={classes.title}>
          {runningCountMsg}
        </Typography>
        {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
        <div
          onKeyPress={event => event.stopPropagation()}
          onClick={event => event.stopPropagation()}
          onFocus={event => event.stopPropagation()}
        >
          <IconButton
            onClick={() => onRefreshClicked()}
            edge="end"
            aria-label="refresh"
            key="refresh"
          >
            <RefreshIcon />
          </IconButton>
          <IconButton
            onClick={() => onStartAllClicked()}
            edge="end"
            aria-label="start/stop"
            key="startall"
          >
            <PlayCircleFilledWhiteIcon />
          </IconButton>
          <IconButton
            onClick={() => onStopAllClicked()}
            edge="end"
            aria-label="start/stop"
            key="stopall"
          >
            <StopIcon />
          </IconButton>
        </div>
      </Toolbar>
    </div>
  );
}
