import RequestService from '../../services/RequestService';
import AppStorage from '../../components/App/App.storage';

interface SignInCredentials {
  username: string;
  password: string;
}

interface UpdateLastMeetingAtHost {
  id: string;
}

export default class StartRequest {
  private requestService: RequestService;
  private appStorage: AppStorage;

  constructor() {
    this.requestService = new RequestService();
    this.appStorage = new AppStorage();
  }

  private updateLastMeetingAt(hostId: string, callback: () => void) {
    const host: UpdateLastMeetingAtHost = { id: hostId };
    this.requestService.patch('/host/lastMeetingAt', host, (response) => {
      if (response) callback();
    });
  }

  signIn(credentials: SignInCredentials, callback: () => void) {
    this.requestService.post('/host/signIn', credentials, (response) => {
      if (response) {
        const { id, accessToken } = response;
        this.appStorage.setAccessToken(accessToken, () => {
          this.updateLastMeetingAt(id, callback);
        });
      }
    });
  }
}
