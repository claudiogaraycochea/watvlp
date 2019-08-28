const projectData = {
	projects: {},
};

export const init = (projects) => {
	projectData.projects = projects;
	return true;
};

export const getProjects = () => {
	return projectData.projects;
};

export const getProject = (project_id) => {
	if (projectData.projects) {
		return projectData.projects.find((project) => {
			return project.project_id === project_id;
		});
	}
	return null;
};

export const getObjProjectsFilterBy = (filter) => {
	if (projectData.projects) {
		return projectData.projects.filter((project) => {
			return project.name.toLowerCase().includes(filter.query.toLowerCase());
		});
	}
	return null;
};

export const getProjectFilterByPhase = (phases, filter) => {
	if (phases) {
		return phases.filter((phase) => {
			return phase.name.toLowerCase().includes(filter.query.toLowerCase());
		});
	}
	return phases;
};

export const getTaskList = (project) => {
	if (!project) {
		return [];
	}
	if (project.phases.length > 0) {
		const taskList = [];
		project.phases.map((phase) => {
			return phase.tasks.map((task) => {
				const taskData = {
					project_name: project.name,
					author: task.author,
					createdAt: task.createdAt,
					project_id: phase.project_id,
					phase_id: phase.phase_id,
					phase_name: phase.name,
					task_id: task.task_id,
					name: task.name,
					description: task.description,
					assignee: task.assignee,
					startDate: task.startDate,
					endDate: task.endDate,
					status: task.status,
				};
				taskList.push(taskData);
				return taskData;
			});
		});
		return taskList;
	}
	return null;
};

export const getTaskFromProjects = () => {
	const tasksList = [];
	for (let i = 0; i < projectData.projects.length; i++) {
		const project = projectData.projects[0];
		const tasks = getTaskList(project);
		for (let j = 0; j < tasks.length; j++) {
			tasksList.push(tasks[j]);
		}
	}
	return tasksList;
};

export const sortTasks = (tasks) => {
	if (!tasks) return [];
	const tasksResult = [];
	const maxTask = (tasks.length > 3) ? 3 : tasks.length;
	for (let i = 0; i < maxTask; i++) {
		// eslint-disable-next-line no-undef
		tasksResult.push(tasks[i]);
	}
	return tasksResult;
};

const statusData = [
	{
		id: 0,
		name: 'Not Started',
		class: 'not-started',
	},
	{
		id: 1,
		name: 'In Progress',
		class: 'in-progress',
	},
	{
		id: 2,
		name: 'Delayed',
		class: 'delayed',
	},
	{
		id: 3,
		name: 'Needs Verification',
		class: 'needs-verification',
	},
	{
		id: 4,
		name: 'Awaiting Permit',
		class: 'awaiting-permit',
	},
	{
		id: 5,
		name: 'Awaiting Inspection',
		class: 'awaiting-inspection',
	},
	{
		id: 6,
		name: 'Complete',
		class: 'complete',
	},
];

export const getStatus = (status) => {
	return statusData.find((item) => item.id === status);
};

export const getStatusList = () => {
	return statusData;
};

export const getPercentageByProject = (taskArray) => {
	if (taskArray) {
		if (taskArray.length > 0) {
			let taskCompleteCounter = 0;
			const maxTaskCounter = taskArray.length;
			for (let i = 0; i < maxTaskCounter; i++) {
				if (taskArray[i].status === 6) {
					taskCompleteCounter += 1;
				}
			}
			const calculatePercentage = (taskCompleteCounter / maxTaskCounter) * 100;
			return calculatePercentage;
		}
		return 0;
	}
	return 0;
};

export const getStatusByPercentage = (percentage) => {
	if (percentage === 100) {
		return 6; // Completed
	}
	if ((percentage > 0) && (percentage < 100)) {
		return 1; // In Progress
	}
	return 0; // Not Started
};

export const getPercentageByTask = (status) => {
	switch (status) {
		case 1:
			return 40; // In Progress;
		case 2:
			return 25; // Delayed
		case 3:
			return 60; // Need verification
		case 4:
			return 75; // Awaiting Permit
		case 5:
			return 90; // Awaiting Inspection
		case 6:
			return 100; // Completed
		default:
			return 0;
	}
};

const countBudgetQuantity = (taskData) => {
	let countQuantity = 0;
	for (let i = 0; i < taskData.length; i++) {
		countQuantity += taskData[i].quantity;
	}
	return countQuantity;
};

export const getBudget = (projectBudget) => {
	if (projectBudget.items.length > 0) {
		const budgetList = [];
		projectBudget.items.map((item) => {
			const tasks = item.tasks.map((task) => {
				const taskData = {
					task_id: task.task_id,
					quantity: task.quantity,
				};
				return taskData;
			});
			const quantity = countBudgetQuantity(tasks);
			const total_budget = (quantity * item.unit_cost);
			const budgetItem = {
				item_id: item.item_id,
				name: item.name,
				type: item.type,
				unit_cost: item.unit_cost,
				tasks,
				quantity,
				total_budget,
			};
			return budgetList.push(budgetItem);
		});
		return budgetList;
	}
	return null;
};

export const getBudgetByTask = (projectBudget) => {
	if (projectBudget.items.length > 0) {
		const budgetList = [];
		projectBudget.items.map((item) => {
			const tasks = item.tasks.map((task) => {
				const taskData = {
					task_id: task.task_id,
					quantity: task.quantity,
				};
				return taskData;
			});
			for (let i = 0; i < tasks.length; i++) {
				const { quantity } = tasks[i];
				const total_budget = (quantity * item.unit_cost);
				const budgetItem = {
					item_id: item.item_id,
					task_id: tasks[i].task_id,
					name: item.name,
					type: item.type,
					unit_cost: item.unit_cost,
					tasks,
					quantity,
					total_budget,
				};
				budgetList.push(budgetItem);
			}
			return budgetList;
		});
		return budgetList;
	}
	return null;
};

export const getTotalBudgetByTask = (task_id, budgetTaskArray) => {
	const budgetTask = (budgetTaskArray) ? budgetTaskArray.filter(
		(task) => (task.task_id === task_id),
	) : [];
	let totalBudgetTask = 0;
	for (let i = 0; i < budgetTask.length; i++) {
		totalBudgetTask += budgetTask[i].total_budget;
	}
	return totalBudgetTask;
};

export const getBudgetTaskList = (task_id, budgetTaskArray) => {
	if (budgetTaskArray) {
		return budgetTaskArray.filter((task) => (task.task_id === task_id));
	}
	return [];
};
