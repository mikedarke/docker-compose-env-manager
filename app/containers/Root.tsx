import React from 'react';
import { Router } from 'react-router';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { createBrowserHistory } from 'history';
import { hot } from 'react-hot-loader/root';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Routes from '../Routes';
import MainAppBar from '../components/MainAppBar';
import RootProvider from '../contexts/RootProvider';
import Theme from './Theme';

const history = createBrowserHistory();

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      flexGrow: 1
    }
  })
);

const Root = () => {
  const classes = useStyles();

  return (
    <Theme>
      <RootProvider>
        <Router history={history}>
          <MainAppBar />
          <Container className={classes.root}>
            <Routes />
          </Container>
        </Router>
      </RootProvider>
    </Theme>
  );
};

export default hot(Root);
