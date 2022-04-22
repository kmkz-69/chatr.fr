import { AnyAction } from 'redux';
import { cloneDeep } from 'lodash';

export interface InstallState {
  username: string;
  password: string;
  confirmPassword: string;
}

export interface InstallActions {
  replaceUsername: (username: string) => AnyAction;
  replacePassword: (password: string) => AnyAction;
  replaceConfirmPassword: (confirmPassword: string) => AnyAction;
}

const install: InstallState = {
  username: '',
  password: '',
  confirmPassword: '',
};

export const actions: InstallActions = {
  replaceUsername(username) {
    return { type: 'REPLACE_INSTALL_USERNAME', username };
  },
  replacePassword(password) {
    return { type: 'REPLACE_INSTALL_PASSWORD', password };
  },
  replaceConfirmPassword(confirmPassword) {
    return { type: 'REPLACE_INSTALL_CONFIRM_PASSWORD', confirmPassword };
  },
};

export function reducers(state = install, action: any) {
  switch (action.type) {
    case 'REPLACE_INSTALL_USERNAME':
      install.username = action.username;
      return cloneDeep(install);
    case 'REPLACE_INSTALL_PASSWORD':
      install.password = action.password;
      return cloneDeep(install);
    case 'REPLACE_INSTALL_CONFIRM_PASSWORD':
      install.confirmPassword = action.confirmPassword;
      return cloneDeep(install);
    default:
      return state;
  }
}

export function selectors(state: { install: InstallState }) {
  return cloneDeep(state.install);
}
