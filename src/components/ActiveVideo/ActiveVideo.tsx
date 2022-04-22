import { isPlatform, IonCol } from '@ionic/react';
import React, { Component } from 'react';
import {
  MeetingWhiteboardDrawingsState,
  VideoState,
} from '../../pages/Meeting/Meeting.state';
import VideoBlock, { VideoBlockHandleClick } from '../VideoBlock/VideoBlock';
import Whiteboard, {
  WhiteboardDrawingAddHandle,
} from '../Whiteboard/Whiteboard';
import styles from './ActiveVideo.module.scss';
interface ActiveVideoProps {
  video: VideoState;
  whiteboardDrawings: MeetingWhiteboardDrawingsState;
  whiteboardEnabled: boolean;
  handleWhiteboardCanvasClearClick: () => void;
  handleWhiteboardDrawingAdd: WhiteboardDrawingAddHandle;
  handleVideoBlockClick: VideoBlockHandleClick;
}

export default class ActiveVideo extends Component<ActiveVideoProps> {
  get className() {
    const mobileClass = isPlatform('mobile') && styles.mobile;
    return `${styles.activeVideo} ${mobileClass}`;
  }

  get videoBlockClassName() {
    const visibilityClass = this.props.whiteboardEnabled && styles.hide; // To fix no audio when whiteboard enable
    return `${styles.videoBlock} ${visibilityClass}`;
  }

  get videoBlock() {
    return (
      <div className={this.videoBlockClassName}>
        <VideoBlock
          ratio="full"
          video={this.props.video}
          handleClick={this.props.handleVideoBlockClick}
        />
      </div>
    );
  }

  get whiteboard() {
    return (
      this.props.whiteboardEnabled && (
        <Whiteboard
          drawings={this.props.whiteboardDrawings}
          handleCanvasClearClick={this.props.handleWhiteboardCanvasClearClick}
          handleDrawingAdd={this.props.handleWhiteboardDrawingAdd}
        />
      )
    );
  }

  render() {
    return (
      <IonCol className={this.className} size="12">
        {this.whiteboard}
        {this.videoBlock}
      </IonCol>
    );
  }
}
