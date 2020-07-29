import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { hot } from 'react-hot-loader/root';
import Container from '@material-ui/core/Container';
import Routes from '../Routes';
import MainAppBar from '../components/MainAppBar';
import RootProvider from '../contexts/RootProvider';
import Theme from '../Theme';

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
        <BrowserRouter>
          <MainAppBar />
          <Container className={classes.root}>
            <Routes />
          </Container>
        </BrowserRouter>
      </RootProvider>
    </Theme>
  );
};

export default hot(Root);
