import React from 'react';
import {
	Button, Col, Form, Row, Image,
} from 'react-bootstrap';
import PropTypes from 'prop-types';

import projectImage from '../../../../assets/images/project-image.svg';
import ProjectCategories from '../../../../mocks/projectCategory.mock.json';
import { Modal } from '../../../ui/Theme';
import FileUploadModal from '../../core/modals/fileUploadModal/FileUploadModalContainer';
import * as projectObj from '../../../ui/ProjectLibrary';

class ProjectEdit extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			modalShow: false,
			children: <div />,
			updated: false,
			validated: false,
			category: '',
			description: '',
			name: '',
			city: '',
			country: 'USA',
			location_state: '',
			street: '',
			zipcode: '',
		};
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleModalClose = this.handleModalClose.bind(this);
		this.handleModalAccept = this.handleModalAccept.bind(this);
	}

	componentWillMount() {
		const headerTitle = 'Edit Project';
		this.props.setHeaderTitle(headerTitle);
	}

	componentDidUpdate(prevProps) {
		if ((prevProps.updateProjectStatus !== this.props.updateProjectStatus)
			&& (this.state.updated)) {
			const { project_id } = this.state;
			this.props.history.push(`/dashboard/project/detail/${project_id}`);
		}

		if (prevProps.projects !== this.props.projects) {
			const { projects } = this.props;
			const { project_id } = this.props.match.params;
			projectObj.init(projects);
			const project = projectObj.getProject(project_id);
			console.log('PROJECTEDIT: project: ', project);
			this.setProjectState(project);
		}
	}

	setProjectState(project) {
		this.setState({
			project_id: project.project_id,
			category: project.category,
			description: project.description,
			name: project.name,
			city: project.location.city,
			country: project.location.country,
			street: project.location.street,
			location_state: project.location.state,
			zipcode: project.location.zipcode,
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
				project_id,
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
				updates: {
					category,
					description,
					location: {
						city,
						zipcode,
						country,
						state: location_state,
						street,
					},
					name,
				},
				updatedBy: uid,
			};
			this.props.updateProject(project_id, project);
			this.setState({ updated: true });
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

	handleModalClose() {
		this.setState({ modalShow: false });
	}

	handleModalAccept() {
		this.setState({ modalShow: false });
	}

	handleModal(children) {
		this.setState({ modalShow: true, children });
	}

	render() {
		const {
			project_id,
			modalShow,
			children,
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
			<div>
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
													<Button
														variant='primary'
														onClick={
															() => this.handleModal(
																<FileUploadModal
																	endpoint={`/projects/${project_id}/file/upload`}
																	type='image'
																	project_id={project_id}
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
													value={zipcode || ''}
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

ProjectEdit.propTypes = {
	setHeaderTitle: PropTypes.func.isRequired,
	updateProject: PropTypes.func.isRequired,
	projects: PropTypes.array.isRequired,
	match: PropTypes.object,
	updateProjectStatus: PropTypes.any.isRequired,
	history: PropTypes.object.isRequired,
};

ProjectEdit.defaultProps = {
	match: {},
	projects: {},
};

export default ProjectEdit;
