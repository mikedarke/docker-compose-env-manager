import React from 'react';
import Grid from '@material-ui/core/Grid';
import ServiceList from '../components/ServiceList';
import { useEnvironmentContext } from '../contexts/EnvironmentContext';

export default function ServicesPage() {
  const { environment } = useEnvironmentContext();
  console.log('Using environment: ', environment);

  return (
    <Grid container xs={12} spacing={3}>
      <Grid item xs={12} sm={12}>
        <h2>{environment.name}</h2>
      </Grid>
      <Grid item xs={12} sm={6}>
        {environment.files.map(f => (
          <ServiceList key={f.FileInfo.path} dockerCompose={f} />
        ))}
      </Grid>
    </Grid>
  );
}
