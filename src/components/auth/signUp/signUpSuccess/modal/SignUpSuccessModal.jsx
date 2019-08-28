import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

class SignUpSuccessModal extends Component {
	constructor(props, context) {
		super(props, context);
		this.state = {};
	}

	render() {
		const { handleModalAccept, email } = this.props;
		return (
			<div>
				<div className='modal-header'>
					{'Thanks for Signing Up!'}
				</div>
				<div className='modal-container'>
					<div>{`We’ve sent a confirmation email to ${email}`}</div>
					<div>
						Make sure you click the link in the email to
						confirm your account and complete your sign up.
					</div>
				</div>
				<div className='modal-bottom'>
					<Button variant='secondary' onClick={handleModalAccept}>Accept</Button>
				</div>
			</div>
		);
	}
}

SignUpSuccessModal.propTypes = {
	handleModalAccept: PropTypes.func.isRequired,
	email: PropTypes.string.isRequired,
};

SignUpSuccessModal.defaultProps = {
	handleModalAccept: () => null,
	email: '',
};

export default SignUpSuccessModal;
