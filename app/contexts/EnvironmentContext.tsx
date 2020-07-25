import React, { useContext, useState } from 'react';
import {
  EnvironmentDefinition,
  EnvironmentConfigFile
} from '../lib/environments';

export type EnvironmentContextValue = {
  environment: EnvironmentDefinition;
  setEnvironment: React.Dispatch<React.SetStateAction<EnvironmentDefinition>>;
  saveEnvironment: Function;
};

const saveEnvironment = (
  environment: EnvironmentDefinition,
  onSavedCallback: Function
) => {
  const cfgFile = new EnvironmentConfigFile(environment);
  cfgFile.saveEnvironment(onSavedCallback);
};

const EnvironmentContext = React.createContext({
  environment: new EnvironmentDefinition(),
  setEnvironment: () => {},
  saveEnvironment
});

export const useEnvironmentContext = () =>
  useContext(EnvironmentContext) as EnvironmentContextValue;

export default function EnvironmentContextProvider(props: any) {
  const [environment, setEnvironment] = useState(new EnvironmentDefinition());
  const { children } = props;

  const ctxValue = {
    environment,
    setEnvironment,
    saveEnvironment
  };

  return (
    <EnvironmentContext.Provider value={ctxValue}>
      {children}
    </EnvironmentContext.Provider>
  );
}
