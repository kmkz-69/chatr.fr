import React, { Component } from 'react'
import FloatButton from '../FloatButton/FloatButton'
import styles from './RaiseHand.module.scss'

interface RaiseHandProps {
  visibility: boolean
}

export default class RaiseHand extends Component<RaiseHandProps> {
  render () {
    return this.props.visibility &&
      <div className={styles.raiseHand}>
        <FloatButton name="raiseHand" />
      </div>
  }
}
