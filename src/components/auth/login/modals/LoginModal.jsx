import React, { Component } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

import { withRouter } from 'react-router-dom';

class LoginModal extends Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			item_name: '',
		};
	}

	logOut() {
		localStorage.clear();
		this.props.history.push('/');
	}

	render() {
		const { handleModalClose, item_name } = this.props;
		return (
			<div>
				<div className='modal-header'>Login</div>
				<div className='modal-container'>
					<Row>
						<Col>
							<Form.Group>
								<Form.Label>Email</Form.Label>
								<Form.Control
									type='email'
									placeholder='Email'
									name='item_name'
									value={item_name}
									onChange={this.handleInputChange}
								/>
							</Form.Group>
							<Form.Group>
								<Form.Label>Password</Form.Label>
								<Form.Control
									type='password'
									placeholder='*******'
									name='item_name'
									value={item_name}
									onChange={this.handleInputChange}
								/>
							</Form.Group>
						</Col>
					</Row>
				</div>
				<div className='modal-bottom'>
					<Button variant='primary' onClick={handleModalClose}>Cancel</Button>
					<Button variant='secondary' onClick={() => this.logOut()}>Login</Button>
				</div>
			</div>
		);
	}
}

LoginModal.propTypes = {
	handleModalClose: PropTypes.func.isRequired,
	history: PropTypes.object.isRequired,
};

export default withRouter(LoginModal);
