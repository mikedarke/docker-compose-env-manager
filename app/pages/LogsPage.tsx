import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { Button } from '@material-ui/core';
import { useEnvironmentContext } from '../contexts/EnvironmentContext';

export default function LogsPage() {
  const { environment, configPath } = useEnvironmentContext();

  return (
    <Grid container xs={12} spacing={3}>
      <Grid item xs={12} sm={12}>
        Logs
      </Grid>
    </Grid>
  );
}
