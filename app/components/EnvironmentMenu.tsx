import React from 'react';
import { Paper, Tabs, Tab } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { useEnvironmentContext } from '../contexts/EnvironmentContext';
import routes from '../paths/routes';

export default function EnvironmentMenu() {
  const { environment } = useEnvironmentContext();
  const [value, setValue] = React.useState(0);
  const history = useHistory();

  if (environment === null || environment.files.length === 0) {
    return null;
  }

  //const title = `Environment - ${environment.name}`;

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    console.log(`Tab change ${value}`);
    setValue(newValue);
    if (value === 1) {
      history.push(routes.SERVICES);
      return;
    }

    if (value === 0) {
      console.log('View logs');
      history.push(routes.LOGS);
    }
  };

  return (
    <Paper square>
      <Tabs
        value={value}
        indicatorColor="primary"
        textColor="primary"
        onChange={handleChange}
        aria-label="environment menu"
      >
        <Tab label="Services" />
        <Tab label="Container Logs" />
      </Tabs>
    </Paper>
  );
}
