import React, { Component } from 'react';
import Header from '../Header/Header';
import Container, { ContainerWidth } from '../Container/Container';
import Footer from '../Footer/Footer';
import Alert from '../Alert/Alert';
import styles from './Page.module.scss';

interface PageProps {
  invert: boolean
  container: ContainerWidth
}

export default class Page extends Component<PageProps> {
	get mainClassName () {
		const invertClass = this.props.invert && styles.invert;
		const containerClass = styles[this.props.container];
		return `${styles.main} ${invertClass} ${containerClass}`;
	}

	get headerVisibility () {
		return this.props.container !== 'full';
	}

	get containerVisibility () {
		return !this.props.invert;
	}

	get footerVisibility () {
		return this.props.container === 'small';
	}

	get footerInvert () {
		return !this.props.invert;
	}

	render () {
		return (
			<div className={styles.page}>
				<div className={this.mainClassName}>
					<Header
						visibility={this.headerVisibility}
						invert={this.props.invert} />
					<Container
						visibility={this.containerVisibility}
						width={this.props.container}>
						{this.props.children}
					</Container>
				</div>
				<Footer
					visibility={this.footerVisibility}
					invert={this.footerInvert} />
				<Alert />
			</div>
		);
	}
}
