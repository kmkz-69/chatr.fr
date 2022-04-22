import RequestService from '../../services/RequestService';
import { HostsState, HostState } from './Hosts.state';

export interface HostCreatePayload {
  name: string;
  password: string;
  username: string;
}

type CreateHostCallback = (response: HostState) => void;
type ListHostsCallback = (hosts: HostsState[]) => void;

interface DeleteHostData {
  id: number;
}

export default class HostsRequest {
  private requestService: RequestService;

  constructor() {
    this.requestService = new RequestService();
  }

  create(host: HostCreatePayload, callback: CreateHostCallback) {
    this.requestService.post('/host', host, (response) => {
      if (response) callback(response);
    });
  }

  listHosts(callback: ListHostsCallback) {
    this.requestService.get('/hosts', (hosts) => {
      if (hosts) callback(hosts);
    });
  }

  delete(host: DeleteHostData, callback: () => void) {
    this.requestService.delete('/host', host, (response) => {
      if (response) callback();
    });
  }
}
