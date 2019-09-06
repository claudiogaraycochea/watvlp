import React, { Component } from 'react';
import {
	Row, Col, Form, Button,
} from 'react-bootstrap';
import PropTypes from 'prop-types';

import './AddBudgetTaskModal.css';

class AddBudgetTaskModal extends Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			query: '',
			selectedBudgetItem: [],
			resultQuery: [],
			item_input: [],
		};
		this.handleInputQueryChange = this.handleInputQueryChange.bind(this);
		this.handleInputQuantityChange = this.handleInputQuantityChange.bind(this);
	}

	componentWillMount() {
		const { budgetTaskList } = this.props;
		this.setState({ selectedBudgetItem: budgetTaskList });
	}

	getBudgetItem = (budgetItem) => {
		return (
			<Row className='min-bottom budget-task-item' key={budgetItem.item_id}>
				<Col className='col-8'>
					{budgetItem.name}
				</Col>
				<Col className='col-2'>
					{`$${budgetItem.unit_cost}`}
				</Col>
				<Col className='col-2'>
					<Button
						className='btn-link'
						onClick={
							() => this.handleAddToSelectedBudgetItem(budgetItem)
						}
					>
						<i className='icon-add-sec' />
					</Button>
				</Col>
			</Row>
		);
	};

	getSelected() {
		const { selectedBudgetItem, item_input } = this.state;
		const selectedString = selectedBudgetItem.map((item) => {
			return (
				<div key={item.item_id} className='budget-task-item'>
					<Row className='min-bottom'>
						<Col className='col-4'>{item.name}</Col>
						<Col className='col-2'>
							{item.quantity}
						</Col>
						<Col className='col-2'>
							<Form.Group>
								<Form.Control
									type='number'
									placeholder='0'
									name={item.item_id}
									value={item_input[item.item_id]}
									onChange={this.handleInputQuantityChange}
								/>
							</Form.Group>
						</Col>
						<Col className='col-2'>{`$${item.total_budget}`}</Col>
						<Col className='col-2'>
							<Button
								className='btn-link'
								onClick={
									() => this.handleRemoveToSelectedBudgetItem(item)
								}
							>
								<i className='icon-remove-sec' />
							</Button>
						</Col>
					</Row>
				</div>
			);
		});
		return selectedString;
	}

	setValueOnbudgetTaskArray = (item_id, newQuantity) => {
		const { budgetTaskArray, task } = this.props;
		const objIndex = budgetTaskArray.findIndex(((obj) => {
			return ((obj.task_id === task.task_id) && (obj.item_id === item_id));
		}));
		budgetTaskArray[objIndex].quantity = newQuantity;
		budgetTaskArray[objIndex].total_budget = (budgetTaskArray[objIndex].unit_cost * newQuantity);
		this.updateBudget(item_id);
	}

	updateBudget(item_id) {
		const { budgetTaskArray, task } = this.props;
		const budgetTasksItem_id = budgetTaskArray.filter(((item) => {
			return (item.item_id === item_id);
		}));

		const newTasksList = [];
		for (let i = 0; i < budgetTasksItem_id.length; i++) {
			const newTask = {
				task_id: budgetTasksItem_id[i].task_id,
				quantity: budgetTasksItem_id[i].quantity,
			};
			newTasksList.push(newTask);
		}

		const itemData = {
			tasks: newTasksList,
		};
		const { project_id } = task;
		this.props.updateBudgetItem(project_id, item_id, itemData);
	}

	handleInputQuantityChange(event) {
		const { target } = event;
		const { value } = target;
		const item_id = target.name;
		const newQuantity = value;
		this.setValueOnbudgetTaskArray(item_id, newQuantity);
		this.setState({ [`${item_id}`]: value });
	}

	handleInputQueryChange(event) {
		const query = event.target.value.toLowerCase();
		const { projectBudgetArray } = this.props;
		const resultQuery = projectBudgetArray.filter((item) => (
			item.name.toLowerCase().indexOf(query) !== -1));
		this.setState({
			query,
			resultQuery,
		});
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

	handleRemoveToSelectedBudgetItem(item) {
		const { task, budgetTaskArray } = this.props;
		const { selectedBudgetItem } = this.state;
		const existSelectedBudgetItem = (selectedBudgetItem.find((budgetItem) => {
			return budgetItem.item_id === item.item_id;
		}));

		if (existSelectedBudgetItem) {
			const newBudget = [];

			const newBudgetTaskArray = Object.keys(budgetTaskArray).reduce((object, key) => {
				if (budgetTaskArray[key].item_id !== item.item_id) {
					newBudget.push(budgetTaskArray[key]);
				}
				return newBudget;
			}, {});

			const budgetTasksItem_id = newBudgetTaskArray.filter(((budgetItem) => {
				return (budgetItem.item_id === item.item_id);
			}));

			const newTasksList = [];
			for (let i = 0; i < budgetTasksItem_id.length; i++) {
				const newTask = {
					task_id: budgetTasksItem_id[i].task_id,
					quantity: budgetTasksItem_id[i].quantity,
				};
				newTasksList.push(newTask);
			}

			const itemData = {
				tasks: newTasksList,
			};
			const { project_id } = task;
			this.props.updateBudgetItem(project_id, item.item_id, itemData);

			const newSelected = [];

			const newSelectedBudgetItem = Object.keys(selectedBudgetItem).reduce((object, key) => {
				if (selectedBudgetItem[key].item_id !== item.item_id) {
					newSelected.push(selectedBudgetItem[key]);
				}
				return newSelected;
			}, {});

			this.setState({
				selectedBudgetItem: newSelectedBudgetItem,
			});
		}
	}

	render() {
		const { handleModalClose } = this.props;
		const { query, resultQuery } = this.state;
		return (
			<div>
				<div className='modal-header'>
					{'Edit Budget'}
				</div>
				<div className='modal-container'>
					<Form.Group>
						<Form.Control
							type='text'
							placeholder='Search Item'
							name='query'
							value={query}
							onChange={this.handleInputQueryChange}
						/>
					</Form.Group>
					<Row>
						<Col>
							<div className='budget-item-list'>
								{resultQuery.map((budgetItem) => this.getBudgetItem(budgetItem))}
							</div>
						</Col>
					</Row>
					<Row className='div-line'>
						<Col>
							<div className='text-muted'>Selected</div>
							<div className='budget-task-selected-wrapper'>
								{this.getSelected()}
							</div>
						</Col>
					</Row>
				</div>
				<div className='modal-bottom'>
					<Button variant='primary' onClick={handleModalClose}>Cancel</Button>
					<Button variant='secondary' onClick={() => this.props.handleModalAccept()}>Accept</Button>
				</div>
			</div>
		);
	}
}

AddBudgetTaskModal.propTypes = {
	handleModalAccept: PropTypes.func.isRequired,
	handleModalClose: PropTypes.func.isRequired,
	task: PropTypes.object.isRequired,
	budgetTaskList: PropTypes.any.isRequired,
	projectBudgetArray: PropTypes.array.isRequired,
	budgetTaskArray: PropTypes.array.isRequired,
	updateBudgetItem: PropTypes.func.isRequired,
};

export default AddBudgetTaskModal;
