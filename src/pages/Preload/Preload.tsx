import { Plugins } from '@capacitor/core';
import { IonContent, IonPage } from '@ionic/react';
import React, { Component } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { includes, startsWith } from 'lodash';
import routes from '../../routes';
import Page from '../../components/Page/Page';

type PreloadProps = RouteComponentProps;

class Preload extends Component<PreloadProps> {
  timeout: number;
  timeoutId: number | null;

  constructor(props: PreloadProps) {
    super(props);
    this.timeout = 2000;
    this.timeoutId = null;
  }

  autoRoute() {
    this.timeoutId = window.setTimeout(
      () => this.props.history.push(routes.home.path),
      this.timeout,
    );
  }

  preventAutoRoute() {
    if (this.timeoutId) clearTimeout(this.timeoutId);
  }

  handleDeeplinkOpen() {
    // Plugins.App.addListener('appUrlOpen', (data:any) => {
    // 	const slug = data.url.split(process.env.REACT_APP_HOST).pop();
    // 	const isJoin = startsWith(slug, '/join?id=');
    // 	const isStart = includes(['/start', '/start/'], slug);
    // 	if (isJoin || isStart) {
    // 		this.preventAutoRoute();
    // 		this.props.history.push(slug);
    // 	}
    // });
  }

  componentDidMount() {
    this.autoRoute();
    this.handleDeeplinkOpen();
  }

  render() {
    return (
      <IonPage>
        <IonContent>
          <Page invert={true} container="small" />
        </IonContent>
      </IonPage>
    );
  }
}

export default withRouter(Preload);
