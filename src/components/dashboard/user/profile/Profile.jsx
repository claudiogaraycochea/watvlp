import React, { Component } from 'react';
import PropType from 'prop-types';
import {
	Row, Col, Button, Form,
} from 'react-bootstrap';

import { Modal } from '../../../ui/Theme';

import FileUploadModal from '../../core/modals/fileUploadModal/FileUploadModalContainer';

import './Profile.css';

function arrayBufferToBase64(buffer) {
	let binary = '';
	const bytes = new Uint8Array(buffer);
	const len = bytes.byteLength;
	for (let i = 0; i < len; i++) {
		binary += String.fromCharCode(bytes[i]);
	}
	return btoa(binary);
}

class Profile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			edit: false,
			modalShow: false,
			children: <div />,
			validated: false,
			firstname: '',
			lastname: '',
			company_name: '',
			role: '',
			address_country: '',
			address_state: '',
			address_city: '',
			address_zip_code: '',
			address_street: '',
			work_phone: '',
			mobile_phone: '',
			email: '',
		};
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleModalClose = this.handleModalClose.bind(this);
		this.handleModalAccept = this.handleModalAccept.bind(this);
	}

	componentWillMount() {
		const headerTitle = 'User Profile';
		this.props.setHeaderTitle(headerTitle);
		const uid = localStorage.getItem('uid');
		this.props.getUser(uid);
	}

	componentDidUpdate(prevProps) {
		if (prevProps.user !== this.props.user) {
			const { user } = this.props;
			this.setUserProfileToState(user);
		}
	}

	onClickEdit() {
		this.setState((prevState) => {
			return { edit: !prevState.edit };
		});
	}

	setUserProfileToState(user) {
		this.setState({
			firstname: user.firstname,
			lastname: user.lastname,
			company_name: user.company_name,
			role: user.role,
			address_country: user.address.country,
			address_state: user.address.state,
			address_city: user.address.city,
			address_zip_code: user.address.zip_code,
			address_street: user.address.street,
			work_phone: user.work_phone,
			mobile_phone: user.mobile_phone,
			email: user.email,
		});
	}

	handleSubmit = (event) => {
		event.preventDefault();
		event.stopPropagation();
		const form = event.currentTarget;
		if (form.checkValidity() === false) {
			this.setState({ validated: true });
		} else {
			const uid = localStorage.getItem('uid');
			const {
				firstname,
				lastname,
				company_name,
				role,
				address_country,
				address_state,
				address_city,
				address_zip_code,
				address_street,
				work_phone,
				mobile_phone,
			} = this.state;

			const user = {
				address: {
					city: address_city,
					country: address_country,
					state: address_state,
					street: address_street,
					zip_code: address_zip_code,
				},
				firstname,
				lastname,
				company_name,
				work_phone,
				mobile_phone,
				role,
			};
			this.props.userUpdate(uid, user);
			this.onClickEdit();
		}
	}

	handleInputChange(event) {
		const { target } = event;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const { name } = target;

		this.setState({ [name]: value });
	}

	handleModalClose() {
		this.setState({ modalShow: false });
	}

	handleModalAccept() {
		this.setState({ modalShow: false });
	}

	handleModal(children) {
		this.setState({ modalShow: true, children });
	}

	showProfile() {
		const user = this.state;
		return (
			<div className='box'>
				<Row>
					<Col>
						<div className='d-flex justify-content-end'>
							<Button
								onClick={() => this.onClickEdit()}
								className='btn-link'
							>
								Edit
							</Button>
						</div>
						<div className='d-flex justify-content-center'>
							{this.renderProfilePicture()}
						</div>
					</Col>
				</Row>
				<Row>
					<Col>
						<div className='d-flex justify-content-center'>
							<h2>
								{`${user.firstname} ${user.lastname}`}
							</h2>
						</div>
						<div className='d-flex justify-content-center'>
							<div className='text-muted'>{user.role}</div>
						</div>
					</Col>
				</Row>
				<Row className='div-line'>
					<Col className='col-4'>
						<div className='text-muted'>Company Name</div>
					</Col>
					<Col className='col-8'>
						{user.company_name}
					</Col>
				</Row>
				<Row className='div-line'>
					<Col className='col-4'>
						<div className='text-muted'>Location</div>
					</Col>
					<Col className='col-8'>
						<div>{user.address_street}</div>
						<div>{`${user.address_city} / ${user.address_zip_code} / ${user.address_state} / ${user.address_country}`}</div>
					</Col>
				</Row>
				<Row className='div-line'>
					<Col className='col-4'>
						<div className='text-muted'>Work Phone</div>
					</Col>
					<Col className='col-8'>
						{user.work_phone}
					</Col>
				</Row>
				<Row className='div-line'>
					<Col className='col-4'>
						<div className='text-muted'>Mobile Phone</div>
					</Col>
					<Col className='col-8'>
						{user.mobile_phone}
					</Col>
				</Row>
				<Row className='div-line'>
					<Col className='col-4'>
						<div className='text-muted'>Email</div>
					</Col>
					<Col className='col-8'>
						{user.email}
					</Col>
				</Row>
			</div>
		);
	}

	renderProfilePicture() {
		if (this.props.profile_picture.fileBinary) {
			const arrayBuffer = this.props.profile_picture.fileBinary.data;
			const base64String = arrayBufferToBase64(arrayBuffer);
			const imageSrc = `data:image/png;base64,${base64String}`;
			return (<img src={imageSrc} alt='user-profile' className='profile_picure' />);
		}
		return <i className='icon-user icon-large' />;
	}

	render() {
		const { user } = this.props;
		const {
			edit,
			modalShow,
			children,
			validated,
			firstname,
			lastname,
			company_name,
			role,
			address_country,
			address_state,
			address_city,
			address_zip_code,
			address_street,
			work_phone,
			mobile_phone,
			email,
		} = this.state;

		if (!user) {
			return (<div>Loading..</div>);
		}

		if (!edit) { return this.showProfile(); }

		return (
			<div>
				<Row>
					<Col>
						<div className='box'>
							<Row>
								<Col>
									<Row>
										<Col>
											<div className='d-flex justify-content-center'>
												{this.renderProfilePicture()}
											</div>
										</Col>
									</Row>
									<Row>
										<Col>
											<div className='d-flex justify-content-center'>
												<Button
													variant='primary'
													onClick={
														() => this.handleModal(
															<FileUploadModal
																endpoint={`/users/${user.uid}/file`}
																type='image'
																handleModalClose={this.handleModalClose}
																handleModalAccept={this.handleModalAccept}
															/>,
														)
													}
												>
													Upload Image
												</Button>
											</div>
										</Col>
									</Row>
								</Col>
							</Row>
							<Form
								noValidate
								validated={validated}
								onSubmit={(event) => this.handleSubmit(event)}
							>
								<Row>
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
											<Form.Control as='select' disabled value={address_country}>
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
												type='text'
												placeholder='State'
												name='address_state'
												value={address_state}
												onChange={this.handleInputChange}
												required
											/>
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
								</Row>
								<Row>
									<Col className='d-flex justify-content-end'>
										<Button onClick={() => this.onClickEdit()} variant='primary'>Close</Button>
										<Button type='submit' variant='secondary'>Save</Button>
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
			</div>
		);
	}
}

Profile.propTypes = {
	getUser: PropType.func.isRequired,
	userUpdate: PropType.func.isRequired,
	setHeaderTitle: PropType.func.isRequired,
	user: PropType.object.isRequired,
	profile_picture: PropType.object.isRequired,
};

Profile.defaultProps = {
	user: {},
};

export default Profile;
