import React from 'react';
import { Switch, Route } from 'react-router-dom';
import routes from './paths/routes';
import App from './containers/App';
import HomePage from './containers/HomePage';
import ServicesPage from './containers/ServicesPage';

export default function Routes() {
  return (
    <App>
      <Switch>
        <Route path={routes.SERVICES} component={ServicesPage} />
        <Route path={routes.HOME} component={HomePage} />
      </Switch>
    </App>
  );
}
