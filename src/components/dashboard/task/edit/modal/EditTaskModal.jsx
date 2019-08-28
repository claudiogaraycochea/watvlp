import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
	Row, Col, Form, Button,
} from 'react-bootstrap';
import moment from 'moment';

class EditTaskModal extends Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			task_id: '',
			project_id: '',
			phase_name: '',
			task_name: '',
			task_description: '',
			task_startDate: '',
			task_endDate: '',
		};
		this.handleInputChange = this.handleInputChange.bind(this);
	}

	componentWillMount() {
		const { task } = this.props;
		const startDate = moment(task.startDate).format('YYYY-MM-DD');
		const endDate = moment(task.endDate).format('YYYY-MM-DD');
		this.setState({
			task_id: task.task_id,
			project_id: task.project_id,
			phase_name: task.phase_name,
			task_name: task.name,
			task_description: task.description,
			task_startDate: startDate,
			task_endDate: endDate,
		});
	}

	componentDidUpdate(prevProps) {
		if (prevProps.updateTaskStatus !== this.props.updateTaskStatus) {
			this.props.handleModalAccept();
		}
	}

	handleInputChange(event) {
		const { target } = event;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const { name } = target;
		this.setState({ [name]: value });
	}

	editTask() {
		const {
			project_id,
			task_id,
			task_name,
			task_description,
			task_startDate,
			task_endDate,
		} = this.state;

		const taskItem = {
			name: task_name,
			description: task_description,
			startDate: task_startDate,
			endDate: task_endDate,
		};

		this.props.updateTask(project_id, task_id, taskItem);
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
					{'Edit Task'}
				</div>
				<div className='modal-container'>
					<Row className='min-bottom'>
						<Col>
							<div>Edit Task</div>
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
					<Button variant='secondary' onClick={() => this.editTask()}>Accept</Button>
				</div>
			</div>
		);
	}
}

EditTaskModal.propTypes = {
	handleModalClose: PropTypes.func.isRequired,
	handleModalAccept: PropTypes.func.isRequired,
	updateTask: PropTypes.func.isRequired,
	updateTaskStatus: PropTypes.object.isRequired,
	task: PropTypes.object.isRequired,
};

EditTaskModal.defaultProps = {
	handleModalClose: () => null,
	handleModalAccept: () => null,
	updateTask: () => null,
	updateTaskStatus: {},
};

export default EditTaskModal;
