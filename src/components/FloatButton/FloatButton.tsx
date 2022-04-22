import { IonFabButton, IonIcon } from '@ionic/react';
import React, { Component } from 'react';
import { handRightOutline, personRemoveOutline } from 'ionicons/icons';
import styles from './FloatButton.module.scss';

type FloatButtonName = 'removeHost' | 'raiseHand'
type Icons = Record<FloatButtonName, string>
type Colors = Record<FloatButtonName, string>

export interface FloatButtonProps {
  name: FloatButtonName
  handleClick?: () => void
}

export default class FloatButton extends Component<FloatButtonProps> {
	colors: Colors = {
		removeHost: 'danger',
		raiseHand: 'warning'
	};

	icons: Icons = {
		removeHost: personRemoveOutline,
		raiseHand: handRightOutline
	};

	get color () {
		return this.colors[this.props.name];
	}

	get icon () {
		return this.icons[this.props.name];
	}

	render () {
		return (
			<div className={styles.floatButton}>
				<IonFabButton
					className={styles.button}
					color={this.color}
					size="small"
					onClick={this.props.handleClick}>
					<IonIcon
						className={styles.icon}
						icon={this.icon} />
				</IonFabButton>
			</div>
		);
	}
}
