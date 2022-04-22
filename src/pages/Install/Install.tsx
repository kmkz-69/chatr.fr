import { IonCol, IonContent, IonGrid, IonPage, IonRow } from '@ionic/react'
import React, { ChangeEvent, Component } from 'react'
import { connect } from 'react-redux'
import { RouteComponentProps, withRouter } from 'react-router'
import routes from '../../routes'
import Request from './Install.request'
import { actions, selectors, InstallState, InstallActions } from './Install.state'
import Page from '../../components/Page/Page'
import Input from '../../components/Input/Input'
import Button from '../../components/Button/Button'

interface InstallProps extends
  InstallState, InstallActions, RouteComponentProps {}

class Install extends Component<InstallProps> {
  request: Request

  constructor (props: any) {
    super(props)
    this.request = new Request()
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleCreateClick = this.handleCreateClick.bind(this)
    this.validateInstall()
  }

  handleInputChange (event: ChangeEvent) {
    const target = event.target as HTMLInputElement
    const { value, name } = target
    switch (name) {
      case 'username':
        this.props.replaceUsername(value)
        break
      case 'password':
        this.props.replacePassword(value)
        break
      case 'confirmPassword':
        this.props.replaceConfirmPassword(value)
        break
    }
  }

  handleCreateClick () {
    const { username, password, confirmPassword } = this.props
    const admin = { username, password, confirmPassword }
    this.request.createAdmin(admin, () => {
      this.props.history.push(routes.adminSignIn.path)
    })
  }

  validateInstall () {
    this.request.validateInstall(() => {
      this.props.history.push(routes.adminSignIn.path)
    })
  }

  render () {
    return (
      <IonPage>
        <IonContent>
          <Page
            invert={false}
            container="small">
            <IonGrid>
              <IonRow>
                <IonCol>
                  <Input
                    name="username"
                    type="text"
                    value={this.props.username}
                    placeholder="Username"
                    handleChange={this.handleInputChange} />
                  <Input
                    name="password"
                    type="password"
                    value={this.props.password}
                    placeholder="Password"
                    handleChange={this.handleInputChange} />
                  <Input
                    name="confirmPassword"
                    type="password"
                    value={this.props.confirmPassword}
                    placeholder="Confirm password"
                    handleChange={this.handleInputChange} />
                  <Button
                    text="Create Admin"
                    handleClick={this.handleCreateClick} />
                </IonCol>
              </IonRow>
            </IonGrid>
          </Page>
        </IonContent>
      </IonPage>
    )
  }
}

export default withRouter(connect(selectors, actions)(Install))
