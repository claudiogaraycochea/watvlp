import React, { Component } from 'react';
import {
	Row,
	Col,
	Button,
	Form,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './OverView.css';

import Task from '../../core/task/Task';
import Project from '../../core/project/Project';
import * as projectObj from '../../../ui/ProjectLibrary';

import EmptyDashboard from './EmptyDashboard/emptyDashboard';

class OverView extends Component {
	constructor(props) {
		super(props);
		this.state = {
			filter: {
				query: '',
			},
			query: '',
		};
		this.handleQueryChange = this.handleQueryChange.bind(this);
	}

	componentWillMount() {
		const headerTitle = 'WELCOME';
		this.props.setHeaderTitle(headerTitle);
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
		const { query, filter } = this.state;
		let { projects } = this.props;
		if (!projects) {
			return (<div>Loading...</div>);
		}

		if (projects.length > 0) {
			projectObj.init(projects);
			projects = projectObj.getObjProjectsFilterBy(filter);
			const taskArray = projectObj.getTaskFromProjects(projects);
			const tasks = (taskArray) ? projectObj.sortTasks(taskArray) : [];
			return (
				<div>
					<Row>
						<Col xs={12} lg={8}>
							<Row className='min-bottom'>
								<Col>
									<div className='d-flex justify-content-between'>
										<h2>Projects</h2>
										<Link
											to='/dashboard/project/add/'
										>
											<Button variant='secondary'>
												Add Project
											</Button>
										</Link>
									</div>
								</Col>
							</Row>
							<Row className='min-bottom'>
								<Col>
									<div className='d-flex justify-content-between'>
										<div className='text-muted'>
											{`${Object.keys(projects).length} Projects`}
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
							{projects.map((projectItem) => (
								<Project project={projectItem} key={projectItem.project_id} />
							))}
						</Col>
						<Col xs={12} lg={4}>
							<Row className='min-bottom'>
								<Col>
									<h2>My Tasks</h2>
								</Col>
							</Row>
							<Row>
								<Col>
									{tasks.map((task) => (
										<Task task={task} key={task.task_id} />
									))}
								</Col>
							</Row>
						</Col>
					</Row>
				</div>
			);
		}
		return (<EmptyDashboard />);
	}
}

OverView.propTypes = {
	setHeaderTitle: PropTypes.func.isRequired,
	projects: PropTypes.array.isRequired,
};

OverView.defaultProps = {
	projects: [],
};

export default OverView;
