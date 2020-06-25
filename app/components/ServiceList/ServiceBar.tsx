import React, { FunctionComponent } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import RefreshIcon from '@material-ui/icons/Refresh';
import PlayCircleFilledWhiteIcon from '@material-ui/icons/PlayCircleFilledWhite';
import StopIcon from '@material-ui/icons/Stop';
import ContainerGroup from '../../lib/docker-compose/ContainerGroup';
import { ContainerStatus } from '../../lib/docker-compose/ContainerInformation';

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
  containerGroup: ContainerGroup;
  onStopAllClicked: Function;
  onStartAllClicked: Function;
  onRefreshClicked: Function;
};

export default function ServiceBar(props: Props) {
  const {
    containerGroup,
    onStopAllClicked,
    onStartAllClicked,
    onRefreshClicked
  } = props;
  const classes = useStyles();

  const servicesList = ContainerGroup.GetServicesList(containerGroup.Services);
  const runningCount = servicesList.filter(
    s => s.Status === ContainerStatus.Started
  ).length;
  const runningCountMsg = `${runningCount}/${servicesList.length} running`;

  return (
    <div className={classes.root}>
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          {containerGroup.GroupName}
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
