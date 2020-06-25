import { Action } from 'redux';

export default function dockerCompose(state = 0, action: Action<string>) {
  switch (action.type) {
    default:
      return state;
  }
}
