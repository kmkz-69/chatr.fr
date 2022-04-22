import RequestService from '../../services/RequestService';

export default class PrivacyRequest {
  private requestService: RequestService;

  constructor() {
    this.requestService = new RequestService();
  }

  read(callback: (body: string) => void) {
    this.requestService.get('/privacy', (response) => {
      if (response) callback(response.body);
    });
  }
}
