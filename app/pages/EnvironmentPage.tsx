import React from 'react';
import { Grid } from '@material-ui/core';
import { Switch, Route } from 'react-router-dom';
import routes from '../paths/routes';
import ServicesPage from './ServicesPage';
import LogsPage from './LogsPage';
import EnvironmentMenu from '../components/EnvironmentMenu';

export default function EnvironmentPage() {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={12}>
        <EnvironmentMenu key="environmentmenu" />
      </Grid>
      <Grid item xs={12} sm={12}>
        <Switch>
          <Route path={routes.SERVICES} component={ServicesPage} />
          <Route path={routes.LOGS} component={LogsPage} />
        </Switch>
      </Grid>
    </Grid>
  );
}
