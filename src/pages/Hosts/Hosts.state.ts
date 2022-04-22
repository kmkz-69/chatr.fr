import { AnyAction } from 'redux';
import { cloneDeep, reject, some } from 'lodash';

export interface HostState {
  id: number;
  name: string;
  username: string;
  accessToken: string;
  lastMeetingAt: Date;
  password: string;
}

export interface HostsState {
  hosts: HostState[];
}

export interface HostsActions {
  replaceHosts: (hosts: HostsState[]) => AnyAction;
  pushHost: (host: HostState) => AnyAction;
  pullHost: (id: number) => AnyAction;
}

const hosts: HostsState = {
  hosts: [],
};

export const actions: HostsActions = {
  replaceHosts(hosts) {
    return { type: 'REPLACE_HOSTS_HOSTS', hosts };
  },
  pushHost(host) {
    return { type: 'PUSH_HOSTS_HOST', host };
  },
  pullHost(id) {
    return { type: 'PULL_HOSTS_HOST', id };
  },
};

export function reducers(state = hosts, action: any) {
  switch (action.type) {
    case 'REPLACE_HOSTS_HOSTS':
      hosts.hosts = action.hosts;
      return cloneDeep(hosts);
    case 'PUSH_HOSTS_HOST':
      hosts.hosts.unshift(action.host);
      return cloneDeep(hosts);
    case 'PULL_HOSTS_HOST': {
      const { id } = action;
      const isExists = some(hosts.hosts, { id });
      if (isExists) {
        hosts.hosts = reject(hosts.hosts, { id });
      }
      return cloneDeep(hosts);
    }
    default:
      return state;
  }
}

export function selectors(state: { hosts: HostsState }) {
  return cloneDeep(state.hosts);
}
