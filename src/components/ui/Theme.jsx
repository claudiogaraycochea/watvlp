import React from 'react';
import PropTypes from 'prop-types';
import { Modal as BootstrapModal, Button } from 'react-bootstrap';

export const Modal = (props) => {
	const { show, handleClose, children } = props;
	return (
		<BootstrapModal show={show}>
			<BootstrapModal.Header>
				<Button
					variant='primary'
					className='modal-close'
					onClick={handleClose}
				/>
			</BootstrapModal.Header>
			<BootstrapModal.Body>{children}</BootstrapModal.Body>
		</BootstrapModal>
	);
};

Modal.propTypes = {
	show: PropTypes.bool,
	handleClose: PropTypes.func.isRequired,
	children: PropTypes.node.isRequired,
};

Modal.defaultProps = {
	show: false,
	children: <div />,
};

export const Table = (props) => {
	const { children } = props;
	return <table className='table-resp'>{children}</table>;
};

Table.propTypes = {
	children: PropTypes.node.isRequired,
};

export const ButtonHotAccessIcon = (props) => {
	const { icon, children } = props;
	return (
		<div className='box'>
			<div className='btn-hot-access btn-hot-access-icon'>
				<div className={icon} />
				<div>{children}</div>
			</div>
		</div>
	);
};

ButtonHotAccessIcon.propTypes = {
	icon: PropTypes.string.isRequired,
	children: PropTypes.string.isRequired,
};

export const StatusButtonCircle = (props) => {
	let status = {};
	switch (props.status) {
		case 'delayed':
			status = {
				class: 'delayed',
			};
			break;
		case 'in-alert':
			status = {
				class: 'in-alert',
			};
			break;
		case 'in-progress':
			status = {
				class: 'in-progress',
			};
			break;
		default:
			status = {
				class: '',
			};
	}
	return (
		<div
			className={`status-button-circle ${status.class} icon-${
				props.icon
			}-white`}
		/>
	);
};

StatusButtonCircle.propTypes = {
	icon: PropTypes.string.isRequired,
	status: PropTypes.string.isRequired,
};

export const StatusBar = (props) => {
	const { percentage } = props;
	const stylesAdvanceBar = {
		width: `${percentage}%`,
	};
	const classStatusComplete = (percentage === 100) ? 'complete' : null;

	return (
		<div className='project-status-bar'>
			<div className={`advance-bar ${classStatusComplete}`} style={stylesAdvanceBar} />
		</div>
	);
};

StatusBar.propTypes = {
	percentage: PropTypes.any.isRequired,
};

export const StatusNotification = (props) => {
	let status = {};

	switch (props.status) {
		case 'not-started':
			status = {
				name: 'Not Started',
				class: 'not-started',
			};
			break;
		case 'in-progress':
			status = {
				name: 'In Progress',
				class: 'in-progress',
			};
			break;
		case 'delayed':
			status = {
				name: 'Delayed',
				class: 'delayed',
			};
			break;
		case 'needs-verification':
			status = {
				name: 'Needs Verification',
				class: 'needs-verification',
			};
			break;
		case 'awaiting-permit':
			status = {
				name: 'Awaiting Permit',
				class: 'awaiting-permit',
			};
			break;
		case 'awaiting-inspection':
			status = {
				name: 'Awaiting Inspection',
				class: 'awaiting-inspection',
			};
			break;
		case 'complete':
			status = {
				name: 'Complete',
				class: 'complete',
			};
			break;
		default:
			status = {
				name: 'Undefined',
				class: '',
			};
	}
	return (
		<div className={`status-notification ${status.class}`}>{status.name}</div>
	);
};

StatusNotification.propTypes = {
	status: PropTypes.any.isRequired,
};

export const UserProject = (props) => {
	const { fullname, subtitle, menuAction } = props;
	return (
		<div className='user-project'>
			<div className='image'>
				<i className='icon-user-sec' />
			</div>
			<div className='description'>
				<div className='fullname'>{fullname}</div>
				<div className='subtitle'>{subtitle}</div>
			</div>
			<div>
				<Button className='btn-link' onClick={menuAction}>
					<i className='icon-menu-sec' />
				</Button>
			</div>
		</div>
	);
};

UserProject.propTypes = {
	fullname: PropTypes.string.isRequired,
	subtitle: PropTypes.string.isRequired,
	menuAction: PropTypes.func.isRequired,
};
