import React, { Component } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

import './UserProfileModal.css';

class UserProfileModal extends Component {
	constructor(props, context) {
		super(props, context);
		this.state = {};
	}

	render() {
		const { handleModalClose, handleModalAccept } = this.props;
		const { contractor } = this.props;
		console.log(contractor);
		return (
			<div>
				<div className='modal-header'>User Profile</div>
				<div className='modal-container'>
					<Row>
						<Col>
							<div className='d-flex justify-content-center'>
								<i className='icon-user icon-large' />
							</div>
						</Col>
					</Row>
					<Row>
						<Col>
							<div className='d-flex justify-content-center'>
								<h2>{contractor.fullname}</h2>
							</div>
							<div className='d-flex justify-content-center'>
								<div className='text-muted'>{contractor.role}</div>
							</div>
						</Col>
					</Row>
					<Row className='div-line'>
						<Col className='col-4'>
							<div className='text-muted'>Email</div>
						</Col>
						<Col className='col-8'>
							{contractor.email}
						</Col>
					</Row>
					<Row className='div-line'>
						<Col className='col-4'>
							<div className='text-muted'>Phone Number</div>
						</Col>
						<Col className='col-8'>
							{contractor.phonenumber}
						</Col>
					</Row>
					<Row className='div-line'>
						<Col className='col-4'>
							<div className='text-muted'>Location</div>
						</Col>
						<Col className='col-8'>
							{(contractor.address) ? contractor.address.city : null}
							{' / '}
							{(contractor.address) ? contractor.address.state : null}
							{' / '}
							{(contractor.address) ? contractor.address.country : null}
						</Col>
					</Row>
				</div>
				<div className='modal-bottom'>
					<Button variant='primary' onClick={handleModalClose}>Cancel</Button>
					<Button variant='secondary' onClick={handleModalAccept}>Accept</Button>
				</div>
			</div>
		);
	}
}

UserProfileModal.propTypes = {
	handleModalClose: PropTypes.func.isRequired,
	handleModalAccept: PropTypes.func.isRequired,
	contractor: PropTypes.object.isRequired,
};

export default UserProfileModal;
