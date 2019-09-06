import React, { Component } from 'react';
import {
	Row, Col, Alert, Button, Form, Image,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import Toggle from 'react-toggle';

import { connect } from 'react-redux';

import {
	ButtonHotAccessIcon, StatusBar, StatusNotification, UserProject, Modal,
} from '../Theme';
import projectImage from '../../../assets/images/project-image.svg';

import { setHeaderTitle } from '../../../store/system/SystemActions';

import ExampleModal from './exampleModal/ExampleModal';

class StyleGuide extends Component {
	constructor(props) {
		super(props);
		this.state = {
			modalShow: false,
			children: <div />,
			btnToggleReady: false,
		};
		this.handleModalClose = this.handleModalClose.bind(this);
		this.handleModalAccept = this.handleModalAccept.bind(this);
		this.handleBtnToggleChange = this.handleBtnToggleChange.bind(this);
	}

	componentWillMount() {
		const headerTitle = 'PB Design';
		this.props.setHeaderTitle(headerTitle);
	}

	handleModal(children) {
		this.setState({ modalShow: true, children });
	}

	handleModalClose() {
		this.setState({ modalShow: false });
	}

	handleModalAccept() {
		this.setState({ modalShow: false });
	}

	handleBtnToggleChange() {
		this.setState((prevState) => {
			return { btnToggleReady: !prevState.btnToggleReady };
		});
	}

	render() {
		const { modalShow, children } = this.state;
		return (
			<div>
				<Row>
					<Col>
						<Toggle
							defaultChecked={this.state.btnToggleReady}
							icons={false}
							onChange={this.handleBtnToggleChange}
						/>
					</Col>
				</Row>
				<Row>
					<Col>
						<Button
							variant='primary'
							onClick={() => this.handleModal(
								<ExampleModal
									handleModalClose={this.handleModalClose}
									handleModalAccept={this.handleModalAccept}
								/>,
							)}
						>
              Modal
						</Button>
					</Col>
				</Row>
				<Row>
					<Col>
						<h3>Layout</h3>
						<div className='box'>
							<Row>
								<Col>1 of 2</Col>
								<Col>2 of 2</Col>
							</Row>
							<Row>
								<Col>1 of 3</Col>
								<Col>2 of 3</Col>
								<Col>3 of 3</Col>
							</Row>
						</div>
					</Col>
				</Row>

				<Row>
					<Col>
						<h3>Position</h3>
						<div className='box'>
							<Row>
								<Col>Left</Col>
							</Row>
							<Row>
								<Col className='d-flex justify-content-center'>Center</Col>
							</Row>
							<Row>
								<Col className='d-flex justify-content-end'>Right</Col>
							</Row>
						</div>
					</Col>
				</Row>

				<Row>
					<Col>
						<h3>Buttons</h3>
						<Button variant='primary'>btn-primary</Button>
						<Button variant='success'>btn-success</Button>
						<Button variant='secondary'>btn-secondary</Button>
						<Button disabled='frue'>btn-disabled</Button>
					</Col>
				</Row>

				<Row>
					<Col>
						<h3>Status Notification</h3>
						<Row>
							<Col>
								<StatusNotification status='not-started' />
							</Col>
							<Col>
								<StatusNotification status='in-progress' />
							</Col>
							<Col>
								<StatusNotification status='delayed' />
							</Col>
							<Col>
								<StatusNotification status='needs-verification' />
							</Col>
							<Col>
								<StatusNotification status='awaiting-permit' />
							</Col>
							<Col>
								<StatusNotification status='awaiting-inspection' />
							</Col>
							<Col>
								<StatusNotification status='complete' />
							</Col>
						</Row>
					</Col>
				</Row>

				<Row>
					<Col>
						<h3>Box</h3>
						<div className='box'>
							<h3>Project title</h3>
							<p>You know if the time of delivery on each Phase is working well.</p>
						</div>
					</Col>
				</Row>

				<Row>
					<Col>
						<h3>Project Components</h3>
						<div className='box'>
							<Row>
								<Col>
									<Row>
										<Col>
											<div className='d-flex justify-content-center'>
												<Image src={projectImage} roundedCircle />
											</div>
										</Col>
									</Row>
									<Row>
										<Col>
											<div className='d-flex justify-content-center'>
												<Button>Upload Image</Button>
											</div>
										</Col>
									</Row>
								</Col>
							</Row>
							<Row className='min-bottom'>
								<Col>
									<h3>Project title</h3>
								</Col>
								<Col className='d-flex justify-content-end'>
									<StatusNotification status='in-progress' />
								</Col>
							</Row>
							<Row>
								<Col>
									<StatusBar percentage='50' />
								</Col>
							</Row>
							<Row>
								<Col>
									<div className='box'>
										<Row className='none-bottom'>
											<Col>
												<div className='btn-hot-access'>
													<div className='number'>3</div>
													<div>Messages</div>
												</div>
											</Col>
											<Col>
												<div className='btn-hot-access'>
													<div className='number'>5</div>
													<div>My Tasks</div>
												</div>
											</Col>
											<Col>
												<div className='btn-hot-access'>
													<div className='number'>+</div>
													<div>More</div>
												</div>
											</Col>
										</Row>
									</div>
								</Col>
							</Row>
							<Row className='fix-space'>
								<Col xs={6} md={3}>
									<ButtonHotAccessIcon icon='icon-schedule-out'>
										Schedule
									</ButtonHotAccessIcon>
								</Col>
								<Col xs={6} md={3}>
									<ButtonHotAccessIcon icon='icon-gantt-chart-out'>
										Gantt Chart
									</ButtonHotAccessIcon>
								</Col>
								<Col xs={6} md={3}>
									<ButtonHotAccessIcon icon='icon-budget-out'>
										Budget
									</ButtonHotAccessIcon>
								</Col>
								<Col xs={6} md={3}>
									<ButtonHotAccessIcon icon='icon-analytics-out'>
										Analytics
									</ButtonHotAccessIcon>
								</Col>
								<Col xs={6} md={3}>
									<ButtonHotAccessIcon icon='icon-messages-out'>
										Messages
									</ButtonHotAccessIcon>
								</Col>
								<Col xs={6} md={3}>
									<ButtonHotAccessIcon icon='icon-contractor-out'>
										Contractor
									</ButtonHotAccessIcon>
								</Col>
							</Row>
						</div>
					</Col>
				</Row>

				<h3>User Project</h3>
				<Row>
					<Col>
						<div className='box'>
							<UserProject
								image=''
								fullname='Claudio Garaycochea'
								subtitle='Contractor'
							/>
						</div>
					</Col>
				</Row>

				<Row>
					<Col>
						<h3>Notifications</h3>
						<div className='box'>
							<Row>
								<Col>
									<Alert variant='primary'>
                    This is a primary alert with
										<Alert.Link href='#'>an example link</Alert.Link>
                    Give it a click if you like.
									</Alert>
									<Alert variant='success'>
                    This is a success alert with
										<Alert.Link href='#'>an example link</Alert.Link>
                    Give it a click if you like.
									</Alert>
									<Alert variant='danger'>
                    This is a danger alert with
										<Alert.Link href='#'>an example link</Alert.Link>
                    Give it a click if you like.
									</Alert>
									<Alert variant='warning'>
                    This is a warning alert with
										<Alert.Link href='#'>an example link</Alert.Link>
                    Give it a click if you like.
									</Alert>
								</Col>
							</Row>
						</div>
					</Col>
				</Row>

				<Row>
					<Col>
						<h3>Form</h3>
						<div className='box'>
							<Row className='row none-bottom'>
								<Col>
									<h3>Title</h3>
								</Col>
							</Row>
							<Row className='div-line'>
								<Col>
									<div className='label-text'>Full Name</div>
								</Col>
								<Col className='col-8'>First Name</Col>
							</Row>
							<Row className='div-line'>
								<Col>
									<div className='label-text'>Full Name</div>
								</Col>
								<Col className='col-8'>First Name</Col>
							</Row>
						</div>
					</Col>
				</Row>

				<Row>
					<Col>
						<h3>Form</h3>
						<div className='box'>
							<Row>
								<Col>
									<Row>
										<Col>
											<div className='d-flex justify-content-center'>
												<Image src={projectImage} roundedCircle />
											</div>
										</Col>
									</Row>
									<Row>
										<Col>
											<div className='d-flex justify-content-center'>
												<Button>Upload Image</Button>
											</div>
										</Col>
									</Row>
								</Col>
							</Row>
							<Row>
								<Col xs={12} md={6}>
									<Form.Group controlId='exampleForm.ControlInput1'>
										<Form.Label>First Name</Form.Label>
										<Form.Control type='email' placeholder='name@example.com' />
									</Form.Group>
									<Form.Group controlId='exampleForm.ControlInput1'>
										<Form.Label>Last Name</Form.Label>
										<Form.Control type='email' placeholder='name@example.com' />
									</Form.Group>
									<Form.Group controlId='exampleForm.ControlInput1'>
										<Form.Label>Profile</Form.Label>
										<Form.Control as='select'>
											<option>Choose Profile</option>
											<option>...</option>
										</Form.Control>
									</Form.Group>
								</Col>
								<Col xs={12} md={6}>
									<Form.Group controlId='exampleForm.ControlInput1'>
										<Form.Label>Email address</Form.Label>
										<Form.Control type='email' placeholder='name@example.com' />
									</Form.Group>
									<Form.Group controlId='exampleForm.ControlInput1'>
										<Form.Label>City</Form.Label>
										<Form.Control type='email' placeholder='name@example.com' />
									</Form.Group>
									<Form.Row>
										<Form.Group as={Col} controlId='formGridCity'>
											<Form.Label>City</Form.Label>
											<Form.Control />
										</Form.Group>
										<Form.Group as={Col} controlId='formGridZip'>
											<Form.Label>Zip</Form.Label>
											<Form.Control />
										</Form.Group>
									</Form.Row>
								</Col>
							</Row>
							<Row>
								<Col className='d-flex justify-content-end'>
									<Button variant='secondary'>Create</Button>
								</Col>
							</Row>
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

StyleGuide.propTypes = {
	setHeaderTitle: PropTypes.func.isRequired,
};

/* Only for purporses example */
const mapStateToProps = (state) => {
	return {};
};

const mapDispatchToProps = (dispatch) => {
	return {
		setHeaderTitle: (headerTitle) => {
			dispatch(setHeaderTitle(headerTitle));
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(StyleGuide);
