import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { hot } from 'react-hot-loader/root';
import { History } from 'history';
import Container from '@material-ui/core/Container';
import { Store } from '../reducers/types';
import Routes from '../Routes';

type Props = {
  store: Store;
  history: History;
};

const Root = ({ store, history }: Props) => (
  <Provider store={store}>
    <Container maxWidth="sm">
      <ConnectedRouter history={history}>
        <Routes />
      </ConnectedRouter>
    </Container>
  </Provider>
);

export default hot(Root);
