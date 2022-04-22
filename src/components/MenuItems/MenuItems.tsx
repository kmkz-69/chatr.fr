import { isPlatform } from '@ionic/react';
import React, { Component } from 'react';
import { MenuPosition } from '../Menu/Menu';
import MenuItem, { MenuItemProps } from '../MenuItem/MenuItem';
import styles from './MenuItems.module.scss';

interface MenuItemsProps {
  position: MenuPosition
  canInviteMember: boolean
  canRaiseHand: boolean
  canEndMeeting: boolean
  canVideoMute: boolean
  canAudioMute: boolean
  canScreenShare: boolean
  canWhiteboardEnable: boolean
  canMemberRemove: boolean
  screenShareVisibility: boolean
  handleInviteMemberClick: () => void
  handleRaiseHandClick: () => void
  handleEndMeetingClick: () => void
  handleVideoClick: () => void
  handleAudioClick: () => void
  handleScreenShareClick: () => void
  handleWhiteboardClick: () => void
  handleMemberRemoveClick: () => void
}

type Items = Record<MenuPosition, MenuItemProps[]>

export default class MenuItems extends Component<MenuItemsProps> {
	get items (): Items {
		return {
			top: [
				{
					name: 'screenShare',
					active: this.props.canScreenShare,
					visibility: this.props.screenShareVisibility,
					handleClick: this.props.handleScreenShareClick
				},
				{
					name: 'whiteboard',
					active: this.props.canWhiteboardEnable,
					visibility: true,
					handleClick: this.props.handleWhiteboardClick
				},
				{
					name: 'memberRemove',
					active: true,
					visibility: this.props.canMemberRemove,
					handleClick: this.props.handleMemberRemoveClick
				}
			],
			bottom: [
				{
					name: 'invite',
					active: this.props.canInviteMember,
					visibility: true,
					handleClick: this.props.handleInviteMemberClick
				},
				{
					name: 'raiseHand',
					active: this.props.canRaiseHand,
					visibility: true,
					handleClick: this.props.handleRaiseHandClick
				},
				{
					name: 'end',
					active: this.props.canEndMeeting,
					visibility: true,
					handleClick: this.props.handleEndMeetingClick
				},
				{
					name: 'video',
					active: this.props.canVideoMute,
					visibility: true,
					handleClick: this.props.handleVideoClick
				},
				{
					name: 'audio',
					active: this.props.canAudioMute,
					visibility: true,
					handleClick: this.props.handleAudioClick
				}
			]
		};
	}

	get className () {
		const positionClass = styles[this.props.position];
		const mobileClass = isPlatform('mobile') && styles.mobile;
		return `${styles.menuItems} ${positionClass} ${mobileClass}`;
	}

	get menuItems () {
		const items = this.items[this.props.position];
		return items.map(item =>
			<div
				className={styles.item}
				key={item.name}>
				<MenuItem
					name={item.name}
					active={item.active}
					visibility={item.visibility}
					handleClick={item.handleClick} />
			</div>
		);
	}

	render () {
		return (
			<div className={this.className}>
				{this.menuItems}
			</div>
		);
	}
}
