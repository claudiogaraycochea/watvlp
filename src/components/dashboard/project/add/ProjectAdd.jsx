import React from 'react';
import {
	Button, Col, Form, Row, Image,
} from 'react-bootstrap';
import PropTypes from 'prop-types';

import projectImage from '../../../../assets/images/project-image.svg';

import './ProjectAdd.css';

import ProjectCategories from '../../../../mocks/projectCategory.mock.json';

class ProjectAdd extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			validated: false,
			category: '',
			description: '',
			name: '',
			city: '',
			country: 'USA',
			location_state: '',
			street: '',
			addProjectUpdated: false,
			uid: '',
			id: '',
		};
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
	}

	componentWillMount() {
		const headerTitle = 'Add Project';
		this.props.setHeaderTitle(headerTitle);
		this.setState({ uid: localStorage.getItem('uid'), id: localStorage.getItem('id') });
	}

	componentDidUpdate(prevProps) {
		if (prevProps.project !== this.props.project) {
			const { uid } = this.state;
			const { project_id } = this.props.project;
			const workersAdd = { uid };
			this.props.addWorker(project_id, workersAdd);
		}

		if (prevProps.workerAdded !== this.props.workerAdded) {
			const { uid } = this.state;
			this.props.getUserProjects(uid);
		}

		if ((prevProps.projects !== this.props.projects) && (this.state.addProjectUpdated)) {
			const { project_id } = this.props.project;
			this.props.history.push(`/dashboard/project/detail/${project_id}`);
		}
	}

	handleSubmit = (event) => {
		event.preventDefault();
		event.stopPropagation();
		const form = event.currentTarget;
		if (form.checkValidity() === false) {
			this.setState({ validated: true });
		} else {
			const {
				id,
				category,
				description,
				name,
				city,
				zipcode,
				country,
				location_state,
				street,
			} = this.state;
			const project = {
				category,
				description,
				endDate: new Date(),
				location: {
					city,
					zipcode,
					country,
					state: location_state,
					street,
				},
				name,
				startDate: new Date(),
				excpectedFunding: 0,
				initalFunding: 0,
				risk: 0,
				sponsors: [id],
			};
			this.props.addProject(project);
			this.setState({ addProjectUpdated: true });
		}
	}

	isCategoryChecked = (categoryItemName, category) => {
		if (categoryItemName === category) return 'checked';
		return null;
	}

	handleInputChange(event) {
		const { target } = event;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const { name } = target;

		this.setState({ [name]: value });
	}

	render() {
		const {
			validated,
			category,
			description,
			name,
			city,
			zipcode,
			location_state,
			street,
		} = this.state;
		return (
			<Row>
				<Col>
					<div className='box'>
						<Form noValidate validated={validated} onSubmit={(event) => this.handleSubmit(event)}>
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
									<Form.Group controlId='project_name'>
										<Form.Label className='label-text'>Project Name</Form.Label>
										<Form.Control
											type='text'
											placeholder='Project Name'
											name='name'
											value={name}
											onChange={this.handleInputChange}
											required
										/>
									</Form.Group>
									<Form.Group controlId='project_description'>
										<Form.Label className='label-text'>Description</Form.Label>
										<Form.Control
											required
											as='textarea'
											rows='4'
											className='project-description'
											placeholder='Project Description'
											name='description'
											value={description}
											onChange={this.handleInputChange}
										/>
									</Form.Group>
									<Form.Group controlId='category'>
										<Form.Label className='label-text'>Category</Form.Label>
										<Form.Control as='select' name='category' value={category} onChange={this.handleInputChange}>
											<option>Choose Category</option>
											{ProjectCategories.map((categoryItem, index) => (
												<option id={index} key={categoryItem.category_id}>
													{categoryItem.name}
												</option>
											))}
										</Form.Control>
									</Form.Group>
								</Col>
								<Col xs={12} md={6}>
									<Form.Group controlId='street'>
										<Form.Label className='label-text'>Street</Form.Label>
										<Form.Control
											type='text'
											placeholder='Street'
											name='street'
											value={street}
											onChange={this.handleInputChange}
										/>
									</Form.Group>
									<Form.Row>
										<Form.Group as={Col} controlId='city'>
											<Form.Label className='label-text'>City</Form.Label>
											<Form.Control
												type='text'
												placeholder='City'
												name='city'
												value={city}
												onChange={this.handleInputChange}
												required
											/>
										</Form.Group>
										<Form.Group as={Col} controlId='zip'>
											<Form.Label className='label-text'>Zip</Form.Label>
											<Form.Control
												type='text'
												placeholder='Zip'
												name='zipcode'
												value={zipcode}
												onChange={this.handleInputChange}
												required
											/>
										</Form.Group>
									</Form.Row>
									<Form.Group controlId='project_state'>
										<Form.Label className='label-text'>State</Form.Label>
										<Form.Control
											type='text'
											placeholder='State'
											name='location_state'
											value={location_state}
											onChange={this.handleInputChange}
											required
										/>
									</Form.Group>
									<Form.Group controlId='country'>
										<Form.Label className='label-text'>Country</Form.Label>
										<Form.Control
											type='text'
											placeholder='Country'
											name='country'
											disabled
											value='USA'
										/>
									</Form.Group>
								</Col>
							</Row>
							<Row>
								<Col className='d-flex justify-content-end'>
									<Button type='submit' variant='secondary'>Create</Button>
								</Col>
							</Row>
						</Form>
					</div>
				</Col>
			</Row>
		);
	}
}

ProjectAdd.propTypes = {
	setHeaderTitle: PropTypes.func.isRequired,
	addProject: PropTypes.func.isRequired,
	project: PropTypes.object.isRequired,
	getUserProjects: PropTypes.func.isRequired,
	addWorker: PropTypes.func.isRequired,
	workerAdded: PropTypes.object.isRequired,
	projects: PropTypes.object.isRequired,
	history: PropTypes.object.isRequired,
};

ProjectAdd.defaultProps = {
	workerAdded: {},
};

export default ProjectAdd;
