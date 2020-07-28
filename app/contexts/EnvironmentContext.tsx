import React, { useContext, useState } from 'react';
import {
  EnvironmentDefinition,
  EnvironmentConfigFile
} from '../lib/environments';

export type EnvironmentContextValue = {
  environment: EnvironmentDefinition;
  configPath: string;
  setEnvironment: React.Dispatch<React.SetStateAction<EnvironmentDefinition>>;
  saveEnvironment: Function;
  setConfigPath: Function;
};

const saveEnvironment = (
  environment: EnvironmentDefinition,
  onSavedCallback: Function
) => {
  const cfgFile = new EnvironmentConfigFile();
  cfgFile.saveEnvironment(environment, onSavedCallback);
};

const EnvironmentContext = React.createContext({
  environment: new EnvironmentDefinition(),
  configPath: '',
  setEnvironment: () => {},
  saveEnvironment,
  setConfigPath: () => {}
});

export const useEnvironmentContext = () =>
  useContext(EnvironmentContext) as EnvironmentContextValue;

export default function EnvironmentContextProvider(props: any) {
  const [environment, setEnvironment] = useState(new EnvironmentDefinition());
  const [configPath, setConfigPath] = useState('');
  const { children } = props;

  const ctxValue: EnvironmentContextValue = {
    environment,
    configPath,
    setEnvironment,
    saveEnvironment,
    setConfigPath
  };

  return (
    <EnvironmentContext.Provider value={ctxValue}>
      {children}
    </EnvironmentContext.Provider>
  );
}
