import React, { useState } from 'react';
import {
  Paper,
  List,
  Typography,
  Container,
  TextField,
  Grid
} from '@material-ui/core';
import ServiceListItem from './ServiceListItem';
import { ServiceListProps } from './types';
import ContainerInformation from '../../lib/docker-compose/ContainerInformation';

export default function AtoZList(props: ServiceListProps) {
  const { onStartStop, onPull, onBuild, onSelected, containers } = props;
  const [filter, setFilter] = useState('');

  const onFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFilter = event.target.value;
    setFilter(newFilter);
  };

  const sortByName = (a: ContainerInformation, b: ContainerInformation) =>
    a.Name <= b.Name ? -1 : 1;

  const containersList = Array.from(containers.values());
  if (containersList.length <= 0) {
    return <Typography variant="h3">Loading...</Typography>;
  }

  return (
    <Grid spacing={3}>
      <Grid xs={12}>
        <TextField
          id="service-filter"
          label="Filter containers"
          type="search"
          value={filter}
          onChange={onFilterChange}
        />
      </Grid>
      <Grid xs={12}>
        <List component="nav" aria-label="docker-services">
          {containersList.sort(sortByName).map(service => (
            <Paper key={service.Name}>
              <ServiceListItem
                containerInfo={service}
                checked={service.Selected}
                onSelected={onSelected}
                onStartStopClicked={onStartStop}
                onPull={onPull}
                onBuild={onBuild}
              />
            </Paper>
          ))}
        </List>
      </Grid>
    </Grid>
  );
}
