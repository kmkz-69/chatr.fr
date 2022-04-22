import { IonCol, IonIcon, isPlatform } from '@ionic/react'
import React, { Component } from 'react'
import { videocamOutline } from 'ionicons/icons'
import Skeleton from '../Skeleton/Skeleton'
import styles from './ActiveVideoSkeleton.module.scss'

interface ActiveVideoSkeletonProps {
  visibility: boolean
}

export default class ActiveVideoSkeleton extends Component<ActiveVideoSkeletonProps> {
  get skeletonHeight () {
    return isPlatform('mobile') ? 'calc(100vw / (16/9))' : '100vh'
  }

  render () {
    return this.props.visibility &&
      <IonCol size="12">
        <div className={styles.activeVideoSkeleton}>
          <Skeleton
            width="100%"
            height="0"
            paddingBottom={this.skeletonHeight} />
          <IonIcon
            className={styles.icon}
            icon={videocamOutline} />
        </div>
      </IonCol>
  }
}
