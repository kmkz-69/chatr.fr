import { IonCol, IonContent, IonGrid, IonPage, IonRow } from '@ionic/react'
import React, { ChangeEvent, Component } from 'react'
import { connect } from 'react-redux'
import { RouteComponentProps, withRouter } from 'react-router'
import routes from '../../routes'
import Request from './Start.request'
import { actions, selectors, StartState, StartActions } from './Start.state'
import Page from '../../components/Page/Page'
import Input from '../../components/Input/Input'
import Button from '../../components/Button/Button'

interface StartProps extends StartState, StartActions, RouteComponentProps {}

class Start extends Component<StartProps> {
  request: Request

  constructor (props: any) {
    super(props)
    this.request = new Request()
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleStartClick = this.handleStartClick.bind(this)
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

  handleStartClick () {
    const { username, password } = this.props
    const credentials = { username, password }
    this.request.signIn(credentials, () => {
      this.props.replaceAppAuthType('host')
      this.props.history.push(routes.meeting.path)
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
                    text="Start Meeting"
                    handleClick={this.handleStartClick} />
                </IonCol>
              </IonRow>
            </IonGrid>
          </Page>
        </IonContent>
      </IonPage>
    )
  }
}

export default withRouter(connect(selectors, actions)(Start))
