/* Task */
import React, { Component } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import moment from 'moment';

import { StatusBar, StatusNotification } from '../../../ui/Theme';
import * as projectObj from '../../../ui/ProjectLibrary';

class Task extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		const { task } = this.props;

		const taskStatus = projectObj.getStatus(task.status);
		const taskPercentage = projectObj.getPercentageByTask(task.status);
		return (
			<div className='box margin-bottom' key={task.task_id}>
				<Row className='min-bottom'>
					<Col>
						<h3>{task.name}</h3>
						<Link to={`/dashboard/project/detail/${task.project_id}`}>{task.project_name}</Link>
						{' / '}
						<Link to={`/dashboard/schedule/${task.project_id}`}>{task.phase_name}</Link>
					</Col>
				</Row>
				<Row className='div-line'>
					<Col>
						<Row className='min-bottom'>
							<Col>
								<div className='text-preview'>{task.description}</div>
							</Col>
						</Row>
						<Row className='none-bottom'>
							<Col>
								<div className='text-small'>
									<span className='text-muted'>Assigne to</span>
									{(task.assignee.length > 0) ? task.assignee.map(
										(contractor) => ` ${contractor.fullname} `) : 'None'
									}
								</div>
							</Col>
						</Row>
					</Col>
				</Row>
				<Row className='min-bottom'>
					<Col className='d-flex aling-items-center'>
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
					<Col className='d-flex justify-content-between'>
						<div className='text-small'>
							<span className='text-muted space'>Start Date</span>
							{moment(task.startDate).format('L')}
						</div>
						<div className='text-small'>
							<span className='text-muted space'>End Date</span>
							{moment(task.startDate).format('L')}
						</div>
					</Col>
				</Row>
				<Row className='none-bottom'>
					<Col className='d-flex justify-content-end'>
						<Link to={`/dashboard/project/${task.project_id}/task/detail/${task.task_id}`}><Button variant='primary'>View Task</Button></Link>
					</Col>
				</Row>
			</div>
		);
	}
}

Task.propTypes = {
	task: PropTypes.object.isRequired,
};

export default Task;
