import React, { Component } from 'react';
import {
	Row, Col, Button, Form,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { Modal } from '../../ui/Theme';

import GanttChartModule from '../core/ganttChart/GanttChart';

class GanttChart extends Component {
	constructor(props) {
		super(props);
		this.state = {
			modalShow: false,
			children: <div />,
			project_id: null,
			filterList: [
				{
					filterId: 1,
					name: 'Week',
					value: 'week',
				},
				{
					filterId: 2,
					name: 'Month',
					value: 'month',
				},
				{
					filterId: 3,
					name: 'Year',
					value: 'year',
				},
			],
			filter: {
				filterBy: '',
			},
			selectFilterBy: '',
		};

		this.handleModalClose = this.handleModalClose.bind(this);
		this.handleModalAccept = this.handleModalAccept.bind(this);
		this.handleFilterChange = this.handleFilterChange.bind(this);
	}

	componentWillMount() {
		const headerTitle = 'Gantt Chart';
		this.props.setHeaderTitle(headerTitle);
		const { project_id } = this.props.match.params;
		const filter = {
			filterBy: 'month',
		};
		this.setState({ project_id, filter, selectFilterBy: filter.filterBy });
	}

	getProject = (project_id) => {
		if (this.props.projects) {
			return this.props.projects.find((project) => {
				return project.project_id === project_id;
			});
		}
		return null;
	}

	handleModal(children) {
		this.setState({ modalShow: true, children });
	}

	handleModalClose() {
		this.setState({ modalShow: false });
	}

	handleModalAccept() {
		this.setState({ modalShow: false });
	}

	handleFilterChange(event) {
		const { target } = event;
		this.setState({
			filter: {
				filterBy: target.value,
			},
		});
	}

	render() {
		const {
			modalShow,
			children,
			project_id,
			filterList,
			filter,
			selectFilterBy,
		} = this.state;
		const { projects } = this.props;
		if (projects.length > 0) {
			const project = this.getProject(project_id);
			return (
				<div>
					<Row className='min-bottom'>
						<Col>
							<h2>
								{project.name}
							</h2>
						</Col>
						<Col className='d-flex align-items-center'>
							<div className='d-flex align-items-center'>
								<span className='text-muted space'>Overall Budget</span>
								<span className='space'>{`$${project.excpectedFunding}`}</span>
							</div>
						</Col>
						<Col>
							<div className='d-flex justify-content-end'>
								<Link
									to={`/dashboard/schedule/${project.project_id}`}
								>
									<Button variant='secondary'>
										Schedule
									</Button>
								</Link>
							</div>
						</Col>
					</Row>
					<Row className='min-bottom'>
						<Col>
							<div className='d-flex justify-content-between'>
								<div className='text-muted'>
									{ `${project.phases.length} Phases` }
								</div>
								<div>
									<Form.Control
										size='sm'
										as='select'
										name='selectFilterBy'
										value={selectFilterBy}
										onChange={this.handleFilterChange}
									>
										{filterList.map((filterItem, index) => (
											<option
												id={index}
												key={filterItem.filterId}
												value={filterItem.value}
											>
												{filterItem.name}
											</option>
										))}
									</Form.Control>
								</div>
							</div>
						</Col>
					</Row>
					<Row>
						<Col>
							<div className='box'>
								<Row className='none-bottom'>
									<Col>
										<GanttChartModule data={project} filter={filter} />
									</Col>
								</Row>
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
			);
		}
		return (<div>Loading...</div>);
	}
}

GanttChart.propTypes = {
	projects: PropTypes.array.isRequired,
	setHeaderTitle: PropTypes.func.isRequired,
	match: PropTypes.object.isRequired,
};

GanttChart.defaultProps = {
	match: {},
};

export default GanttChart;
