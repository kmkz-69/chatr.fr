import { AnyAction } from 'redux';
import { cloneDeep } from 'lodash';

export interface AdminSignInState {
  username: string;
  password: string;
}

export interface AdminSignInActions {
  replaceUsername(username: string): AnyAction;
  replacePassword(password: string): AnyAction;
}

const adminSignIn: AdminSignInState = {
  username: '',
  password: '',
};

export const actions: AdminSignInActions = {
  replaceUsername(username) {
    return { type: 'REPLACE_ADMIN_SIGN_IN_USERNAME', username };
  },
  replacePassword(password) {
    return { type: 'REPLACE_ADMIN_SIGN_IN_PASSWORD', password };
  },
};

export function reducers(state = adminSignIn, action: any) {
  switch (action.type) {
    case 'REPLACE_ADMIN_SIGN_IN_USERNAME':
      adminSignIn.username = action.username;
      return cloneDeep(adminSignIn);
    case 'REPLACE_ADMIN_SIGN_IN_PASSWORD':
      adminSignIn.password = action.password;
      return cloneDeep(adminSignIn);
    default:
      return state;
  }
}

export function selectors(state: { adminSignIn: AdminSignInState }) {
  return cloneDeep(state.adminSignIn);
}
