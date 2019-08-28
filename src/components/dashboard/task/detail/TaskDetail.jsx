import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
	Col, Row, Button,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import moment from 'moment';

import {
	StatusBar, StatusNotification, UserProject, Modal,
} from '../../../ui/Theme';

import EditTaskModal from '../edit/modal/EditTaskModalContainer';
import AddContractorModal from '../../core/addContractor/modal/AddContractorModalContainer';
import UserProfileModal from '../../core/userProfile/modal/UserProfileModalContainer';
import ChangeStatusModal from '../../core/changeStatus/modal/ChangeStatusModalContainer';

import Task from '../../core/task/Task';
import * as projectObj from '../../../ui/ProjectLibrary';

class TaskDetail extends Component {
	constructor(props) {
		super(props);
		this.state = {
			modalShow: false,
			children: <div />,
		};
		this.handleModalClose = this.handleModalClose.bind(this);
		this.handleModalAccept = this.handleModalAccept.bind(this);
	}

	componentWillMount() {
		const headerTitle = 'TASK';
		this.props.setHeaderTitle(headerTitle);
		const { project_id } = this.props.match.params;
		this.props.getProjectBudget(project_id);
	}

	contractorList = (assignee) => {
		if (!assignee.length) return null;
		const contractors = assignee.map((contractor) => {
			return (
				<Row key={contractor.id}>
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

	taskStatus = (status) => {
		if (status > -1) {
			const statusData = projectObj.getStatus(status);
			return (<StatusNotification status={statusData.class} />);
		}
		return null;
	}

	handleModalClose() {
		this.setState({ modalShow: false });
	}

	handleModalAccept() {
		const uid = localStorage.getItem('uid');
		this.props.getUserProjects(uid);
		this.setState({ modalShow: false });
	}

	handleModal(children) {
		this.setState({ modalShow: true, children });
	}

	handleAddToSelectedBudgetItem(item) {
		const { task, budgetTaskArray } = this.props;
		const { selectedBudgetItem } = this.state;
		const existSelectedBudgetItem = !!(selectedBudgetItem.find((budgetItem) => {
			return budgetItem.item_id === item.item_id;
		}));

		const initialQuantity = 1;

		if (!existSelectedBudgetItem) {
			const newBudgetItem = {
				item_id: item.item_id,
				name: item.name,
				quantity: initialQuantity,
				task_id: task.task_id,
				tasks: [{ task_id: task.task_id, quantity: initialQuantity }],
				total_budget: (item.unit_cost * initialQuantity),
				type: item.type,
				unit_cost: item.unit_cost,
			};

			selectedBudgetItem.push(newBudgetItem);
			budgetTaskArray.push(newBudgetItem);
			this.setState({
				selectedBudgetItem,
			});
		}
	}

	render() {
		const { modalShow, children } = this.state;
		const { projectBudget, projects } = this.props;
		const { project_id, task_id } = this.props.match.params;

		if ((!projects.length) && (!projectBudget)) {
			return (<div>Loading...</div>);
		}

		projectObj.init(projects);
		const project = projectObj.getProject(project_id);
		const taskArray = projectObj.getTaskList(project);
		const task = taskArray.find((taskItem) => taskItem.task_id === task_id);
		const tasks = (project) ? projectObj.sortTasks(taskArray) : [];
		const taskPercentage = (task) ? projectObj.getPercentageByTask(task.status) : 0;
		const budgetTaskArray = (projectBudget) ? projectObj.getBudgetByTask(projectBudget) : [];
		const budgetTaskList = (task) ? projectObj.getBudgetTaskList(task.task_id, budgetTaskArray) : [];

		return (
			<div>
				<Row>
					<Col xs={12} lg={8}>
						{(task)
							? (
								<div className='box margin-bottom' key={task.task_id}>
									<Row className='min-bottom'>
										<Col className='d-flex justify-content-between'>
											<div>
												<h3>{task.name}</h3>
												<Link
													to={`/dashboard/project/detail/${task.project_id}`}
												>
													{task.project_name}
												</Link>
												{' / '}
												<Link
													to={`/dashboard/schedule/${task.project_id}`}
												>
													{task.phase_name}
												</Link>
											</div>
											<div className='d-flex justify-content-end'>
												<div className='space'>
													<div className='text-muted'>
														Created
													</div>
													<div className='text-muted'>
														{moment(task.createdAt).format('L')}
													</div>
												</div>
												<div>
													<Button
														className='btn-link'
														onClick={
															() => this.handleModal(
																<EditTaskModal
																	task={task}
																	handleModalClose={this.handleModalClose}
																	handleModalAccept={this.handleModalAccept}
																/>,
															)
														}
													>
														{'Edit'}
													</Button>
												</div>
											</div>
										</Col>
									</Row>
									<Row className='div-line'>
										<Col>
											<UserProject
												image=''
												fullname={task.author.fullname}
												subtitle={task.author.role}
												menuAction={() => this.handleModal(
													<UserProfileModal
														contractor={task.author}
														handleModalClose={this.handleModalClose}
														handleModalAccept={this.handleModalAccept}
													/>,
												)}
											/>
										</Col>
									</Row>
									<Row className='div-line'>
										<Col>
											<div className='text-muted'>Description</div>
											<div>{task.description}</div>
										</Col>
									</Row>
									<Row className='div-line'>
										<Col>
											<Row className='min-bottom'>
												<Col>
													<div className='d-flex justify-content-between'>
														<div>
															{this.taskStatus(task.status)}
														</div>
														<div>
															<Button
																className='btn-link'
																onClick={
																	() => this.handleModal(
																		<ChangeStatusModal
																			task={task}
																			project_id={task.project_id}
																			handleModalClose={this.handleModalClose}
																			handleModalAccept={this.handleModalAccept}
																		/>,
																	)
																}
															>
																{'Change Status'}
															</Button>
														</div>
													</div>
												</Col>
											</Row>
											<Row className='min-bottom'>
												<Col>
													<StatusBar percentage={taskPercentage} />
												</Col>
											</Row>
											<Row className='none-bottom'>
												<Col className='d-flex justify-content-between'>
													<div className='text-small'>
														<span className='text-muted space'>Start Date</span>
														{moment(task.startDate).format('L')}
													</div>
													<div className='text-small'>
														<span className='text-muted space'>End Date</span>
														{moment(task.endDate).format('L')}
													</div>
												</Col>
											</Row>
										</Col>
									</Row>
									<Row className='div-line'>
										<Col>
											<Row className='min-bottom'>
												<Col>
													<div className='d-flex justify-content-between'>
														<div className='text-muted'>Assignee</div>
														<div>
															<Button
																className='btn-link'
																onClick={
																	() => this.handleModal(
																		<AddContractorModal
																			task={task}
																			project_id={task.project_id}
																			handleModalClose={this.handleModalClose}
																			handleModalAccept={this.handleModalAccept}
																		/>,
																	)
																}
															>
																{'Add Contractors'}
															</Button>
														</div>
													</div>
												</Col>
											</Row>
											{this.contractorList(task.assignee)}
										</Col>
									</Row>
									<Row className='div-line'>
										<Col>
											<Row className='min-bottom'>
												<Col>
													<div className='text-muted'>Budget</div>
												</Col>
											</Row>
											{(budgetTaskList.length > 0)
												? budgetTaskList.map((item) => (
													<div key={item.item_id} className='budget-task-item'>
														<Row>
															<Col className='col-6'>
																{item.name}
															</Col>
															<Col className='col-2'>
																{item.unit_cost}
															</Col>
															<Col className='col-2'>
																{item.quantity}
															</Col>
															<Col className='col-2'>
																{`$${item.unit_cost * item.quantity}`}
															</Col>
														</Row>
													</div>
												)) : null}
										</Col>
									</Row>
								</div>
							) : null}
					</Col>
					<Col xs={12} lg={4}>
						<Row className='min-bottom'>
							<Col>
								<h2>My Tasks</h2>
							</Col>
						</Row>
						<Row>
							<Col>
								{tasks.map((taskItem) => (
									<Task task={taskItem} key={taskItem.task_id} />
								))}
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

TaskDetail.propTypes = {
	setHeaderTitle: PropTypes.func.isRequired,
	match: PropTypes.object,
	getProjectBudget: PropTypes.func.isRequired,
	task: PropTypes.object.isRequired,
	projectBudget: PropTypes.array,
	getUserProjects: PropTypes.func.isRequired,
	budgetTaskArray: PropTypes.array,
	projects: PropTypes.array,
};

TaskDetail.defaultProps = {
	match: {},
	projectBudget: [],
	budgetTaskArray: [],
	projects: [],
};

export default TaskDetail;
