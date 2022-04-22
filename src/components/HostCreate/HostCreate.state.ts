import { AnyAction } from 'redux';
import { cloneDeep } from 'lodash';

export interface HostCreateState {
  name: string;
  username: string;
  password: string;
}

export interface HostCreateActions {
  replaceName: (name: string) => AnyAction;
  replaceUsername: (username: string) => AnyAction;
  replacePassword: (password: string) => AnyAction;
}

const hostCreate: HostCreateState = {
  name: '',
  username: '',
  password: '',
};

export const actions: HostCreateActions = {
  replaceName(name) {
    return { type: 'REPLACE_HOST_CREATE_NAME', name };
  },
  replaceUsername(username) {
    return { type: 'REPLACE_HOST_CREATE_USERNAME', username };
  },
  replacePassword(password) {
    return { type: 'REPLACE_HOST_CREATE_PASSWORD', password };
  },
};

export function reducers(state = hostCreate, action: any) {
  switch (action.type) {
    case 'REPLACE_HOST_CREATE_NAME':
      hostCreate.name = action.name;
      return cloneDeep(hostCreate);
    case 'REPLACE_HOST_CREATE_USERNAME':
      hostCreate.username = action.username;
      return cloneDeep(hostCreate);
    case 'REPLACE_HOST_CREATE_PASSWORD':
      hostCreate.password = action.password;
      return cloneDeep(hostCreate);
    default:
      return state;
  }
}

export function selectors(state: { hostCreate: HostCreateState }) {
  return cloneDeep(state.hostCreate);
}
