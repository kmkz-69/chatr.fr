import { IonIcon } from '@ionic/react'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { alertCircleOutline } from 'ionicons/icons'
import AlertService from '../../services/AlertService'
import { selectors, actions, AlertState } from './Alert.state'
import styles from './Alert.module.scss'

interface AlertProps extends AlertState {}

class Alert extends Component<AlertProps> {
  constructor (props: AlertProps) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.handleCancelClick = this.handleCancelClick.bind(this)
    this.handleProceedClick = this.handleProceedClick.bind(this)
  }

  get className () {
    const cursorClass = !this.props.handleProceed && styles.cursor
    return `${styles.alert} ${cursorClass}`
  }

  get actions () {
    return this.props.handleProceed &&
      <div className={styles.actions}>
        <div
          className={styles.cancel}
          onClick={this.handleCancelClick}>
          No
        </div>
        <div
          className={styles.proceed}
          onClick={this.handleProceedClick}>
          Yes
        </div>
      </div>
  }

  handleClick () {
    if (!this.props.handleProceed) AlertService.pull()
  }

  handleCancelClick () {
    AlertService.pull()
  }

  handleProceedClick () {
    if (this.props.handleProceed) {
      this.props.handleProceed()
      AlertService.pull()
    }
  }

  render () {
    return (
      this.props.message &&
        <div
          className={this.className}
          onClick={this.handleClick}>
          <div className={styles.content}>
            <IonIcon
              className={styles.icon}
              icon={alertCircleOutline} />
            <span className={styles.message}>{this.props.message}</span>
          </div>
          {this.actions}
        </div>
    )
  }
}

export default connect(selectors, actions)(Alert)
