import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';

import { Modal } from '../../../ui/Theme';

import LogOutModal from '../../../auth/logOut/modal/LogOutModalContainer';

import './Header.css';

function arrayBufferToBase64(buffer) {
	let binary = '';
	const bytes = new Uint8Array(buffer);
	const len = bytes.byteLength;
	for (let i = 0; i < len; i++) {
		binary += String.fromCharCode(bytes[i]);
	}
	return btoa(binary);
}

class Header extends Component {
	constructor(props) {
		super(props);
		this.state = {
			modalShow: false,
			children: <div />,
		};
		this.handleModalClose = this.handleModalClose.bind(this);
	}

	getNavigation = () => {
		const { project_id, task_id } = this.props.match.params;

		const navigationProject = (project_id) ? (
			<div className='nav-bar-item'>
				<div className='separator'>/</div>
				<Link to={`/dashboard/project/detail/${project_id}`}>Project</Link>
			</div>
		) : null;

		const navigationSchedule = (task_id) ? (
			<div className='nav-bar-item'>
				<div className='separator'>/</div>
				<Link to={`/dashboard/schedule/${project_id}`}>Schedule</Link>
			</div>
		) : null;

		return (
			<div className='nav-bar'>
				<Link to='/dashboard/'> Home </Link>
				{navigationProject}
				{navigationSchedule}
			</div>
		);
	}

	handleModalClose() {
		this.setState({ modalShow: false });
	}

	handleModal(children) {
		this.setState({ modalShow: true, children });
	}

	renderProfilePicture() {
		if (this.props.profile_picture.fileBinary) {
			const arrayBuffer = this.props.profile_picture.fileBinary.data;
			const base64String = arrayBufferToBase64(arrayBuffer);
			const imageSrc = `data:image/png;base64,${base64String}`;
			return (<img src={imageSrc} alt='user-profile' className='avatar' />);
		}
		return <i className='icon-user small' />;
	}

	render() {
		const { modalShow, children } = this.state;
		const { device, headerTitle } = this.props;
		if (device === 'mobile') {
			return (
				<div>
					<div className='header-mobile'>
						<div className='logo-wrapper'>
							<i className='logo-public-bloc' />
							<div className='text'>Public Bloc</div>
						</div>
						<div className='top-menu'>
							<div className='top-menu-item'>
								<Button
									className='btn-link'
								>
									<i className='icon-notification small' />
								</Button>
							</div>
							<div className='top-menu-item'>
								<Link to='/dashboard/profile'>
									{this.renderProfilePicture()}
								</Link>
							</div>
							<div className='top-menu-item'>
								<Button
									className='btn-link'
									onClick={() => this.handleModal(
										<LogOutModal
											handleModalClose={this.handleModalClose}
										/>,
									)}
								>
									<i className='icon-logout small' />
								</Button>
							</div>
							<div className='top-menu-item'>
								<Button
									className='btn-link'
									onClick={() => this.props.onChangeMenuStatus()}
								>
									<i className='icon-menu small' />
								</Button>
							</div>
						</div>
					</div>
					<div className='sub-header-mobile'>
						<div>
							<div className='title'>{headerTitle}</div>
							{this.getNavigation()}
						</div>
					</div>
					<Modal
						show={modalShow}
						handleClose={this.handleModalClose}
					>
						{children}
					</Modal>
				</div>
			);
		}
		return (
			<div className='header-desktop'>
				<div>
					<div className='title'>{headerTitle}</div>
					{this.getNavigation()}
				</div>
				<div className='top-menu'>
					<div className='top-menu-item'>
						<Button
							className='btn-link'
						>
							<i className='icon-notification small' />
						</Button>
					</div>
					<div className='top-menu-item'>
						<Link to='/dashboard/profile'>
							{this.renderProfilePicture()}
						</Link>
					</div>
					<div className='top-menu-item'>
						<Button
							className='btn-link'
							onClick={() => this.handleModal(
								<LogOutModal
									handleModalClose={this.handleModalClose}
								/>,
							)}
						>
							<i className='icon-logout small' />
						</Button>
					</div>
					<div className='top-menu-item'>
						<Button
							className='btn-link'
							onClick={() => this.props.onChangeMenuStatus()}
						>
							<i className='icon-menu small' />
						</Button>
					</div>
				</div>
				<Modal
					show={modalShow}
					handleClose={this.handleModalClose}
				>
					{children}
				</Modal>
			</div>
		);
	}
}

Header.propTypes = {
	headerTitle: PropTypes.string.isRequired,
	device: PropTypes.string,
	onChangeMenuStatus: PropTypes.func,
	match: PropTypes.object.isRequired,
	profile_picture: PropTypes.object,
};

Header.defaultProps = {
	headerTitle: '',
	device: 'desktop',
	onChangeMenuStatus: () => null,
	profile_picture: {},
};

export default Header;
