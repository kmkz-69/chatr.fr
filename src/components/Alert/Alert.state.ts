import { cloneDeep } from 'lodash';

export interface AlertState {
  message: string;
  handleProceed: (() => void) | null;
  timeoutId: number;
}

const alert: AlertState = {
  message: '',
  handleProceed: null,
  timeoutId: 0,
};

export const actions = {
  replaceMessage(message: string) {
    return { type: 'REPLACE_ALERT_MESSAGE', message };
  },
  replaceHandleProceed(handleProceed: (() => void) | null) {
    return { type: 'REPLACE_ALERT_HANDLE_PROCEED', handleProceed };
  },
  replaceTimeoutId(timeoutId: number) {
    return { type: 'REPLACE_ALERT_TIMEOUT_ID', timeoutId };
  },
};

export function reducers(state = alert, action: any) {
  switch (action.type) {
    case 'REPLACE_ALERT_MESSAGE':
      alert.message = action.message;
      return cloneDeep(alert);
    case 'REPLACE_ALERT_HANDLE_PROCEED':
      alert.handleProceed = action.handleProceed;
      return cloneDeep(alert);
    case 'REPLACE_ALERT_TIMEOUT_ID': {
      alert.timeoutId = action.timeoutId;
      return cloneDeep(alert);
    }
    default:
      return state;
  }
}

export function selectors(state: { alert: AlertState }) {
  return cloneDeep(state.alert);
}
