import React, { useState } from 'react';
import { Paper, List, Typography, TextField, Grid } from '@material-ui/core';
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

  const filterByName = (container: ContainerInformation) =>
    filter.length === 0 || container.Name.indexOf(filter) > -1;

  const containersList = Array.from(containers.values());
  if (containersList.length <= 0) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <TextField
          id="service-filter"
          label="Filter containers"
          type="search"
          value={filter}
          onChange={onFilterChange}
        />
      </Grid>
      <Grid item xs={12}>
        <List component="nav" aria-label="docker-services">
          {containersList
            .filter(filterByName)
            .sort(sortByName)
            .map(service => (
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
