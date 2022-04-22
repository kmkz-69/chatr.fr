import React, { Component } from 'react'
import styles from './FloatingAnimation.module.scss'

interface FloatingAnimationProps {
  flip: boolean
}

export default class FloatingAnimation extends Component<FloatingAnimationProps> {
  get className () {
    const flipClass = this.props.flip && styles.flip
    return `${styles.floatingAnimation} ${flipClass}`
  }

  render () {
    return (
      <img
        className={this.className}
        src="/assets/background.svg"
        alt="Floating animation" />
    )
  }
}
