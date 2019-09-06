import React, { Component } from 'react';
import PropType from 'prop-types';
import {
	Alert,
	Button,
	Col,
	Container,
	Form,
	Row,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { Modal } from '../../ui/Theme';
import countries from '../../core/utils/countries';

import SignUpSuccessModal from './signUpSuccess/modal/SignUpSuccessModal';

class SignUp extends Component {
	constructor(props) {
		super(props);
		this.state = {
			modalShow: false,
			children: <div />,
			validated: false,
			terms: false,
			errorMessage: '',
			email: '',
			firstname: '',
			lastname: '',
			company_name: '',
			password: '',
			confirmPassword: '',
			work_phone: '',
			mobile_phone: '',
			role: 'sponsor',
			address_city: '',
			address_country: 'USA',
			address_state: '',
			address_street: '',
			address_zip_code: '',
		};
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleModalClose = this.handleModalClose.bind(this);
		this.handleModalAccept = this.handleModalAccept.bind(this);
		this.renderError = this.renderError.bind(this);
	}

	handleClose = () => false;

	handleSubmit = (event) => {
		event.preventDefault();
		event.stopPropagation();
		const form = event.currentTarget;
		if (form.checkValidity() === false) {
			this.setState({ validated: true });
		} else {
			const {
				email,
				firstname,
				lastname,
				company_name,
				password,
				confirmPassword,
				work_phone,
				mobile_phone,
				role,
				address_city,
				address_country,
				address_state,
				address_street,
				address_zip_code,
			} = this.state;

			// eslint-disable-next-line
			const passwordRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
			if (!passwordRegex.test(password)) {
				this.setState({ errorMessage: 'Password must contain at least one lowercase character, one uppercase character, one number and one special character' });
				return false;
			}

			if (password !== confirmPassword) {
				this.setState({ errorMessage: 'Passwords have to be the same' });
				return false;
			}

			const insurance_id = new Date().getTime();
			const user = {
				address: {
					city: address_city,
					country: address_country,
					state: address_state,
					street: address_street,
					zip_code: address_zip_code,
				},
				confirmed: false,
				insurance_id,
				email,
				firstname,
				lastname,
				company_name,
				password,
				work_phone,
				mobile_phone,
				role,
			};
			this.props.signUp(user);
			this.handleModal(
				<SignUpSuccessModal
					email={email}
					handleModalClose={this.handleModalClose}
					handleModalAccept={this.handleModalAccept}
				/>,
			);
		}
		return true;
	}

	handleInputChange(event) {
		const { target } = event;
		const { name } = target;
		const value = target.type === 'checkbox' ? target.checked : target.value;

		this.setState({ [name]: value });
	}

	handleModalClose() {
		this.setState({ modalShow: false });
	}

	handleModalAccept() {
		this.props.history.push('/');
	}

	handleModal(children) {
		this.setState({ modalShow: true, children });
	}

	renderError() {
		if (this.state.errorMessage) {
			return (
				<Col xs={8} md={4}>
					<Alert variant='danger'>
						{this.state.errorMessage}
					</Alert>
				</Col>
			);
		}
		return null;
	}

	render() {
		const {
			modalShow,
			children,
			validated,
			terms,
			email,
			firstname,
			lastname,
			company_name,
			password,
			confirmPassword,
			work_phone,
			mobile_phone,
			role,
			address_city,
			address_country,
			address_state,
			address_street,
			address_zip_code,
		} = this.state;
		return (
			<Container>
				<Row>
					<Col>
						<div className='box'>
							<Row>
								<Col>
									<div className='d-flex justify-content-center'>
										<h1>Sign Up</h1>
									</div>
								</Col>
							</Row>
							<Form
								noValidate
								validated={validated}
								onSubmit={(event) => this.handleSubmit(event)}
							>
								<Row className='none-bottom'>

									<Col xs={12} md={6}>
										<Form.Group controlId='first_name'>
											<Form.Label>First Name</Form.Label>
											<Form.Control
												type='text'
												placeholder='First Name'
												name='firstname'
												value={firstname}
												onChange={this.handleInputChange}
												required
											/>
										</Form.Group>
									</Col>

									<Col xs={12} md={6}>
										<Form.Group controlId='last_name'>
											<Form.Label>Last Name</Form.Label>
											<Form.Control
												type='text'
												placeholder='Last Name'
												name='lastname'
												value={lastname}
												onChange={this.handleInputChange}
												required
											/>
										</Form.Group>
									</Col>

									<Col xs={12} md={6}>
										<Form.Group controlId='company_name'>
											<Form.Label>Company Name</Form.Label>
											<Form.Control
												type='text'
												placeholder='Company Name'
												name='company_name'
												value={company_name}
												onChange={this.handleInputChange}
												required
											/>
										</Form.Group>
									</Col>

									<Col xs={12} md={6}>
										<Form.Group controlId='job_title'>
											<Form.Label>Job Title</Form.Label>
											<Form.Control
												type='text'
												placeholder='Job Title'
												name='role'
												value={role}
												onChange={this.handleInputChange}
												required
											/>
										</Form.Group>
									</Col>

									<Col xs={12} md={6}>
										<Form.Group controlId='country'>
											<Form.Label>Country</Form.Label>
											<Form.Control
												as='select'
												value={address_country}
												disabled
											>
												<option value='USA'>
													United States
												</option>
											</Form.Control>
										</Form.Group>
									</Col>

									<Col xs={12} md={6}>
										<Form.Group controlId='state'>
											<Form.Label>State</Form.Label>
											<Form.Control
												as='select'
												name='address_state'
												value={address_state}
												required
											>
												<option>Choose a state</option>
												{countries[this.state.address_country].states.map((state) => {
													return (
														<option key={state.code} value={state.name}>
															{state.name}
														</option>
													);
												})}
											</Form.Control>
										</Form.Group>
									</Col>

									<Col xs={12} md={8}>
										<Form.Group controlId='city'>
											<Form.Label>City</Form.Label>
											<Form.Control
												type='text'
												placeholder='City'
												name='address_city'
												value={address_city}
												onChange={this.handleInputChange}
												required
											/>
										</Form.Group>
									</Col>

									<Col xs={12} md={4}>
										<Form.Group controlId='zip_code'>
											<Form.Label>Zip Code</Form.Label>
											<Form.Control
												type='text'
												placeholder='Zip Code'
												name='address_zip_code'
												value={address_zip_code}
												onChange={this.handleInputChange}
												required
											/>
										</Form.Group>
									</Col>

									<Col xs={12} md={12}>
										<Form.Group controlId='street'>
											<Form.Label>Company Address</Form.Label>
											<Form.Control
												type='text'
												placeholder='Street'
												name='address_street'
												value={address_street}
												onChange={this.handleInputChange}
												required
											/>
										</Form.Group>
									</Col>

									<Col xs={12} md={6}>
										<Form.Group controlId='work_phone'>
											<Form.Label>Work Phone</Form.Label>
											<Form.Control
												type='text'
												placeholder='(###) ###-####'
												name='work_phone'
												value={work_phone}
												onChange={this.handleInputChange}
												required
											/>
										</Form.Group>
									</Col>

									<Col xs={12} md={6}>
										<Form.Group controlId='mobile_phone'>
											<Form.Label>Mobile Phone</Form.Label>
											<Form.Control
												type='text'
												placeholder='(###) ###-####'
												name='mobile_phone'
												value={mobile_phone}
												onChange={this.handleInputChange}
												required
											/>
										</Form.Group>
									</Col>

									<Col xs={12} md={12}>
										<Form.Group controlId='work_email'>
											<Form.Label>Work Email</Form.Label>
											<Form.Control
												type='email'
												placeholder='Email'
												name='email'
												value={email}
												onChange={this.handleInputChange}
												required
											/>
										</Form.Group>
									</Col>

									<Col xs={12} md={6}>
										<Form.Group controlId='password'>
											<Form.Label>Password</Form.Label>
											<Form.Control
												type='password'
												placeholder='Password'
												name='password'
												value={password}
												onChange={this.handleInputChange}
												required
											/>
										</Form.Group>
									</Col>

									<Col xs={12} md={6}>
										<Form.Group controlId='verify_password'>
											<Form.Label>Verify Password</Form.Label>
											<Form.Control
												type='password'
												placeholder='Verify Password'
												name='confirmPassword'
												value={confirmPassword}
												onChange={this.handleInputChange}
												required
											/>
										</Form.Group>
									</Col>
									{this.renderError()}
									<Col>
										<Form.Group
											controlId='termsAndCondition'
											className='d-flex'
										>
											<Form.Check
												type='checkbox'
												label='Do you accept'
												checked={!!(terms)}
												name='terms'
												value={terms}
												onChange={this.handleInputChange}
												required
											/>
											<div>
												<Link to='/'>
													&nbsp;Terms & Conditions
												</Link>
												<span> and </span>
												<Link
													to='/'
													onClick={this.openPrivacy}
												>
													Privacy Policy
												</Link>
											</div>
										</Form.Group>
									</Col>
								</Row>
								<Row>
									<Col className='d-flex justify-content-end'>
										<Button
											type='submit'
											variant='secondary'
										>
											Save
										</Button>
									</Col>
								</Row>
							</Form>
						</div>
					</Col>
				</Row>

				<Modal
					show={modalShow}
					handleClose={this.handleModalClose}
					handleAccept={this.handleModalAccept}
				>
					{children}
				</Modal>

			</Container>
		);
	}
}

SignUp.propTypes = {
	signUp: PropType.func.isRequired,
	history: PropType.object.isRequired,
};

export default SignUp;
