import { IonApp, setupConfig } from '@ionic/react'
import React, { Component, ReactPropTypes } from 'react'
import { Route, Switch } from 'react-router-dom'
import routes from '../../routes'
import SocketService from '../../services/SocketService'
import AlertService from '../../services/AlertService'
import LocalStorage from './App.storage'
import Provider from '../Provider/Provider'
import '../../theme/bootstrap.scss'

export default class App extends Component {
  localStorage: LocalStorage

  constructor (props: ReactPropTypes) {
    super(props)
    this.localStorage = new LocalStorage()
    this.setupConfig()
    SocketService.connect()
  }

  setupConfig () {
    setupConfig({ mode: 'md' })
  }

  async handlePwaInstall (event: Event) {
    const deferredPrompt: any = event
    deferredPrompt.prompt()
    const choiceResult = await deferredPrompt.userChoice
    const isAccepted = (choiceResult.outcome === 'accepted')
    if (isAccepted) AlertService.pull()
  }

  promptPwaInstall () {
    this.localStorage.checkPwaPrompted(pwaPrompted => {
      if (pwaPrompted) return
      window.addEventListener('beforeinstallprompt', event => {
        event.preventDefault()
        this.localStorage.setPwaInstallPrompted(() => {
          const installHandler = () => this.handlePwaInstall(event)
          AlertService.push('Install app?', installHandler)
        })
      })
    })
  }

  componentDidMount () {
    this.promptPwaInstall()
  }

  render () {
    return (
      <IonApp>
        <Provider>
          <Switch>
            <Route
              path={routes.preload.path}
              component={routes.preload.component}
              exact={true} />
            <Route
              path={routes.home.path}
              component={routes.home.component}
              exact={true} />
            <Route
              path={routes.join.path}
              component={routes.join.component}
              exact={true} />
            <Route
              path={routes.start.path}
              component={routes.start.component}
              exact={true} />
            <Route
              path={routes.meeting.path}
              component={routes.meeting.component}
              exact={true} />
            <Route
              path={routes.install.path}
              component={routes.install.component}
              exact={true} />
            <Route
              path={routes.adminSignIn.path}
              component={routes.adminSignIn.component}
              exact={true} />
            <Route
              path={routes.hosts.path}
              component={routes.hosts.component}
              exact={true} />
            <Route
              path={routes.privacy.path}
              component={routes.privacy.component}
              exact={true} />
            <Route
              path={routes.privacyEdit.path}
              component={routes.privacyEdit.component}
              exact={true} />
            <Route
              path={routes.notFound.path}
              component={routes.notFound.component}
              exact={true} />
          </Switch>
        </Provider>
      </IonApp>
    )
  }
}
