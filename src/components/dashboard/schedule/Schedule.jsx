import React, { Component } from 'react';
import {
	Row, Col, Button, Form,
} from 'react-bootstrap';
import moment from 'moment';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { Table, StatusButtonCircle, Modal } from '../../ui/Theme';

import TaskModal from '../core/task/modal/TaskModal';
import AddContractorModal from '../core/addContractor/modal/AddContractorModalContainer';
import AddBudgetTaskModal from '../core/addBudgetTask/modal/AddBudgetTaskModalContainer';

import * as projectObj from '../../ui/ProjectLibrary';

import EditOverallBudgetModal from './editOverallBugdet/modal/EditOverallBudgetModalContainer';
import AddPhaseModal from './addPhase/modal/AddPhaseModalContainer';
import AddTaskModal from './addTask/modal/AddTaskModalContainer';

class Schedule extends Component {
	constructor(props) {
		super(props);
		this.state = {
			modalShow: false,
			children: <div />,
			project_id: null,
			filter: {
				query: '',
			},
			query: '',
		};
		this.handleModalClose = this.handleModalClose.bind(this);
		this.handleModalAccept = this.handleModalAccept.bind(this);
		this.handleQueryChange = this.handleQueryChange.bind(this);
	}

	componentWillMount() {
		const headerTitle = 'Schedule';
		this.props.setHeaderTitle(headerTitle);
		const { project_id } = this.props.match.params;
		this.props.getProjectBudget(project_id);
		this.setState({ project_id });
	}

	linksContractor = (task, project_id) => {
		const { assignee } = task;
		return (
			<div>
				<div>
					{assignee.map((contractor) => {
						return <div key={contractor.id}>{contractor.fullname}</div>;
					})}
				</div>
				<Button
					className='btn-link'
					onClick={
						() => this.handleModal(
							<AddContractorModal
								task={task}
								project_id={project_id}
								handleModalClose={this.handleModalClose}
								handleModalAccept={this.handleModalAccept}
							/>,
						)
					}
				>
					{'Add Contractors'}
				</Button>
			</div>
		);
	}

	linksParentTask = (parent_tasks) => {
		if (parent_tasks.length > 0) {
			return (
				<Button
					className='btn-link'
					onClick={() => this.handleModal(
						<TaskModal
							handleModalClose={this.handleModalClose}
							handleModalAccept={this.handleModalAccept}
						/>,
					)}
				>
					{'Have Parent Task'}
				</Button>
			);
		}
		return (
			<Button
				className='btn-link'
				onClick={() => this.handleModal(
					<TaskModal
						handleModalClose={this.handleModalClose}
						handleModalAccept={this.handleModalAccept}
					/>,
				)}
			>
				{'None'}
			</Button>
		);
	}

	handleModalClose() {
		this.setState({ modalShow: false });
	}

	handleModalAccept() {
		const uid = localStorage.getItem('uid');
		const { project_id } = this.props.match.params;
		this.props.getUserProjects(uid);
		this.props.getProjectBudget(project_id);
		this.setState({ modalShow: false });
	}

	handleModal(children) {
		this.setState({ modalShow: true, children });
	}

	handleQueryChange(event) {
		const { target } = event;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const { name } = target;
		const filter = {
			query: value,
		};
		this.setState({ [name]: value, filter });
	}

	render() {
		const {
			modalShow,
			children,
			project_id,
			query,
			filter,
		} = this.state;
		const { projectBudget, projects } = this.props;
		if ((!projects.length) && (!projectBudget)) {
			return (<div>Loading...</div>);
		}

		projectObj.init(this.props.projects);
		const project = projectObj.getProject(project_id);
		const phases = (project) ? projectObj.getProjectFilterByPhase(project.phases, filter) : [];
		const budgetTaskArray = (projectBudget) ? projectObj.getBudgetByTask(projectBudget) : [];
		const projectBudgetArray = (projectBudget) ? projectObj.getBudget(projectBudget) : [];

		return (
			<div>
				{(project)
					? (
						<div>
							<Row className='min-bottom'>
								<Col>
									<h2>
										{project.name}
									</h2>
								</Col>
								<Col>
									<div className='d-flex align-items-center'>
										<span className='text-muted space'>Overall Budget</span>
										<span className='space'>{`$${project.excpectedFunding}`}</span>
										<Button
											className='btn-link'
											onClick={() => this.handleModal(
												<EditOverallBudgetModal
													project={project}
													handleModalClose={this.handleModalClose}
													handleModalAccept={this.handleModalAccept}
												/>,
											)}
										>
											{'Edit'}
										</Button>
									</div>
								</Col>
								<Col>
									<div className='d-flex justify-content-end'>
										<Link
											className='space'
											to={`/dashboard/ganttchart/${project.project_id}`}
										>
											<Button variant='secondary'>Gantt Chart</Button>
										</Link>
										<Button
											variant='secondary'
											onClick={() => this.handleModal(
												<AddPhaseModal
													project={project}
													handleModalClose={this.handleModalClose}
													handleModalAccept={this.handleModalAccept}
												/>,
											)}
										>
											{'Add Phase'}
										</Button>
									</div>
								</Col>
							</Row>
							<Row className='min-bottom'>
								<Col>
									<div className='d-flex justify-content-between'>
										<div className='text-muted'>
											{`${project.phases.length} Phases`}
										</div>
										<div className='d-flex justify-content-end align-items-center'>
											<div className='space'>
												<Form.Control
													size='sm'
													className='inp-filter'
													type='text'
													placeholder='Search'
													name='query'
													value={query}
													onChange={this.handleQueryChange}
												/>
											</div>
											<div>
												<span className='icon-filter-link' />
											</div>
										</div>
									</div>
								</Col>
							</Row>
							{phases.map((phase) => (
								<Row key={phase.phase_id}>
									<Col>
										<div className='box'>
											<Row className='min-bottom'>
												<Col>
													<h3>{phase.name}</h3>
												</Col>
												<Col>
													<div className='d-flex justify-content-end'>
														<span className='text-muted space'>Total Budget</span>
														<h3>{`$${phase.planned_cost}`}</h3>
													</div>
												</Col>
											</Row>
											<Row>
												<Col>
													<Table>
														<thead>
															<tr>
																<th>ID</th>
																<th>Task Name</th>
																<th>Contractors</th>
																<th>Start Date</th>
																<th>Previous Task Dependency</th>
																<th>End Date</th>
																<th>Status</th>
																<th>Budget</th>
															</tr>
														</thead>
														<tbody>
															{
																phase.tasks.map((task) => {
																	return (
																		<tr key={task.task_id}>
																			<td>{task.task_id}</td>
																			<td>
																				<Button
																					className='btn-link'
																					onClick={() => this.handleModal(
																						<TaskModal
																							task={task}
																							phase={phase}
																							handleModalClose={this.handleModalClose}
																							handleModalAccept={this.handleModalAccept}
																						/>,
																					)}
																				>
																					{task.name}
																				</Button>
																			</td>
																			<td>
																				{ this.linksContractor(task, phase.project_id) }
																			</td>
																			<td>{moment(task.startDate).format('L')}</td>
																			<td>
																				{
																					(task.parent_tasks)
																						? this.linksParentTask(task.parent_tasks) : null
																				}
																			</td>
																			<td>{moment(task.endDate).format('L')}</td>
																			<td>
																				<StatusButtonCircle status='in-alert' icon='money' />
																				<StatusButtonCircle status='in-alert' icon='calendar' />
																			</td>
																			<td>
																				<div>{`$${projectObj.getTotalBudgetByTask(task.task_id, budgetTaskArray)}`}</div>
																				<Button
																					className='btn-link'
																					onClick={() => this.handleModal(
																						<AddBudgetTaskModal
																							task={task}
																							phase={phase}
																							budgetTaskList={projectObj.getBudgetTaskList(task.task_id, budgetTaskArray)}
																							budgetTaskArray={budgetTaskArray}
																							projectBudgetArray={projectBudgetArray}
																							handleModalClose={this.handleModalClose}
																							handleModalAccept={this.handleModalAccept}
																						/>,
																					)}
																				>
																					{'Edit'}
																				</Button>
																			</td>
																		</tr>
																	);
																})
															}
														</tbody>
													</Table>
												</Col>
											</Row>
											<Row className='none-bottom'>
												<Col>
													<div className='d-flex justify-content-end'>
														<Button
															variant='primary'
															onClick={() => this.handleModal(
																<AddTaskModal
																	phase={phase}
																	handleModalClose={this.handleModalClose}
																	handleModalAccept={this.handleModalAccept}
																/>,
															)}
														>
															{'Add Task'}
														</Button>
													</div>
												</Col>
											</Row>
										</div>
									</Col>
								</Row>
							))}

							<Modal
								show={modalShow}
								handleClose={this.handleModalClose}
								handleAccept={this.handleModalAccept}
							>
								{children}
							</Modal>
						</div>
					) : <div>Loading...</div>}
			</div>
		);
	}
}

Schedule.propTypes = {
	setHeaderTitle: PropTypes.func.isRequired,
	projects: PropTypes.array.isRequired,
	match: PropTypes.object,
	getUserProjects: PropTypes.func.isRequired,
	projectBudget: PropTypes.object,
	getProjectBudget: PropTypes.func.isRequired,
};

Schedule.defaultProps = {
	match: {},
	projectBudget: { items: [] },
};

export default Schedule;
