import React, { Component } from 'react'
import styles from './Container.module.scss'

export type ContainerWidth = 'small' | 'regular' | 'full'

interface ContainerProps {
  visibility: boolean
  width?: ContainerWidth
}

export default class Container extends Component<ContainerProps> {
  get className () {
    const { width } = this.props
    const widthClass = width && styles[width]
    return `${styles.container} ${widthClass}`
  }

  render () {
    return this.props.visibility &&
      <div className={this.className}>
        {this.props.children}
      </div>
  }
}
