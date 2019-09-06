import React, { Component } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import moment from 'moment';
import PropTypes from 'prop-types';

import { UserProject, StatusBar, StatusNotification } from '../../../../ui/Theme';

import * as projectObj from '../../../../ui/ProjectLibrary';

import './TaskModal.css';

class TaskModal extends Component {
	constructor(props, context) {
		super(props, context);
		this.state = {};
	}

	assigneeList = (task) => {
		const { assignee } = task;
		return (
			<div>
				{assignee.map((contractor) => {
					return (
						<Row>
							<Col>
								<UserProject
									key={contractor.id}
									image=''
									fullname={contractor.fullname}
									subtitle={contractor.role}
								/>
							</Col>
						</Row>
					);
				})}
			</div>
		);
	}

	render() {
		const { handleModalClose, handleModalAccept } = this.props;
		const { task, phase } = this.props;
		const taskStatus = projectObj.getStatus(task.status);
		const taskPercentage = projectObj.getPercentageByTask(task.status);
		return (
			<div>
				<div className='modal-header'>View Task</div>
				<div className='modal-container'>
					<Row className='min-bottom'>
						<Col>
							<div className='text-muted'>Add Task to</div>
							<h3>{phase.name}</h3>
						</Col>
					</Row>
					<Row className='div-line'>
						<Col>
							<div className='text-muted'>Task Name</div>
							<div>{task.name}</div>
						</Col>
					</Row>
					<Row className='div-line'>
						<Col>
							<div className='text-muted'>Description</div>
							<div>{task.description}</div>
						</Col>
					</Row>
					<Row className='min-bottom div-line'>
						<Col>
							<div className='text-muted'>Status</div>
						</Col>
						<Col className='d-flex justify-content-end'>
							<StatusNotification status={taskStatus.class} />
						</Col>
					</Row>
					<Row className='min-bottom'>
						<Col>
							<StatusBar percentage={taskPercentage} />
						</Col>
					</Row>
					<Row>
						<Col className='d-flex text-small'>
							<div className='text-muted space'>Start Date</div>
							<div>{moment(task.startDate).format('L')}</div>
						</Col>
						<Col className='d-flex justify-content-end text-small'>
							<div className='text-muted space'>End Date</div>
							<div>{moment(task.endDate).format('L')}</div>
						</Col>
					</Row>
					<Row className='min-bottom div-line'>
						<Col>
							<div className='d-flex justify-content-between'>
								<div className='text-muted'>Contractor</div>
							</div>
						</Col>
					</Row>
					<Row>
						<Col>
							<div className='assignee-list'>
								{this.assigneeList(task)}
							</div>
						</Col>
					</Row>
				</div>
				<div className='modal-bottom'>
					<Button variant='primary' onClick={handleModalClose}>Cancel</Button>
					<Button variant='secondary' onClick={handleModalAccept}>Accept</Button>
				</div>
			</div>
		);
	}
}

TaskModal.propTypes = {
	handleModalClose: PropTypes.func.isRequired,
	handleModalAccept: PropTypes.func.isRequired,
	task: PropTypes.object.isRequired,
	phase: PropTypes.object.isRequired,
};

export default TaskModal;
