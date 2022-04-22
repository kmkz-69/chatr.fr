import axios, { AxiosInstance } from 'axios';
import AppStorage from '../components/App/App.storage';
import AlertService from './AlertService';

type GetClientCallback = (client: AxiosInstance) => void;

export default class RequestService {
  private appStorage: AppStorage;

  constructor() {
    this.appStorage = new AppStorage();
  }

  private getClient(callback: GetClientCallback) {
    this.appStorage.getAccessToken((accessToken) => {
      const client = axios.create({
        baseURL: `https://${process.env.REACT_APP_API_HOST}`,
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      callback(client);
    });
  }

  private handleError(error: any) {
    const serverError = error.response && error.response.data.message;
    const message = serverError || error.message;
    AlertService.push(message);
  }

  get(path: string, callback: (data: any) => void) {
    this.getClient((client) => {
      client
        .get(path)
        .then((response) => callback(response.data))
        .catch((error) => {
          callback(null);
          this.handleError(error);
        });
    });
  }

  post(path: string, payload: any, callback: (data: any) => void) {
    this.getClient((client) => {
      client
        .post(path, payload)
        .then((response) => callback(response.data))
        .catch((error) => {
          callback(null);
          this.handleError(error);
        });
    });
  }

  patch(path: string, payload: any, callback: (data: object | null) => void) {
    this.getClient((client) => {
      client
        .patch(path, payload)
        .then((response) => callback(response.data))
        .catch((error) => {
          callback(null);
          this.handleError(error);
        });
    });
  }

  delete(path: string, payload: any, callback: (data: object | null) => void) {
    this.getClient((client) => {
      client
        .delete(path, { data: payload })
        .then((response) => callback(response.data))
        .catch((error) => {
          callback(null);
          this.handleError(error);
        });
    });
  }
}
