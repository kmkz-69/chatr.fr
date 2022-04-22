import { isPlatform } from '@ionic/react'
import React, { Component } from 'react'
import { VideoState } from '../../pages/Meeting/Meeting.state'
import Video from '../Video/Video'
import RaiseHand from '../RaiseHand/RaiseHand'
import styles from './VideoBlock.module.scss'

export type VideoBlockHandleClick = (video: VideoState) => void

export interface VideoBlockProps {
  ratio: 'full' | 'square'
  video: VideoState
  handleClick: VideoBlockHandleClick
}

export default class VideoBlock extends Component<VideoBlockProps> {
  constructor (props: VideoBlockProps) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  get className () {
    const ratioClass = styles[this.props.ratio]
    const mobileClass = isPlatform('mobile') && styles.mobile
    return `${styles.videoBlock} ${ratioClass} ${mobileClass}`
  }

  handleClick () {
    this.props.handleClick(this.props.video)
  }

  render () {
    return (
      <div
        className={this.className}
        onClick={this.handleClick}>
        <div className={styles.content}>
          <Video video={this.props.video} />
          <RaiseHand visibility={this.props.video.raiseHand} />
        </div>
      </div>
    )
  }
}
