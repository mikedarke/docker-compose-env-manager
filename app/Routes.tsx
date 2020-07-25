import React from 'react';
import { Switch, Route } from 'react-router-dom';
import routes from './paths/routes';
import HomePage from './containers/HomePage';
import ServicesPageContainer from './containers/ServicesPage';
import EnvironmentPage from './containers/EnvironmentPage';

export default function Routes() {
  return (
    <Switch>
      <Route path={routes.SERVICES} component={ServicesPageContainer} />
      <Route path={routes.ENVIRONMENT} component={EnvironmentPage} />
      <Route path={routes.HOME} component={HomePage} />
    </Switch>
  );
}
