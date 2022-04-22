import store from '../store';
import {
  actions as alertActions,
  selectors as alertSelectors,
} from '../components/Alert/Alert.state';

export default class AlertService {
  private static timeout = 5000;

  private static clearAutoClose(): void {
    const { timeoutId } = alertSelectors(store.getState());
    clearTimeout(timeoutId);
    store.dispatch(alertActions.replaceTimeoutId(0));
  }

  private static setAutoClose(): void {
    const timeoutId: number = window.setTimeout(() => {
      store.dispatch(alertActions.replaceMessage(''));
      this.clearAutoClose();
    }, this.timeout);
    store.dispatch(alertActions.replaceTimeoutId(timeoutId));
  }

  static push(message: string, handleProceed?: () => void): void {
    this.pull();
    store.dispatch(alertActions.replaceMessage(message));
    if (handleProceed) {
      store.dispatch(alertActions.replaceHandleProceed(handleProceed));
    } else this.setAutoClose();
  }

  static pull() {
    this.clearAutoClose();
    store.dispatch(alertActions.replaceMessage(''));
    store.dispatch(alertActions.replaceHandleProceed(null));
  }
}
