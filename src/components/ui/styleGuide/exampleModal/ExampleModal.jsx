import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

class ExampleModal extends Component {
	constructor(props, context) {
		super(props, context);
		this.state = {};
	}

	render() {
		const { handleModalClose, handleModalAccept } = this.props;
		return (
			<div>
				<div className='modal-header'>
					Modal Title
				</div>
				<div className='modal-container'>
          Modal Container
				</div>
				<div className='modal-bottom'>
					<Button variant='primary' onClick={handleModalClose}>Cancel</Button>
					<Button variant='secondary' onClick={handleModalAccept}>Accept</Button>
				</div>
			</div>
		);
	}
}

ExampleModal.propTypes = {
	handleModalClose: PropTypes.func.isRequired,
	handleModalAccept: PropTypes.func.isRequired,
};

export default ExampleModal;
