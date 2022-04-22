import { AnyAction } from 'redux';
import { cloneDeep } from 'lodash';

export type AuthType = 'admin' | 'host' | null;

interface AppState {
  auth: {
    type: AuthType;
  };
}

interface AppActions {
  replaceAuthType(type: AuthType): AnyAction;
}

const app: AppState = {
  auth: {
    type: null,
  },
};

export const actions: AppActions = {
  replaceAuthType(authType) {
    return { type: 'REPLACE_APP_AUTH_TYPE', authType };
  },
};

export function reducers(state = app, action: any) {
  switch (action.type) {
    case 'REPLACE_APP_AUTH_TYPE':
      app.auth.type = action.authType;
      return cloneDeep(app);
    default:
      return state;
  }
}

export function selectors(state: { app: AppState }) {
  return cloneDeep(state.app);
}
