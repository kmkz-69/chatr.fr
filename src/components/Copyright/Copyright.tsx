import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import routes from '../../routes'
import styles from './Copyright.module.scss'

interface CopyrightProps {
  invert: boolean
}

export default class Copyright extends Component<CopyrightProps> {
  get className () {
    const invertClass = this.props.invert && styles.invert
    return `${styles.copyright} ${invertClass}`
  }

  get copyright () {
    const appName = process.env.REACT_APP_NAME
    const year = new Date().getFullYear()
    const text = `&copy; ${appName} ${year}`
    return { __html: text }
  }

  render () {
    return (
      <div className={this.className}>
        <Link
          className={styles.link}
          to={routes.privacy.path}>
          Privacy Policy
        </Link>
        <p
          className={styles.text}
          dangerouslySetInnerHTML={this.copyright} />
      </div>
    )
  }
}
