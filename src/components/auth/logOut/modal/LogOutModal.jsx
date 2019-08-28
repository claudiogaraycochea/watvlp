import React, { Component } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

import { withRouter } from 'react-router-dom';

import './LogOutModal.css';

class LogOutModal extends Component {
	constructor(props, context) {
		super(props, context);
		this.state = {};
	}

	logOut() {
		localStorage.clear();
		this.props.history.push('/');
	}

	render() {
		const { handleModalClose } = this.props;
		return (
			<div>
				<div className='modal-header'>Logout</div>
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
								Do you wish to close the session?
							</div>
						</Col>
					</Row>
				</div>
				<div className='modal-bottom'>
					<Button variant='primary' onClick={handleModalClose}>Cancel</Button>
					<Button variant='secondary' onClick={() => this.logOut()}>Accept</Button>
				</div>
			</div>
		);
	}
}

LogOutModal.propTypes = {
	handleModalClose: PropTypes.func.isRequired,
	history: PropTypes.object.isRequired,
};

export default withRouter(LogOutModal);
