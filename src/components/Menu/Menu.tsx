import { isPlatform } from '@ionic/react';
import { SocialSharing } from '@ionic-native/social-sharing';
import React, { Component } from 'react';
import copyToClipboard from 'copy-to-clipboard';
import AlertService from '../../services/AlertService';
import MenuToggle, { MenuToggleHandleChange } from '../MenuToggle/MenuToggle';
import MenuItems from '../MenuItems/MenuItems';
import styles from './Menu.module.scss';

export type MenuPosition = 'top' | 'bottom';

interface MenuProps {
  position: MenuPosition;
  canInviteMember: boolean;
  canRaiseHand: boolean;
  canEndMeeting: boolean;
  canVideoMute: boolean;
  canAudioMute: boolean;
  canScreenShare: boolean;
  canWhiteboardEnable: boolean;
  canMemberRemove: boolean;
  inviteText: string;
  isExpanded: boolean;
  handleRaiseHandClick: () => void;
  handleEndMeetingClick: () => void;
  handleVideoClick: () => void;
  handleAudioClick: () => void;
  handleScreenShareClick: () => void;
  handleWhiteboardClick: () => void;
  handleMemberRemoveClick: () => void;
  handleToggleChange: MenuToggleHandleChange;
}

interface MenuLocalState {
  visibility: boolean;
}

export default class Menu extends Component<MenuProps, MenuLocalState> {
	constructor(props: MenuProps) {
		super(props);
		this.state = {
			visibility: true,
		};
		this.handleInviteMemberClick = this.handleInviteMemberClick.bind(this);
		this.handleToggleChange = this.handleToggleChange.bind(this);
	}

	get className() {
		const positionClass = styles[this.props.position];
		return `${styles.menu} ${positionClass}`;
	}

	isPosition(position: MenuPosition) {
		return this.props.position === position;
	}

	handleToggleChange(position: MenuPosition) {
		this.props.handleToggleChange(position);
		const visibility = !this.props.isExpanded;
		this.setState({ visibility });
	}

	handleInviteMemberClick() {
		if (!this.props.canInviteMember) return;
		const { inviteText } = this.props;
		if (isPlatform('hybrid')) SocialSharing.share(inviteText);
		else {
			copyToClipboard(inviteText);
			AlertService.push('Invitation copied.');
		}
	}

	menuToggle(postion: MenuPosition) {
		return (
			this.isPosition(postion) && (
				<MenuToggle
					isExpanded={this.props.isExpanded}
					position={this.props.position}
					handleChange={this.handleToggleChange}
				/>
			)
		);
	}

	get screenShareVisibility() {
		return !isPlatform('mobile');
	}

	get menuItems() {
		return (
			this.state.visibility && (
				<MenuItems
					position={this.props.position}
					canInviteMember={this.props.canInviteMember}
					canRaiseHand={this.props.canRaiseHand}
					canEndMeeting={this.props.canEndMeeting}
					canVideoMute={this.props.canVideoMute}
					canAudioMute={this.props.canAudioMute}
					canScreenShare={this.props.canScreenShare}
					canWhiteboardEnable={this.props.canWhiteboardEnable}
					canMemberRemove={this.props.canMemberRemove}
					screenShareVisibility={this.screenShareVisibility}
					handleInviteMemberClick={this.handleInviteMemberClick}
					handleRaiseHandClick={this.props.handleRaiseHandClick}
					handleEndMeetingClick={this.props.handleEndMeetingClick}
					handleVideoClick={this.props.handleVideoClick}
					handleAudioClick={this.props.handleAudioClick}
					handleScreenShareClick={this.props.handleScreenShareClick}
					handleWhiteboardClick={this.props.handleWhiteboardClick}
					handleMemberRemoveClick={this.props.handleMemberRemoveClick}
				/>
			)
		);
	}

	render() {
		return (
			<div className={this.className}>
				{this.menuToggle('bottom')}
				{this.menuItems}
				{this.menuToggle('top')}
			</div>
		);
	}
}
