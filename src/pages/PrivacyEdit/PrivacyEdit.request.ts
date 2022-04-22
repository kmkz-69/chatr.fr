import RequestService from '../../services/RequestService';
import AlertService from '../../services/AlertService';

export default class PrivacyEditRequest {
  private requestService: RequestService;

  constructor() {
    this.requestService = new RequestService();
  }

  read(callback: (body: string) => void) {
    this.requestService.get('/privacy', (response) => {
      if (response) callback(response.body);
    });
  }

  update(body: string) {
    this.requestService.post('/privacy', { body }, (response) => {
      if (response) AlertService.push('Privacy updated.');
    });
  }
}
