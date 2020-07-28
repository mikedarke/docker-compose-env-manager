import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { Button } from '@material-ui/core';
import ServicesView from '../components/ServiceList';
import { useEnvironmentContext } from '../contexts/EnvironmentContext';
import ServiceViews from '../components/ServiceList/ServiceViews';

export default function ServicesPage() {
  const { environment, configPath } = useEnvironmentContext();
  const [view, setView] = useState(ServiceViews.GROUPED);
  console.log('Using environment: ', environment);
  const title = `Environment - ${environment.name}`;

  return (
    <Grid container xs={12} spacing={3}>
      <Grid item xs={12} sm={12}>
        <h2>{title}</h2>
        <Button
          disabled={view === ServiceViews.GROUPED}
          onClick={() => setView(ServiceViews.GROUPED)}
          color="primary"
        >
          Grouped
        </Button>
        <Button
          disabled={view === ServiceViews.A_TO_Z}
          onClick={() => setView(ServiceViews.A_TO_Z)}
          color="primary"
        >
          A - Z
        </Button>
      </Grid>
      <Grid item xs={12} sm={12}>
        <ServicesView
          view={view}
          environment={environment}
          environmentConfigPath={configPath}
        />
      </Grid>
    </Grid>
  );
}
