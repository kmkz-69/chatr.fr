import { IonCol, IonContent, IonGrid, IonPage, IonRow } from '@ionic/react'
import React, { Component } from 'react'
import { RouteComponentProps, withRouter } from 'react-router'
import routes from '../../routes'
import Page from '../../components/Page/Page'
import Button from '../../components/Button/Button'

interface HomeProps extends RouteComponentProps {}

class Home extends Component<HomeProps> {
  constructor (props: HomeProps) {
    super(props)
    this.handleStartClick = this.handleStartClick.bind(this)
    this.handleJoinClick = this.handleJoinClick.bind(this)
  }

  handleStartClick () {
    this.props.history.push(routes.start.path)
  }

  handleJoinClick () {
    this.props.history.push(routes.join.path)
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
                  <Button
                    text="Start a Meeting"
                    handleClick={this.handleStartClick} />
                  <Button
                    text="Join a Meeting"
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

export default withRouter(Home)
