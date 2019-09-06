/* Project */
import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { StatusBar, StatusNotification } from '../../../ui/Theme';
import * as projectObj from '../../../ui/ProjectLibrary';

class Project extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		const { project } = this.props;
		const taskArray = projectObj.getTaskList(project);
		const taskPercentage = projectObj.getPercentageByProject(taskArray);
		const taskStatus = projectObj.getStatus(projectObj.getStatusByPercentage(taskPercentage));
		return (
			<div className='box margin-bottom' key={project.project_id}>
				<Row>
					<Col>
						<div className='d-flex justify-content-center'>
							<div className='project-image' />
						</div>
					</Col>
				</Row>
				<Row className='min-bottom'>
					<Col>
						<h3>{project.name}</h3>
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
				<Row className='none-bottom'>
					<Col>
						<div className='box'>
							<Row className='none-bottom'>
								<Col>
									<Link to={`/dashboard/budget/${project.project_id}`}>
										<div className='btn-hot-access'>
											<div className='number'>...</div>
											<div>Budget</div>
										</div>
									</Link>
								</Col>
								<Col>
									<Link to={`/dashboard/schedule/${project.project_id}`}>
										<div className='btn-hot-access'>
											<div className='number'>{(taskArray) ? taskArray.length : 0}</div>
											<div>My Tasks</div>
										</div>
									</Link>
								</Col>
								<Col>
									<Link to={`/dashboard/project/detail/${project.project_id}`}>
										<div className='btn-hot-access'>
											<div className='number'>+</div>
											<div>More</div>
										</div>
									</Link>
								</Col>
							</Row>
						</div>
					</Col>
				</Row>
			</div>
		);
	}
}

Project.propTypes = {
	project: PropTypes.object.isRequired,
};

export default Project;
