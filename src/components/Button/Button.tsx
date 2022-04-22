import { IonButton } from '@ionic/react'
import React, { MouseEvent, Component } from 'react'
import styles from './Button.module.scss'

export interface ButtonProps {
  text: string
  handleClick: (event: MouseEvent) => void
}

export default class Button extends Component<ButtonProps> {
  render () {
    return (
      <div className={styles.button}>
        <IonButton
          className={styles.content}
          shape="round"
          expand="block"
          onClick={this.props.handleClick}>
          {this.props.text}
        </IonButton>
      </div>
    )
  }
}
