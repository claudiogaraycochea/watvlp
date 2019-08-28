import React, { Component } from 'react';
import {
	Row, Col, Button,
} from 'react-bootstrap';
import PropTypes from 'prop-types';

import { Table, Modal } from '../../ui/Theme';
import * as projectObj from '../../ui/ProjectLibrary';

import AddItemModal from './addItem/modal/AddItemModalContainer';
import ItemDetailModal from './itemDetail/modal/ItemDetailModalContainer';

class BudgetingTool extends Component {
	constructor(props) {
		super(props);
		this.state = {
			modalShow: false,
			children: <div />,
			project_id: null,
		};
		this.handleModalClose = this.handleModalClose.bind(this);
		this.handleModalAccept = this.handleModalAccept.bind(this);
	}

	componentWillMount() {
		const headerTitle = 'Budgeting Tool';
		this.props.setHeaderTitle(headerTitle);
		const { project_id } = this.props.match.params;
		this.props.getProjectBudget(project_id);
		this.setState({ project_id });
	}

	getTrackList = (tasks) => {
		console.log(tasks);
		if (tasks.length > 0) {
			return (
				<div>
					{tasks.map((task) => {
						return <div key={task.task_id}>{`${task.task_id} (${task.quantity})`}</div>;
					})}
				</div>
			);
		}
		return null;
	}

	handleModalAccept() {
		const { project_id } = this.props.match.params;
		this.props.getProjectBudget(project_id);
		this.setState({ modalShow: false });
	}

	handleModal(children) {
		this.setState({ modalShow: true, children });
	}

	handleModalClose() {
		this.setState({ modalShow: false });
	}

	render() {
		const { modalShow, children, project_id } = this.state;
		const { projectBudget, projects } = this.props;
		if ((!projects.length) && (!projectBudget)) {
			return (<div>Loading...</div>);
		}

		projectObj.init(this.props.projects);
		const project = projectObj.getProject(project_id);
		const budgetArray = (projectBudget) ? projectObj.getBudget(projectBudget) : [];
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
									<div className='d-flex justify-content-end'>
										<Button
											variant='secondary'
											onClick={() => this.handleModal(
												<AddItemModal
													project={project}
													handleModalClose={this.handleModalClose}
													handleModalAccept={this.handleModalAccept}
												/>,
											)}
										>
											{'Add Item'}
										</Button>
									</div>
								</Col>
							</Row>
							<Row className='min-bottom'>
								<Col>
									<div className='d-flex justify-content-between'>
										<div className='text-muted'>
											{(projectBudget) ? `${projectBudget.items.length} Items` : '0 Items' }
										</div>
										<Button className='btn-link'>
											<span className='icon-filter-link space' />
											<span>Filter</span>
										</Button>
									</div>
								</Col>
							</Row>
							<Row>
								<Col>
									<div className='box'>
										<Table>
											<thead>
												<tr>
													<th>Item Name</th>
													<th>Category</th>
													<th>Price per Unit/Hour</th>
													<th>Quantity</th>
													<th>Track</th>
													<th>Total Budget</th>
												</tr>
											</thead>
											<tbody>
												{
													(!budgetArray) ? null : budgetArray.map((item) => {
														return (
															<tr key={item.item_id}>
																<td>
																	<Button
																		className='btn-link'
																		onClick={() => this.handleModal(
																			<ItemDetailModal
																				item={item}
																				project_id={project_id}
																				handleModalClose={this.handleModalClose}
																				handleModalAccept={this.handleModalAccept}
																			/>,
																		)}
																	>
																		{item.name}
																	</Button>
																</td>
																<td>
																	{item.type}
																</td>
																<td>
																	{`$${item.unit_cost}`}
																</td>
																<td>
																	{item.quantity}
																</td>
																<td>
																	{this.getTrackList(item.tasks)}
																</td>
																<td>
																	{`$ ${item.total_budget}`}
																</td>
															</tr>
														);
													})
												}
											</tbody>
										</Table>
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
					) : <div>Loading...</div>}
			</div>
		);
	}
}

BudgetingTool.propTypes = {
	setHeaderTitle: PropTypes.func.isRequired,
	match: PropTypes.object,
	getProjectBudget: PropTypes.func.isRequired,
	projects: PropTypes.array.isRequired,
	projectBudget: PropTypes.object,
};

BudgetingTool.defaultProps = {
	match: {},
	projectBudget: { items: [] },
};

export default BudgetingTool;
