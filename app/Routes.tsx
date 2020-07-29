import React from 'react';
import { Switch, Route } from 'react-router-dom';
import routes from './paths/routes';
import HomePage from './pages/HomePage';
import EnvironmentPage from './pages/EnvironmentPage';
import CreateEnvironmentPage from './pages/CreateEnvironmentPage';

export default function Routes() {
  return (
    <Switch>
      <Route path={routes.ENVIRONMENT} component={EnvironmentPage} />
      <Route
        path={routes.CREATE_ENVIRONMENT}
        component={CreateEnvironmentPage}
      />
      <Route path={routes.HOME} component={HomePage} />
    </Switch>
  );
}
