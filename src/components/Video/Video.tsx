import React, { Component } from 'react';
import { VideoState } from '../../pages/Meeting/Meeting.state';
import styles from './Video.module.scss';

interface VideoProps {
  video: VideoState
}

interface VideoLocalState {
  renderId: string
}

export default class Video extends Component<VideoProps, VideoLocalState> {
	constructor (props: VideoProps) {
		super(props);
		this.state = {
			renderId: this.props.video.renderId
		};
		this.setSource = this.setSource.bind(this);
	}

	get className () {
		const isScreen = (this.props.video.kind === 'screen');
		const filpClass = !isScreen && styles.horizontalFlip;
		return `${styles.video} ${filpClass}`;
	}

	setSource (element: HTMLVideoElement | null) {
		const { video } = this.props;
		if (element && video) {
			element.srcObject = video.stream;
		}
	}

	shouldComponentUpdate (props: VideoProps, state: VideoState) {
		const { renderId } = props.video;
		const hasChangedRenderId = (renderId !== state.renderId);
		if (hasChangedRenderId) this.setState({ renderId });
		return hasChangedRenderId;
	}

	render () {
		return (
			<video
				className={this.className}
				autoPlay={true}
				muted={this.props.video.muted}
				playsInline={true}
				ref={element => this.setSource(element)} // Fix blank video
			/>
		);
	}
}
