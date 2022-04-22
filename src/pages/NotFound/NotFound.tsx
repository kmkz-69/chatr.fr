import { IonCol, IonContent, IonGrid, IonPage, IonRow } from '@ionic/react'
import React, { Component } from 'react'
import { RouteComponentProps, withRouter } from 'react-router'
import routes from '../../routes'
import Page from '../../components/Page/Page'
import Button from '../../components/Button/Button'
import styles from './NotFound.module.scss'

interface NotFoundProps extends RouteComponentProps {}

class NotFound extends Component<NotFoundProps> {
  constructor (props: NotFoundProps) {
    super(props)
    this.handleReturnHomeClick = this.handleReturnHomeClick.bind(this)
  }

  handleReturnHomeClick () {
    this.props.history.push(routes.home.path)
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
                  <div className={styles.notFound}>
                    <h1 className={styles.heading}>404</h1>
                    <p className={styles.description}>Page Not Found</p>
                    <Button
                      text="Return to Home"
                      handleClick={this.handleReturnHomeClick} />
                  </div>
                </IonCol>
              </IonRow>
            </IonGrid>
          </Page>
        </IonContent>
      </IonPage>
    )
  }
}

export default withRouter(NotFound)
