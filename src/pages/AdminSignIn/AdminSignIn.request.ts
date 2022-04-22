import RequestService from '../../services/RequestService';
import AppStorage from '../../components/App/App.storage';

type SignInCallback = () => void;

interface SignInCredentials {
  username: string;
  password: string;
}

export default class AdminSignInRequest {
  private requestService: RequestService;
  private appStorage: AppStorage;

  constructor() {
    this.requestService = new RequestService();
    this.appStorage = new AppStorage();
  }

  signIn(credentials: SignInCredentials, callback: SignInCallback) {
    this.requestService.post('/admin/signIn', credentials, (response) => {
      if (response) {
        this.appStorage.setAccessToken(response.accessToken, callback);
      }
    });
  }
}
