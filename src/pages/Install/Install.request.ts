import RequestService from '../../services/RequestService';

interface CreateAdminPayload {
  username: string;
  password: string;
  confirmPassword: string;
}

export default class InstallRequest {
  private requestService: RequestService;

  constructor() {
    this.requestService = new RequestService();
  }

  createAdmin(admin: CreateAdminPayload, callback: () => void) {
    this.requestService.post('/admin', admin, (response) => {
      if (response) callback();
    });
  }

  validateInstall(callback: () => void) {
    this.requestService.get('/admin', (admin) => {
      if (admin) callback();
    });
  }
}
