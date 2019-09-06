/* Gantt Chart Module */
import React, { Component } from 'react';
import { Button, Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';

import * as projectObj from './GanttChartLibrary';
import './GanttChart.css';

class GanttChart extends Component {
	constructor(props) {
		super(props);
		this.state = {
			configGanttChart: {
				colWidth: 0,
			},
			tooltip: {
				visible: false,
				mouseX: 0,
				mouseY: 0,
				task: {},
			},
		};
		this.handleTooltipClose = this.handleTooltipClose.bind(this);
	}

	componentWillMount() {
		const projectData = { data: this.props.data };
		const { filter } = this.props;
		projectObj.init(projectData);
		const configGanttChart = projectObj.getConfigGanttChart(filter);
		this.setState({ configGanttChart });
	}

	componentDidUpdate(prevProps) {
		if (prevProps.filter !== this.props.filter) {
			const configGanttChart = projectObj.getConfigGanttChart(this.props.filter);
			// eslint-disable-next-line
			this.setState({ configGanttChart });
		}
	}

	getGanttChartBody() {
		const gData = projectObj.getGData();
		const matrix = gData.matrix.map((row, i) => {
			const rowI = i + 1;
			return (
				<tr key={rowI}>
					{
						row.map((task, j) => {
							const colJ = j + 1;
							if (task.name) {
								return (
									<td key={colJ}>
										{this.taskContainer(task)}
									</td>
								);
							}
							return (<td key={colJ} />);
						})
					}
				</tr>
			);
		});
		return (matrix);
	}

	createGanttChart = () => {
		const { filter } = this.props;
		return (
			<div className='gantt-chart-wrapper'>
				<div className='gantt-chart-phases'>
					<table className='phases'>
						<tbody>
							{this.getGanttChartHeaderPhases()}
						</tbody>
					</table>
				</div>
				<div className='gantt-chart-responsive'>
					<table>
						<thead className='month'>
							{this.getGanttChartHeaderMonths()}
						</thead>
					</table>
					<table>
						{(filter.filterBy !== 'year') ? (<thead>{this.getGanttChartHeaderDays()}</thead>) : null}
						<tbody>
							{this.getGanttChartBody()}
						</tbody>
					</table>
				</div>
			</div>
		);
	}

	getGanttChartHeaderMonths = () => {
		const gData = projectObj.getGData();
		const { colWidth } = this.state.configGanttChart;
		const days = gData.config.months.map((month, i) => {
			const styleMonth = {
				minWidth: (colWidth * month.cols),
			};
			const rowI = i + 1;
			return (
				<td key={rowI} style={styleMonth}>
					{month.month}
				</td>
			);
		});
		return (<tr>{days}</tr>);
	}

	getGanttChartHeaderDays = () => {
		const gData = projectObj.getGData();
		const { colWidth } = this.state.configGanttChart;
		const days = gData.config.days.map((day, i) => {
			const colI = i + 1;
			return (
				<td key={colI} className='header-day' style={{ 'min-width': colWidth }}>
					<div className='header-day-content'>{day}</div>
				</td>
			);
		});
		return (<tr>{days}</tr>);
	}

	getGanttChartHeaderPhases = () => {
		const gData = projectObj.getGData();
		const phases = gData.phases.map((phase, i) => {
			const rowI = i + 1;
			return (
				<tr key={rowI}>
					<td>
						{phase.name}
					</td>
				</tr>
			);
		});
		return phases;
	}

	viewTask = ({ clientY, clientX }, task) => {
		const mouseY = clientY - 180;
		const mouseX = clientX - 140;
		this.setState({
			tooltip: {
				visible: true,
				mouseX,
				mouseY,
				task,
			},
		});
	}

	showTooltip = () => {
		const { tooltip } = this.state;
		const styleTooltip = {
			left: tooltip.mouseX,
			top: tooltip.mouseY,
		};

		return (
			<div className='tooltip' style={styleTooltip}>
				<Button onClick={this.handleTooltipClose} className='tooltip-close' />
				<div className='tooltip-content'>
					<Row className='min-bottom'>
						<Col className='col-4'>
							<div className='text-muted'>Task</div>
						</Col>
						<Col className='col-8'>
							{tooltip.task.name}
						</Col>
					</Row>
					<Row className='min-bottom'>
						<Col className='col-4'>
							<div className='text-muted'>Phase</div>
						</Col>
						<Col className='col-8'>
							{tooltip.task.phase_name}
						</Col>
					</Row>
					<Row className='min-bottom'>
						<Col className='col-4'>
							<div className='text-muted'>Start Date</div>
						</Col>
						<Col className='col-8'>
							{tooltip.task.startDate}
						</Col>
					</Row>
					<Row className='min-bottom'>
						<Col className='col-4'>
							<div className='text-muted'>End Date</div>
						</Col>
						<Col className='col-8'>
							{tooltip.task.endDate}
						</Col>
					</Row>
					<Row className='min-bottom'>
						<Col className='col-4'>
							<div className='text-muted'>Days</div>
						</Col>
						<Col className='col-8'>
							{tooltip.task.duration}
						</Col>
					</Row>
				</div>
			</div>
		);
	}

	handleTooltipClose() {
		this.setState({
			tooltip: {
				visible: false,
			},
		});
	}

	handleKeyPress(event, task) {
		if (event.keyCode === 13) {
			this.viewTask(event, task);
		}
	}

	taskContainer(task) {
		const { colWidth } = this.state.configGanttChart;
		const styleTask = {
			width: (colWidth * task.duration),
			backgroundColor: task.phaseColor,
		};
		return (
			<div
				className='task'
				style={styleTask}
				onClick={(event) => this.viewTask(event, task)}
				onKeyPress={(event) => this.handleKeyPress(event, task)}
				role='textbox'
				tabIndex={0}
			/>
		);
	}

	render() {
		const { tooltip, configGanttChart } = this.state;
		return (
			<div className={configGanttChart.style}>
				{this.createGanttChart()}
				{(tooltip.visible) ? this.showTooltip() : null}
			</div>
		);
	}
}

GanttChart.propTypes = {
	data: PropTypes.any.isRequired,
	filter: PropTypes.any,
};

GanttChart.defaultProps = {
	filter: null,
};

export default GanttChart;
