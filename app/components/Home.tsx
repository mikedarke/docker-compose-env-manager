import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';
import routes from '../paths/routes';

export default function Home() {
  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12} />
        <Grid item xs={12}>
          <Button variant="contained" color="primary" href="#contained-buttons">
            <Link to={routes.SERVICES}>Docker Compose Services</Link>
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" href="#contained-buttons">
            <Link to={routes.ENVIRONMENT}>Add new evironment</Link>
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}
