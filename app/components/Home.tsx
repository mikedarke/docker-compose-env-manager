import React from 'react';
import { useHistory, Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import routes from '../paths/routes';
import {
  EnvironmentConfigFile,
  EnvironmentDefinition
} from '../lib/environments';
import { useEnvironmentContext } from '../contexts/EnvironmentContext';

export default function Home() {
  const history = useHistory();
  const {
    setEnvironment,
    setConfigPath,
    environment
  } = useEnvironmentContext();

  const onLoadEnvironment = () => {
    const cfg = new EnvironmentConfigFile();
    cfg.loadEnvironment(
      (environment: EnvironmentDefinition, cfgPath: string) => {
        setEnvironment(environment);
        setConfigPath(cfgPath);
        history.push(routes.SERVICES);
      }
    );
  };

  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12} />
        <Grid item xs={12}>
          <Button
            onClick={onLoadEnvironment}
            variant="contained"
            color="primary"
            href="#contained-buttons"
          >
            Load environment
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" href="#contained-buttons">
            <Link to={routes.ENVIRONMENT}>Create new evironment</Link>
          </Button>
        </Grid>
        {environment !== null ? (
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              href="#contained-buttons"
            >
              <Link to={routes.SERVICES}>
                Back to&nbsp;
                {environment.name}
              </Link>
            </Button>
          </Grid>
        ) : null}
      </Grid>
    </div>
  );
}
