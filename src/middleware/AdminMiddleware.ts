import { History } from 'history';
import routes from '../routes';
import RequestService from '../services/RequestService';

export default class AdminMiddleware {
  protected requestService: RequestService;

  constructor() {
    this.requestService = new RequestService();
  }

  auth(history: History) {
    this.requestService.get('/admin/auth', (response) => {
      if (!response) history.push(routes.adminSignIn.path);
    });
  }
}
