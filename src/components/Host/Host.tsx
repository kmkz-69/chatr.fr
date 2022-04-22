import { IonCard } from '@ionic/react';
import React, { Component } from 'react';
import moment from 'moment';
import { HostState } from '../../pages/Hosts/Hosts.state';
import FloatButton from '../FloatButton/FloatButton';
import styles from './Host.module.scss';
import AlertService from '../../services/AlertService';

interface HostProps {
  host: HostState
  handleDeleteClick: (id: number) => void
}

export default class Host extends Component<HostProps> {
	constructor (props: HostProps) {
		super(props);
		this.handleDeleteClick = this.handleDeleteClick.bind(this);
	}

	get lastMeeting () {
		const { lastMeetingAt } = this.props.host;
		return lastMeetingAt
			? moment(lastMeetingAt).format('LLL')
			: '-';
	}

	handleDeleteClick () {
		const isDemoAccount = (this.props.host.username === 'host');
		if (isDemoAccount) AlertService.push('You can\'t delete demo host');
		else this.props.handleDeleteClick(this.props.host.id);
	}

	render () {
		return (
			<IonCard>
				<div className={styles.host}>
					<div className={styles.user}>
						<h3 className={styles.name}>{this.props.host.name}</h3>
						<div className={styles.username}>{this.props.host.username}</div>
						<div className={styles.lastMeeting}>
							<h3 className={styles.heading}>Last Meeting</h3>
							<div className={styles.time}>{this.lastMeeting}</div>
						</div>
					</div>
					<div className={styles.actions}>
						<FloatButton
							name="removeHost"
							handleClick={this.handleDeleteClick} />
					</div>
				</div>
			</IonCard>
		);
	}
}
