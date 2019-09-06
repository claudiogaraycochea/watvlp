/* eslint-disable no-use-before-define */
/* Data Gantt Chart */
const gData = {
	name: '', // Project Name
	matrix: [], // Pesult of the matrix with phases defined ready for print
	tasks: [], // Tasks array converted to matrix
	phases: [], // Phase array
	config: {
		colMax: 0,
		rowMax: 0,
		monthSelected: {
			index: 0,
			name: '',
		},
		colIndexer: [],
		startDate: '',
		endDate: '',
		months: [],
		days: [],
	},
};

/* Initialize gData */
export const init = (project) => {
	gData.name = project.data.name;
	/* Task Initialize */
	const tasks = convertGTasks(project);
	gData.tasks = sortTasks(tasks);

	/* Matrix configuration */
	const date = getProjectDate();
	gData.config.startDate = date.startDate; // Initialize the project
	gData.config.endDate = date.endDate; // Finalize the project
	gData.config.colIndexer = colIndexerConstructor();

	buildMatrix();
	return true;
};

const getProjectDate = () => {
	let projectStartDate = +new Date(gData.tasks[0].startDate);
	let projectEndDate = +new Date(gData.tasks[0].endDate);
	for (let i = 0; i < gData.tasks.length; i++) {
		const newStartDate = +new Date(gData.tasks[i].startDate);
		const newEndDate = +new Date(gData.tasks[i].endDate);
		if (newStartDate < projectStartDate) {
			projectStartDate = newStartDate;
		}
		if (newEndDate > projectEndDate) {
			projectEndDate = newEndDate;
		}
	}
	const projectEndDateMonth = new Date(projectEndDate);
	const month = projectEndDateMonth.getUTCMonth() + 2; // months from 1-12
	const day = 1;
	const year = projectEndDateMonth.getUTCFullYear();
	projectEndDate = +new Date(`${year}-${month}-${day}`);
	const data = {
		startDate: dateDBFormat(projectStartDate),
		endDate: dateDBFormat(projectEndDate),
	};
	return data;
};

const colIndexerConstructor = () => {
	const startDate = +new Date(gData.config.startDate);
	const endDate = +new Date(gData.config.endDate);
	const duration = (endDate - startDate) / (1000 * 60 * 60 * 24) + 1;
	let nextDay = startDate;
	const colIndexer = [];
	for (let i = 0; i < duration; i++) {
		const dateObj = new Date(nextDay);
		const month = dateObj.getUTCMonth() + 1; // months from 1-12
		const day = dateObj.getUTCDate();
		const year = dateObj.getUTCFullYear();
		const data = {
			date: `${year}-${month}-${day}`,
		};
		colIndexer.push(data);
		nextDay = +new Date(nextDay + 1000 * 60 * 60 * 24);
	}
	return colIndexer;
};

const buildMatrix = () => {
	gData.phases = getPhases(gData.tasks);
	gData.config.rowMax = getPhaseMax();
	gData.config.months = getMonths();
	gData.config.monthSelected = {
		index: 0,
		name: gData.config.months[0].month,
	};
	gData.config.days = getDays();
	gData.matrix = insertTaskToMatrix(gData.tasks, gData.config);
};

const getDays = () => {
	const { colIndexer } = gData.config;
	const days = [];
	for (let i = 0; i < colIndexer.length; i++) {
		const dayCurrent = new Date(colIndexer[i].date).getUTCDate();
		days.push(dayCurrent);
	}
	return days;
};

const sortTasks = (tasks) => {
	let tasksSorted = [];
	let previousPhase_id = 0;
	let countRow = -1;
	tasksSorted = sortTasksByPhase(tasks);
	for (let i = 0; i < tasksSorted.length; i++) {
		if (tasksSorted[i].phase_id !== previousPhase_id) {
			const maxRowPrevious = getMaxRow(tasksSorted, previousPhase_id);
			countRow = maxRowPrevious + 1;
			tasksSorted[i].row = countRow;
			previousPhase_id = tasksSorted[i].phase_id;
		} else {
			countRow = rowFree(tasksSorted[i], tasksSorted, i, countRow);
			tasksSorted[i].row = countRow;
		}
	}
	return tasksSorted;
};

const sortTasksByPhase = (tasks) => {
	const tasksResult = [];
	const groupBy = (key) => (array) => array.reduce((objectsByKeyValue, obj) => {
		const value = obj[key];
		objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
		return objectsByKeyValue;
	}, {});
	const groupByBrand = groupBy('phase_id');
	const phases = groupByBrand(tasks);
	/* eslint guard-for-in: off */
	/* eslint no-restricted-syntax: off */
	// eslint-disable-next-line
	for (const key in phases) {
		const tasksSorted = phases[key].sort(sortByDateBegin);
		for (let i = 0; i < tasksSorted.length; i++) {
			tasksResult.push(tasksSorted[i]);
		}
	}
	return tasksResult;
};

const existTask = (date, row, tasks) => {
	for (let i = 0; i < tasks.length; i++) {
		if (date === tasks[i].startDate && row === tasks[i].row) {
			return tasks[i];
		}
	}
	return null;
};

const insertTaskToMatrix = (tasks, gtConfig) => {
	const gtMatrixRow = [];
	let gtMatrixCol = [];
	let existTaskOnRow = 0;
	for (let row = 0; row < gtConfig.rowMax; row++) {
		for (let col = 0; col < gtConfig.colIndexer.length; col++) {
			const task = existTask(gtConfig.colIndexer[col].date, row, tasks);
			let data = {};
			if (task) {
				const startDate = +new Date(task.startDate);
				const endDate = +new Date(task.endDate);
				const duration = (endDate - startDate) / (1000 * 60 * 60 * 24) + 1;
				data = {
					date: gtConfig.colIndexer[col].date,
					row,
					col,
					duration,
					name: task.name,
					id: task.id,
					phase_name: task.phase_name,
					phase_id: task.phase_id,
					assignee: task.assignee,
					startDate: task.startDate,
					endDate: task.endDate,
					phaseColor: getPhaseColor(task.phase_id),
				};
				existTaskOnRow = 1;
			} else {
				data = {
					row,
					startDate: gtConfig.colIndexer[col].date,
				};
			}
			gtMatrixCol.push(data);
		}
		if (existTaskOnRow === 1) {
			gtMatrixRow.push(gtMatrixCol);
			existTaskOnRow = 0;
		}
		gtMatrixCol = [];
	}
	gData.loading = false;
	return gtMatrixRow;
};

/* Convert task to task matrix */
const convertGTasks = (project) => {
	const tasks = project.data.phases.map((phase) => {
		return phase.tasks.map((item) => {
			const task = {
				id: item.task_id,
				name: item.name,
				phase_id: phase.phase_id,
				phase_name: phase.name,
				assignee: item.assignee,
				startDate: dateDBFormat(item.startDate),
				endDate: dateDBFormat(item.endDate),
				row: 0,
			};
			return task;
		});
	});
	return tasks;
};

export const getGData = () => {
	return gData;
};

const dateRemoveZero = (date) => {
	const newDate = date.replace(/(^|-)0+/g, '$1');
	return newDate;
};

const dateDBFormat = (date) => {
	const dateObj = new Date(date);
	const month = dateObj.getUTCMonth() + 1; // months from 1-12
	const day = dateObj.getUTCDate();
	const year = dateObj.getUTCFullYear();
	const dateFormated = dateRemoveZero(`${year}-${month}-${day}`);
	return dateFormated;
};

const getMonths = () => {
	const monthsData = [];
	let monthPrevious = 0;
	let yearPrevious = 0;
	let countDays = 0;
	let totalCols = 0;
	const { colIndexer } = gData.config;
	const monthNames = [
		'',
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December',
	];

	for (let i = 0; i < colIndexer.length; i++) {
		const dateObj = new Date(colIndexer[i].date);
		const monthCurrent = dateObj.getUTCMonth() + 1;
		const year = dateObj.getUTCFullYear();
		if (monthPrevious === monthCurrent) {
			countDays += 1;
		} else {
			totalCols += countDays;
			const data = {
				id: i,
				cols: countDays,
				month: monthNames[monthPrevious],
				year: yearPrevious,
				monthNumber: monthPrevious,
				totalCols,
			};
			monthsData.push(data);
			monthPrevious = monthCurrent;
			yearPrevious = year;
			countDays = 1;
		}
	}
	const monthsDataFiltered = [];
	for (let i = 1; i < monthsData.length; i++) {
		const data = {
			id: i,
			cols: monthsData[i].cols,
			month: monthsData[i].month,
			year: monthsData[i].year,
			monthNumber: monthsData[i].monthNumber,
			totalCols: monthsData[i].totalCols,
		};
		monthsDataFiltered.push(data);
	}
	return monthsDataFiltered;
};

const getMaxRow = (tasksSorted, phase_id) => {
	let maxRow = 0;
	for (let i = 0; i < tasksSorted.length; i++) {
		if (tasksSorted[i].phase_id === phase_id) {
			if (maxRow < tasksSorted[i].row) {
				maxRow = tasksSorted[i].row;
			}
		}
	}
	return maxRow;
};

const rowFree = (task, tasksSorted, i, countRow) => {
	let newRow = countRow;
	let rowInit = 0;
	for (let j = 0; j < i; j++) {
		if (task.phase_id === tasksSorted[j].phase_id) {
			if (rowInit === 0) {
				rowInit = 1;
				newRow = tasksSorted[j].row;
			}
			const start = +new Date(task.startDate);
			const end = +new Date(task.endDate);
			const sb = +new Date(tasksSorted[j].startDate);
			const eb = +new Date(tasksSorted[j].endDate);
			if (
				(start >= sb && start <= eb) // case start inside
				|| (start <= sb && end >= sb) // case end inside
				|| (start >= sb && end <= sb) // case inside
			) {
				newRow += 1;
			}
		}
	}
	return newRow;
};

const getPhases = (tasks) => {
	let previousPhase_id = 0;
	const phases = [];
	for (let i = 0; i < tasks.length; i++) {
		if (tasks[i].phase_id !== previousPhase_id) {
			const data = {
				id: tasks[i].phase_id,
				name: `Phase ${tasks[i].phase_name}`,
				row: tasks[i].row,
				multiply: getPhaseCounter(tasks, tasks[i].phase_id),
			};
			phases.push(data);
			previousPhase_id = tasks[i].phase_id;
		} else {
			previousPhase_id = tasks[i].phase_id;
		}
	}
	return phases;
};

const getPhaseCounter = (tasksSorted, phase_id) => {
	const phaseTask = tasksSorted.filter((item) => item.phase_id === phase_id);
	const group = phaseTask.reduce((r, a) => {
		r[a.row] = [...(r[a.row] || []), a];
		return r;
	}, {});
	let counter = 0;
	counter = Object.keys(group).map(() => {
		counter += 1;
		return counter;
	});
	return counter;
};

const getPhaseMax = () => {
	// eslint-disable-next-line no-unused-vars
	let phaseCounter = 0;
	let rowPrevious = -1;
	let phaseMax = 1;
	for (let i = 0; i < gData.tasks.length; i++) {
		if (rowPrevious !== gData.tasks[i].row) {
			phaseCounter += 1;
			phaseMax += 1;
		}
		rowPrevious = gData.tasks[i].row;
	}
	return phaseMax;
};

const sortByDateBegin = (a, b) => {
	const aStartDate = +new Date(a.startDate);
	const bStartDate = +new Date(b.startDate);
	if (aStartDate < bStartDate) { return -1; }
	if (aStartDate > bStartDate) { return 1; }
	return 0;
};

const getPhaseColor = (phase_id) => {
	const colors = [
		{ color: '#2ecc71' },
		{ color: '#3498db' },
		{ color: '#9b59b6' },
		{ color: '#f1c40f' },
	];
	let index = gData.phases.findIndex((item) => {
		return item.id === phase_id;
	});
	if (index > colors.length - 1) {
		index %= colors.length;
	}
	if (index === -1) {
		return '#318fc9';
	}
	return colors[index].color;
};

export const getConfigGanttChart = (filter) => {
	let configGanttChart = { colWidth: '' };

	if (filter.filterBy === 'week') {
		configGanttChart = {
			colWidth: 100,
			style: 'week-wrapper'
		}
	}
	if (filter.filterBy === 'month') {
		configGanttChart = {
			colWidth: 28,
			style: 'month-wrapper',
		}
	}
	if (filter.filterBy === 'year') {
		configGanttChart = {
			colWidth: 3,
			style: 'year-wrapper',
		}
	}
	return configGanttChart;
};
