import { IonCol, IonContent, IonGrid, IonPage, IonRow } from '@ionic/react'
import React, { ChangeEvent, Component } from 'react'
import { RouteComponentProps, withRouter } from 'react-router'
import { connect } from 'react-redux'
import routes from '../../routes'
import { actions, selectors, AdminSignInState, AdminSignInActions } from './AdminSignIn.state'
import Request from './AdminSignIn.request'
import Page from '../../components/Page/Page'
import Input from '../../components/Input/Input'
import Button from '../../components/Button/Button'

interface AdminSignInProps extends
  AdminSignInState, AdminSignInActions, RouteComponentProps {}

class AdminSignIn extends Component<AdminSignInProps> {
  request: Request

  constructor (props: any) {
    super(props)
    this.request = new Request()
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSignInClick = this.handleSignInClick.bind(this)
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
    }
  }

  handleSignInClick () {
    const { username, password } = this.props
    const credentials = { username, password }
    this.request.signIn(credentials, () => {
      this.props.history.push(routes.hosts.path)
    })
  }

  clearForm () {
    this.props.replaceUsername('')
    this.props.replacePassword('')
  }

  componentWillUnmount () {
    this.clearForm()
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
                  <Button
                    text="Sign In"
                    handleClick={this.handleSignInClick} />
                </IonCol>
              </IonRow>
            </IonGrid>
          </Page>
        </IonContent>
      </IonPage>
    )
  }
}

export default withRouter(connect(selectors, actions)(AdminSignIn))
