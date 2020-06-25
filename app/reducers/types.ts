import { Dispatch as ReduxDispatch, Store as ReduxStore, Action } from 'redux';

export type DockerComposeConfig = {
  cwd: string;
};

export type RootStateType = {
  counter: number;
  dockerCompose: DockerComposeConfig;
};

export type GetState = () => RootStateType;

export type Dispatch = ReduxDispatch<Action<string>>;

export type Store = ReduxStore<RootStateType, Action<string>>;
