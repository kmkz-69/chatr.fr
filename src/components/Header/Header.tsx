import { IonCol, IonGrid, IonRow } from '@ionic/react'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import routes from '../../routes'
import styles from './Header.module.scss'

interface HeaderProps {
  visibility: boolean
  invert?: boolean
}

export default class Header extends Component<HeaderProps> {
  get logo () {
    const logo = this.props.invert ? 'logoInvert.svg' : 'logo.svg'
    return `/assets/logo/${logo}`
  }

  get taglineClass () {
    const invertClass = this.props.invert && styles.invert
    return `${styles.tagline} ${invertClass}`
  }

  render () {
    return this.props.visibility &&
      <div className={styles.header}>
        <IonGrid>
          <IonRow>
            <IonCol>
              <Link to={routes.home.path}>
                <img
                  className={styles.logo}
                  src={this.logo}
                  alt={process.env.REACT_APP_NAME} />
              </Link>
              <div className={this.taglineClass}>
                {process.env.REACT_APP_TAGLINE}
              </div>
            </IonCol>
          </IonRow>
        </IonGrid>
      </div>
  }
}
