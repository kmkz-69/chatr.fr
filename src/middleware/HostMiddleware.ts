import { History } from 'history';
import routes from '../routes';
import RequestService from '../services/RequestService';
import AuthService from '../services/AuthService';

export default class HostMiddleware {
  protected requestService: RequestService;

  protected authService: AuthService;

  constructor() {
    this.requestService = new RequestService();
    this.authService = new AuthService();
  }

  auth(history: History) {
    const isHostAuth = this.authService.isHostAuth();
    if (isHostAuth) {
      this.requestService.get('/host/auth', (response) => {
        if (!response) history.push(routes.start.path);
      });
    }
  }
}
