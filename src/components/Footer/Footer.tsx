import React, { Component } from 'react'
import FloatingAnimation from '../FloatingAnimation/FloatingAnimation'
import Copyright from '../Copyright/Copyright'
import styles from './Footer.module.scss'

interface FooterProps {
  visibility: boolean
  invert?: boolean
}

export default class Footer extends Component<FooterProps> {
  get floatingAnimationFlip () {
    return !this.props.invert
  }

  get copyrightInvert () {
    return Boolean(this.props.invert)
  }

  render () {
    return this.props.visibility &&
      <div className={styles.footer}>
        <FloatingAnimation flip={this.floatingAnimationFlip} />
        <Copyright invert={this.copyrightInvert} />
      </div>
  }
}
