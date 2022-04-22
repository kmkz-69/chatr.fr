import { IonCol, IonGrid, IonRow } from '@ionic/react'
import React, { ChangeEvent, Component } from 'react'
import { connect } from 'react-redux'
import copyToClipboard from 'copy-to-clipboard'
import AlertService from '../../services/AlertService'
import { HostCreatePayload } from '../../pages/Hosts/Hosts.request'
import { selectors, actions, HostCreateState, HostCreateActions } from './HostCreate.state'
import Button from '../Button/Button'
import Input from '../Input/Input'

interface HostCreateProps extends HostCreateState, HostCreateActions {
  handleCreateClick: (host: HostCreatePayload, callback: () => void) => void
}

class HostCreate extends Component<HostCreateProps> {
  constructor (props: HostCreateProps) {
    super(props)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleCreateHostClick = this.handleCreateHostClick.bind(this)
  }

  handleInputChange (event: ChangeEvent) {
    const target = event.target as HTMLInputElement
    const { value, name } = target
    switch (name) {
      case 'name':
        this.props.replaceName(value)
        break
      case 'password':
        this.props.replacePassword(value)
        break
      case 'username':
        this.props.replaceUsername(value)
        break
    }
  }

  copyCredentials () {
    const appUrl = `https://${process.env.REACT_APP_HOST}`
    const { name, username, password } = this.props
    const credentials = `Hi ${name},\nYou can start a meeting from ${appUrl}/start using the following credentials:\nUsername: ${username}\nPassword: ${password}`
    copyToClipboard(credentials)
    AlertService.push('Credentials copied.')
  }

  clearForm () {
    this.props.replaceName('')
    this.props.replaceUsername('')
    this.props.replacePassword('')
  }

  handleCreateHostClick () {
    const { name, username, password } = this.props
    const host = { name, username, password }
    this.props.handleCreateClick(host, () => {
      this.copyCredentials()
      this.clearForm()
    })
  }

  render () {
    return (
      <IonGrid>
        <IonRow>
          <IonCol>
            <Input
              name="name"
              type="text"
              value={this.props.name}
              placeholder="Name"
              handleChange={this.handleInputChange} />
            <Input
              name="password"
              type="password"
              value={this.props.password}
              placeholder="Password"
              handleChange={this.handleInputChange} />
          </IonCol>
          <IonCol>
            <Input
              name="username"
              type="text"
              value={this.props.username}
              placeholder="Username"
              handleChange={this.handleInputChange} />
            <Button
              text="Create Host"
              handleClick={this.handleCreateHostClick} />
          </IonCol>
        </IonRow>
      </IonGrid>
    )
  }
}

export default connect(selectors, actions)(HostCreate)
