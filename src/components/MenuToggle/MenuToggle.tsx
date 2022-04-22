import { IonIcon } from '@ionic/react'
import React, { Component } from 'react'
import { chevronDown, chevronUp } from 'ionicons/icons'
import { MenuPosition } from '../Menu/Menu'
import styles from './MenuToggle.module.scss'

export type MenuToggleHandleChange = (position: MenuPosition) => void

interface MenuToggleProps {
  isExpanded: boolean
  position: MenuPosition
  handleChange: MenuToggleHandleChange
}

export default class MenuToggle extends Component<MenuToggleProps> {
  constructor (props: MenuToggleProps) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  get className () {
    const positionClass = styles[this.props.position]
    return `${styles.menuToggle} ${positionClass}`
  }

  isPosition (position: MenuPosition) {
    return (this.props.position === position)
  }

  get icon () {
    return this.isPosition('top')
      ? this.props.isExpanded ? chevronUp : chevronDown
      : this.isPosition('bottom')
        ? this.props.isExpanded ? chevronDown : chevronUp
        : undefined
  }

  handleClick () {
    this.props.handleChange(this.props.position)
  }

  render () {
    return (
      <div className={this.className}>
        <div
          className={styles.notch}
          onClick={this.handleClick}>
          <IonIcon
            className={styles.icon}
            icon={this.icon} />
        </div>
      </div>
    )
  }
}
