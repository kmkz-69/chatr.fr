import { IonIcon, isPlatform } from '@ionic/react';
import React, { Component } from 'react';
import {
	addOutline,
	brushOutline,
	colorPaletteOutline,
	removeOutline,
	trashOutline
} from 'ionicons/icons';
import styles from './WhiteboardMenuItem.module.scss';

export type WhiteboardMenuItemName = 'color' | 'size' | 'zoomIn' | 'zoomOut' | 'clear'

type Icons = Record<WhiteboardMenuItemName, string>

interface WhiteboardMenuItemProps {
  name: WhiteboardMenuItemName
  handleClick: (name: WhiteboardMenuItemName) => void
}

export default class WhiteboardMenuItem extends Component<WhiteboardMenuItemProps> {
	icons: Icons = {
		color: colorPaletteOutline,
		size: brushOutline,
		zoomIn: addOutline,
		zoomOut: removeOutline,
		clear: trashOutline
	};

	constructor (props: WhiteboardMenuItemProps) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}

	get className () {
		const mobileClass = isPlatform('mobile') && styles.mobile;
		return `${styles.whiteboardMenuItem} ${mobileClass}`;
	}

	get icon () {
		return this.icons[this.props.name];
	}

	handleClick () {
		this.props.handleClick(this.props.name);
	}

	render () {
		return (
			<IonIcon
				className={this.className}
				icon={this.icon}
				onClick={this.handleClick} />
		);
	}
}
