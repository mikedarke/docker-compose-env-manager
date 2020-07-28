import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import PlayCircleFilledWhiteIcon from '@material-ui/icons/PlayCircleFilledWhite';
import GetAppIcon from '@material-ui/icons/GetApp';
import BuildIcon from '@material-ui/icons/Build';
import StopIcon from '@material-ui/icons/Stop';
import ContainerInformation, {
  ContainerStatus
} from '../../lib/docker-compose/ContainerInformation';

type Props = {
  containerInfo: ContainerInformation;
  checked: boolean;
  onSelected: Function;
  onStartStopClicked: Function;
  onPull: Function;
  onBuild: Function;
};

export default function ServiceListItem({
  containerInfo,
  checked,
  onSelected,
  onStartStopClicked,
  onPull,
  onBuild
}: Props) {
  const labelId = `checkbox-list-label-${containerInfo.Name}`;
  return (
    <ListItem>
      <ListItemIcon>
        <Checkbox
          edge="start"
          name={containerInfo.Name}
          checked={checked}
          tabIndex={-1}
          disableRipple
          onChange={() => {
            onSelected(containerInfo.Name);
          }}
          inputProps={{ 'aria-labelledby': labelId }}
        />
      </ListItemIcon>
      <ListItemText
        primary={containerInfo.Name}
        secondary={ContainerStatus[containerInfo.Status]}
      />
      <ListItemText primary="Image name" />
      <ListItemSecondaryAction>
        <IconButton
          onClick={() => onBuild(containerInfo)}
          edge="end"
          aria-label="start/stop"
        >
          <BuildIcon key={`build-${containerInfo.Name}`} />
        </IconButton>
        <IconButton
          onClick={() => onPull(containerInfo)}
          edge="end"
          aria-label="start/stop"
        >
          <GetAppIcon key={`pull-${containerInfo.Name}`} />
        </IconButton>
        <IconButton
          onClick={() => onStartStopClicked(containerInfo)}
          edge="end"
          aria-label="start/stop"
        >
          {containerInfo.Status === ContainerStatus.Stopped ? (
            <PlayCircleFilledWhiteIcon key={`start-${containerInfo.Name}`} />
          ) : (
            <StopIcon key={`stop-${containerInfo.Name}`} />
          )}
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
}
