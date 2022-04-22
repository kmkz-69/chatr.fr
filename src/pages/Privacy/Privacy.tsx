import { IonContent, IonPage, IonCol, IonGrid, IonRow } from '@ionic/react'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { actions, selectors, PrivacyState, PrivacyActions } from './Privacy.state'
import PrivacyRequest from './Privacy.request'
import Page from '../../components/Page/Page'
import PrivacySkeleton from '../../components/PrivacySkeleton/PrivacySkeleton'
import styles from './Privacy.module.scss'

interface PrivacyProps extends PrivacyState, PrivacyActions {}

class Privacy extends Component<PrivacyProps> {
  request: PrivacyRequest

  constructor (props: PrivacyProps) {
    super(props)
    this.request = new PrivacyRequest()
  }

  get privacyHTML () {
    return { __html: this.props.privacy || '' }
  }

  get skeletonVisibility () {
    return !this.props.privacy
  }

  setPrivacy () {
    this.request.read(privacy => this.props.replacePrivacy(privacy))
  }

  componentDidMount () {
    this.setPrivacy()
  }

  render () {
    return (
      <IonPage>
        <IonContent>
          <Page
            invert={false}
            container="regular">
            <IonGrid>
              <IonRow>
                <IonCol>
                  <div className={styles.privacy}>
                    <h1>Privacy Policy</h1>
                    <div
                      className={styles.content}
                      dangerouslySetInnerHTML={this.privacyHTML} />
                    <PrivacySkeleton visibility={this.skeletonVisibility} />
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

export default connect(selectors, actions)(Privacy)
