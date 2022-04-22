import { IonRouterOutlet } from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'
import React, { Component } from 'react'
import { Provider as ReduxProvider } from 'react-redux'
import store from '../../store'

interface ProviderProps {}

export default class Provider extends Component<ProviderProps> {
  render () {
    return (
      <ReduxProvider store={store}>
        <IonReactRouter>
          <IonRouterOutlet>
            {this.props.children}
          </IonRouterOutlet>
        </IonReactRouter>
      </ReduxProvider>
    )
  }
}
