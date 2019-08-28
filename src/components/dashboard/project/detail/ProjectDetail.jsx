/* Detail */
import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import {
	StatusBar, StatusNotification, ButtonHotAccessIcon, UserProject, Modal,
} from '../../../ui/Theme';
import Task from '../../core/task/Task';
import * as projectObj from '../../../ui/ProjectLibrary';
import UserProfileModal from '../../core/userProfile/modal/UserProfileModalContainer';

import './ProjectDetail.css';

class ProjectDetail extends Component {
	constructor(props) {
		super(props);
		this.state = {
			modalShow: false,
			children: <div />,
		};
		this.handleModalClose = this.handleModalClose.bind(this);
		this.handleModalAccept = this.handleModalAccept.bind(this);
	}

	contractorList = (assignee) => {
		if (!assignee.length) return null;
		const contractors = assignee.map((contractor) => {
			return (
				<Row className='div-line' key={contractor.id}>
					<Col>
						<UserProject
							image=''
							fullname={contractor.fullname}
							subtitle={contractor.role}
							menuAction={() => this.handleModal(
								<UserProfileModal
									contractor={contractor}
									handleModalClose={this.handleModalClose}
									handleModalAccept={this.handleModalAccept}
								/>,
							)}
						/>
					</Col>
				</Row>
			);
		});
		return contractors;
	}

	handleModalClose() {
		this.setState({ modalShow: false });
	}

	handleModalAccept() {
		this.setState({ modalShow: false });
		this.props.getProjectInfo(this.props.match.params.project_id);
	}

	handleModal(children) {
		this.setState({ modalShow: true, children });
	}

	render() {
		const { modalShow, children } = this.state;
		const { project_id } = this.props.match.params;
		const { projects } = this.props;
		if (!projects.length) {
			return (<div>Loading...</div>);
		}

		projectObj.init(this.props.projects);
		const project = projectObj.getProject(project_id);
		this.props.setHeaderTitle(project.name);

		const taskArray = projectObj.getTaskList(project);
		const tasks = (project) ? projectObj.sortTasks(taskArray) : [];
		const taskPercentage = projectObj.getPercentageByProject(taskArray);
		const taskStatus = projectObj.getStatus(projectObj.getStatusByPercentage(taskPercentage));
		return (
			<div>
				<Row>
					<Col xs={12} lg={8}>
						<Row>
							<Col>
								{(project)
									? (
										<div className='box' key={project.project_id}>
											<Row>
												<Col>
													<div className='d-flex justify-content-end'>
														<Link to={`/dashboard/project/edit/${project_id}`}>Edit</Link>
													</div>
												</Col>
											</Row>
											<Row>
												<Col>
													<div className='d-flex justify-content-center'>
														<div className='project-image' />
													</div>
												</Col>
											</Row>
											<Row className='min-bottom'>
												<Col>
													<h3>Status</h3>
												</Col>
												<Col className='d-flex justify-content-end'>
													<StatusNotification status={taskStatus.class} />
												</Col>
											</Row>
											<Row>
												<Col>
													<StatusBar percentage={taskPercentage} />
												</Col>
											</Row>
											<Row>
												<Col>
													<p className='text-muted'>Description</p>
													<div className='project-description-wrapper'>
														{project.description}
													</div>
												</Col>
											</Row>
											<Row className='div-line'>
												<Col>
													<div className='d-flex justify-content-between pt-3'>
														<div>
															<p className='text-muted'>Location</p>
															{ project.location ? (
																<div>
																	<p className='mb-0'>
																		{project.location.street}
																	</p>
																	<p>
																		{' '}
																		{project.location.city}
																		{' '}
																		{project.location.zip}
																		{', '}
																		{project.location.state}
																		{', '}
																		{project.location.country}
																	</p>
																</div>
															) : 'None'}
														</div>
													</div>
												</Col>
											</Row>
											<Row className='div-line'>
												<Col>
													<div className='d-flex justify-content-between pt-3'>
														<p className='text-muted'>Contractors</p>
													</div>
													<div>
														{this.contractorList(project.sponsors)}
													</div>
												</Col>
											</Row>
											<Row className='div-line'>
												<Col xs={6} md={4}>
													<Link to={`/dashboard/schedule/${project_id}`}>
														<ButtonHotAccessIcon icon='icon-schedule-out'>Schedule</ButtonHotAccessIcon>
													</Link>
												</Col>
												<Col xs={6} md={4}>
													<Link to={`/dashboard/ganttchart/${project_id}`}>
														<ButtonHotAccessIcon icon='icon-gantt-chart-out'>Gantt Chart</ButtonHotAccessIcon>
													</Link>
												</Col>
												<Col xs={6} md={4}>
													<Link to={`/dashboard/budget/${project_id}`}>
														<ButtonHotAccessIcon icon='icon-budget-out'>Budget</ButtonHotAccessIcon>
													</Link>
												</Col>
											</Row>
										</div>
									) : null}
							</Col>
						</Row>
					</Col>
					<Col xs={12} lg={4}>
						<Row>
							<Col>
								<div className='d-flex justify-content-between py-2'>
									<h3>My Tasks</h3>
								</div>
								{(tasks) ? tasks.map((task) => (
									<Task task={task} key={task.task_id} />
								)) : null }
							</Col>
						</Row>
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

ProjectDetail.propTypes = {
	setHeaderTitle: PropTypes.func.isRequired,
	match: PropTypes.object,
	projects: PropTypes.array.isRequired,
	getProjectInfo: PropTypes.func.isRequired,
};

ProjectDetail.defaultProps = {
	match: {},
};

export default ProjectDetail;
