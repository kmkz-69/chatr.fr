import { IonCol, IonContent, IonGrid, IonPage, IonRow } from '@ionic/react'
import React, { ChangeEvent, Component } from 'react'
import { RouteComponentProps, withRouter } from 'react-router'
import { connect } from 'react-redux'
import { trim } from 'lodash'
import qs from 'qs'
import routes from '../../routes'
import AlertService from '../../services/AlertService'
import { actions, selectors, JoinState, JoinActions } from './Join.state'
import Page from '../../components/Page/Page'
import Input from '../../components/Input/Input'
import Button from '../../components/Button/Button'

interface JoinProps extends JoinActions, JoinState, RouteComponentProps {}

class Join extends Component<JoinProps> {
  constructor (props: any) {
    super(props)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleJoinClick = this.handleJoinClick.bind(this)
  }

  handleInputChange (event: ChangeEvent) {
    const target = event.target as HTMLInputElement
    const { value, name } = target
    if (name === 'meetingId') this.props.replaceMeetingId(value)
  }

  handleJoinClick () {
    const meetingId = trim(this.props.meetingId)
    if (!meetingId) {
      const message = 'Meeting ID is not allowed to be empty'
      return AlertService.push(message)
    }
    this.props.replaceMeetingMeetingId(meetingId)
    this.props.history.push(routes.meeting.path)
  }

  setMeetingIdFromUrl () {
    const { search } = this.props.history.location
    const query = qs.parse(search, { ignoreQueryPrefix: true })
    const meetingId = query.id as string
    if (meetingId) this.props.replaceMeetingId(meetingId)
  }

  clearForm () {
    this.props.replaceMeetingId('')
  }

  componentDidMount () {
    this.setMeetingIdFromUrl()
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
                    name="meetingId"
                    type="text"
                    value={this.props.meetingId}
                    placeholder="Meeting ID"
                    handleChange={this.handleInputChange} />
                  <Button
                    text="Join Meeting"
                    handleClick={this.handleJoinClick} />
                </IonCol>
              </IonRow>
            </IonGrid>
          </Page>
        </IonContent>
      </IonPage>
    )
  }
}

export default withRouter(connect(selectors, actions)(Join))
