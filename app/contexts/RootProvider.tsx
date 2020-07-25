import React from 'react';
import EnvironmentContextProvider from './EnvironmentContext';

type Props = {
  children: any;
};

export default function RootProvider(props: Props) {
  const { children } = props;
  return <EnvironmentContextProvider>{children}</EnvironmentContextProvider>;
}
