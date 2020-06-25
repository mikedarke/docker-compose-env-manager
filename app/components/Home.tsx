import React from 'react';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import routes from '../paths/routes';
import styles from './Home.css';

export default function Home() {
  return (
    <div className={styles.container} data-tid="container">
      <h2>Home</h2>
      <div>
        <Button variant="contained" color="primary" href="#contained-buttons">
          <Link to={routes.SERVICES}>Docker Compose Services</Link>
        </Button>
      </div>
    </div>
  );
}
