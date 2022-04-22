import { AnyAction } from 'redux';
import { cloneDeep } from 'lodash';
import {
  actions as appActions,
  AuthType,
} from '../../components/App/App.state';

export interface StartState {
  username: string;
  password: string;
}

export interface StartActions {
  replaceUsername: (username: string) => AnyAction;
  replacePassword: (password: string) => AnyAction;
  replaceAppAuthType: (type: AuthType) => AnyAction;
}

const start: StartState = {
  username: '',
  password: '',
};

export const actions: StartActions = {
  replaceUsername(username) {
    return { type: 'REPLACE_START_USERNAME', username };
  },
  replacePassword(password) {
    return { type: 'REPLACE_START_PASSWORD', password };
  },
  replaceAppAuthType(type) {
    return appActions.replaceAuthType(type);
  },
};

export function reducers(state = start, action: any) {
  switch (action.type) {
    case 'REPLACE_START_USERNAME':
      start.username = action.username;
      return cloneDeep(start);
    case 'REPLACE_START_PASSWORD':
      start.password = action.password;
      return cloneDeep(start);
    default:
      return state;
  }
}

export function selectors(state: { start: StartState }) {
  return cloneDeep(state.start);
}
