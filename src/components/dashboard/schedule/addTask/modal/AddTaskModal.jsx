import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
	Row, Col, Form, Button,
} from 'react-bootstrap';

class AddTaskModal extends Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			uid: '',
			project_id: '',
			phase_id: '',
			phase_name: '',
			task_name: '',
			task_description: '',
			task_startDate: '',
			task_endDate: '',
		};
		this.handleInputChange = this.handleInputChange.bind(this);
	}

	componentWillMount() {
		const uid = localStorage.getItem('id');
		const { project_id, phase_id } = this.props.phase;
		const phase_name = this.props.phase.name;

		this.setState({
			uid,
			project_id,
			phase_id,
			phase_name,
		});
	}

	componentDidUpdate(prevProps) {
		if (prevProps.task !== this.props.task) {
			this.props.handleModalAccept();
		}
	}

	handleInputChange(event) {
		const { target } = event;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const { name } = target;

		this.setState({ [name]: value });
	}

	addTask() {
		const {
			uid,
			project_id,
			phase_id,
			task_name,
			task_description,
			task_startDate,
			task_endDate,
		} = this.state;
		const taskItem = {
			phase_id,
			tasks: [
				{
					assignee: [],
					author: uid,
					children_tasks: [],
					completed: false,
					cost: 0,
					description: task_description,
					endDate: task_endDate,
					name: task_name,
					parent_tasks: [],
					phase_id,
					planned_cost: 0,
					planned_endDate: task_endDate,
					planned_startDate: task_startDate,
					priority: 0,
					progress: 0,
					project_id,
					status: 0,
					startDate: task_startDate,
					verified: false,
				},
			],
		};

		this.props.addTask(project_id, taskItem);
	}

	render() {
		const { handleModalClose } = this.props;
		const {
			phase_name,
			task_name,
			task_description,
			task_startDate,
			task_endDate,
		} = this.state;
		return (
			<div>
				<div className='modal-header'>
					{'Add Task'}
				</div>
				<div className='modal-container'>
					<Row className='min-bottom'>
						<Col>
							<div>Add Task to</div>
							<h3>{phase_name}</h3>
						</Col>
					</Row>
					<Row className='div-line'>
						<Col>
							<Form.Group>
								<Form.Label>Task Name</Form.Label>
								<Form.Control
									type='text'
									placeholder='Task Name'
									name='task_name'
									value={task_name}
									onChange={this.handleInputChange}
								/>
							</Form.Group>
						</Col>
					</Row>
					<Row className='div-line'>
						<Col>
							<Form.Group>
								<Form.Label>Description</Form.Label>
								<Form.Control
									as='textarea'
									rows='3'
									placeholder='Description'
									name='task_description'
									value={task_description}
									onChange={this.handleInputChange}
								/>
							</Form.Group>
						</Col>
					</Row>
					<Row className='div-line'>
						<Col>
							<Form.Row>
								<Form.Group as={Col}>
									<Form.Label>Start Date</Form.Label>
									<Form.Control
										type='date'
										name='task_startDate'
										value={task_startDate}
										onChange={this.handleInputChange}
									/>
								</Form.Group>
								<Form.Group as={Col}>
									<Form.Label>End Date</Form.Label>
									<Form.Control
										type='date'
										name='task_endDate'
										value={task_endDate}
										onChange={this.handleInputChange}
									/>
								</Form.Group>
							</Form.Row>
						</Col>
					</Row>
				</div>
				<div className='modal-bottom'>
					<Button variant='primary' onClick={handleModalClose}>Cancel</Button>
					<Button variant='secondary' onClick={() => this.addTask()}>Accept</Button>
				</div>
			</div>
		);
	}
}

AddTaskModal.propTypes = {
	handleModalClose: PropTypes.func.isRequired,
	handleModalAccept: PropTypes.func.isRequired,
	addTask: PropTypes.func.isRequired,
	phase: PropTypes.object.isRequired,
	task: PropTypes.object.isRequired,
};

AddTaskModal.defaultProps = {
	handleModalClose: () => null,
	handleModalAccept: () => null,
	addTask: () => null,
	phase: null,
	task: {},
};

export default AddTaskModal;
