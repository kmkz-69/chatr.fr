import store from '../store';
import {
  actions as appActions,
  selectors as appSelectors,
} from '../components/App/App.state';

export default class AuthService {
  isHostAuth(): boolean {
    const { auth } = appSelectors(store.getState());
    return auth.type === 'host';
  }

  resetType(): void {
    store.dispatch(appActions.replaceAuthType(null));
  }
}
