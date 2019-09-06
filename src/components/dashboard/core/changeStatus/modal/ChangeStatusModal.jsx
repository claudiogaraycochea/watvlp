import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'react-bootstrap';

import * as projectObj from '../../../../ui/ProjectLibrary';

class ChangeStatusModal extends Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			status: 0,
		};
		this.handleInputChange = this.handleInputChange.bind(this);
	}

	componentWillMount() {
		const { task } = this.props;
		this.setState({ status: task.status });
	}

	componentDidUpdate(prevProps) {
		if (prevProps.status !== this.props.status) {
			this.props.handleModalAccept();
		}
	}

	handleInputChange(event) {
		const { target } = event;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const { name } = target;

		this.setState({ [name]: value });
	}

	changeStatus() {
		const { project_id, task } = this.props;
		const { status } = this.state;
		const statusData = { status };
		this.props.changeStatus(project_id, task.task_id, statusData);
	}

	render() {
		const { handleModalClose } = this.props;
		const {
			status,
		} = this.state;

		return (
			<div>
				<div className='modal-header'>
					{'Change Status'}
				</div>
				<div className='modal-container'>
					<Form.Group>
						<Form.Label>Status</Form.Label>
						<Form.Control as='select' name='status' value={status} onChange={this.handleInputChange}>
							{projectObj.getStatusList().map((statusItem, index) => (
								<option id={index} key={statusItem.id} value={statusItem.id}>
									{statusItem.name}
								</option>
							))}
						</Form.Control>
					</Form.Group>
				</div>
				<div className='modal-bottom'>
					<Button variant='primary' onClick={handleModalClose}>Cancel</Button>
					<Button variant='secondary' onClick={() => this.changeStatus()}>Accept</Button>
				</div>
			</div>
		);
	}
}

ChangeStatusModal.propTypes = {
	handleModalClose: PropTypes.func.isRequired,
	handleModalAccept: PropTypes.func.isRequired,
	changeStatus: PropTypes.func.isRequired,
	project_id: PropTypes.string.isRequired,
	task: PropTypes.object.isRequired,
	status: PropTypes.any.isRequired,
};

ChangeStatusModal.defaultProps = {
	handleModalClose: () => null,
	handleModalAccept: () => null,
	project_id: null,
	task: {},
	status: 0,
};

export default ChangeStatusModal;
