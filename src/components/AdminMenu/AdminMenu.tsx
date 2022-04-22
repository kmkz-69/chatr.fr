import React, { Component } from 'react'
import { RouteComponentProps } from 'react-router'
import { NavLink, withRouter } from 'react-router-dom'
import routes from '../../routes'
import AppStorage from '../App/App.storage'
import styles from './AdminMenu.module.scss'

interface AdminMenuProps extends RouteComponentProps {}

class AdminMenu extends Component<AdminMenuProps> {
  appStorage: AppStorage

  constructor (props: AdminMenuProps) {
    super(props)
    this.appStorage = new AppStorage()
    this.handleSignOutClick = this.handleSignOutClick.bind(this)
  }

  handleSignOutClick () {
    this.appStorage.removeAccessToken(() => {
      this.props.history.push(routes.adminSignIn.path)
    })
  }

  render () {
    return (
      <div className={styles.adminMenu}>
        <div className={styles.menuItems}>
          <NavLink
            className={styles.menuItem}
            to={routes.hosts.path}
            activeClassName={styles.active}>
            Hosts
          </NavLink>
          <NavLink
            className={styles.menuItem}
            to={routes.privacyEdit.path}
            activeClassName={styles.active}>
            Privacy Policy
          </NavLink>
          <NavLink
            className={styles.menuItem}
            to="#"
            onClick={this.handleSignOutClick}>
            Sign Out
          </NavLink>
        </div>
      </div>
    )
  }
}

export default withRouter(AdminMenu)
