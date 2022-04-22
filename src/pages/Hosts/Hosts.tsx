import { IonCol, IonContent, IonGrid, IonPage, IonRow } from '@ionic/react';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router';
import { isEmpty, range } from 'lodash';
import AdminMiddleware from '../../middleware/AdminMiddleware';
import AlertService from '../../services/AlertService';
import Request, { HostCreatePayload } from './Hosts.request';
import {
  selectors,
  actions,
  HostState,
  HostsState,
  HostsActions,
} from './Hosts.state';
import Page from '../../components/Page/Page';
import AdminMenu from '../../components/AdminMenu/AdminMenu';
import HostCreate from '../../components/HostCreate/HostCreate';
import Host from '../../components/Host/Host';
import HostSkeleton from '../../components/HostSkeleton/HostSkeleton';

interface HostsProps extends HostsState, HostsActions, RouteComponentProps {}

class Hosts extends Component<HostsProps> {
  static skeletonsLength = 2;
  adminMiddleware: AdminMiddleware;
  request: Request;

  constructor(props: HostsProps) {
    super(props);
    this.adminMiddleware = new AdminMiddleware();
    this.request = new Request();
    this.handleCreateHostClick = this.handleCreateHostClick.bind(this);
    this.handleHostDeleteClick = this.handleHostDeleteClick.bind(this);
  }

  setHosts() {
    this.request.listHosts((hosts) => this.props.replaceHosts(hosts));
  }

  deleteHost(id: number) {
    const payload = { id };
    this.request.delete(payload, () => this.props.pullHost(id));
  }

  handleHostDeleteClick(id: number) {
    AlertService.push('Are you sure to delete the host?', () =>
      this.deleteHost(id),
    );
  }

  host(host: HostState) {
    return (
      <IonCol size="12" sizeSm="6" key={host.username}>
        <Host host={host} handleDeleteClick={this.handleHostDeleteClick} />
      </IonCol>
    );
  }

  get hosts() {
    const { hosts } = this.props;
    return hosts.map((host) => this.host(host));
  }

  hostSkeleton(host: number) {
    return (
      <IonCol size="12" sizeSm="6" key={host}>
        <HostSkeleton />
      </IonCol>
    );
  }

  get hostSkeletons() {
    const { hosts } = this.props;
    if (isEmpty(hosts)) {
      const hostSkeletons = range(Hosts.skeletonsLength);
      return hostSkeletons.map((host) => this.hostSkeleton(host));
    }
  }

  handleCreateHostClick(host: HostCreatePayload, callback: () => void) {
    this.request.create(host, (host) => {
      this.props.pushHost(host);
      callback();
    });
  }

  componentDidMount() {
    this.adminMiddleware.auth(this.props.history);
    this.setHosts();
  }

  render() {
    return (
      <IonPage>
        <IonContent>
          <Page invert={false} container="regular">
            <IonGrid>
              <IonRow>
                <IonCol>
                  <AdminMenu />
                  <HostCreate handleCreateClick={this.handleCreateHostClick} />
                </IonCol>
              </IonRow>
              <IonRow>
                {this.hosts}
                {this.hostSkeletons}
              </IonRow>
            </IonGrid>
          </Page>
        </IonContent>
      </IonPage>
    );
  }
}

export default withRouter(connect(selectors, actions)(Hosts));
