import axios from 'axios';

import { API_URL } from '../constants';
import { request } from '../../lib/http';

const addPhase = (project_id, phase) => {
	const params = phase;
	return (dispatch) => {
		axios.post(`${API_URL}/projects/${project_id}/phases/add`, params)
			.then((response) => {
				dispatch({
					type: 'ADD_PHASE',
					phase: response.data,
				});
			})
			.catch((error) => {
				dispatch({
					type: 'ADD_PHASE_ERROR',
					errorMessage: error,
				});
			});
	};
};

const addTask = (project_id, task) => {
	const params = task;
	return (dispatch) => {
		axios.post(`${API_URL}/projects/${project_id}/tasks/add`, params)
			.then((response) => {
				dispatch({
					type: 'ADD_TASK',
					task: response.data,
				});
			})
			.catch((error) => {
				dispatch({
					type: 'ADD_TASK_ERROR',
					errorMessage: error,
				});
			});
	};
};

const searchContractor = (query) => {
	const params = query;
	return (dispatch) => {
		axios.get(`${API_URL}/users/`, params)
			.then((response) => {
				dispatch({
					type: 'SEARCH_CONTRACTOR',
					query,
					contractorList: response.data,
				});
			})
			.catch((error) => {
				dispatch({
					type: 'SEARCH_CONTRACTOR_ERROR',
					errorMessage: error,
				});
			});
	};
};

const addContractor = (project_id, task_id, assignee) => {
	const params = assignee;
	return (dispatch) => {
		axios.patch(`${API_URL}/projects/${project_id}/tasks/${task_id}/assignee/add`, params)
			.then((response) => {
				dispatch({
					type: 'ADD_CONTRACTOR',
					assignee: response.data,
				});
			})
			.catch((error) => {
				dispatch({
					type: 'ADD_CONTRACTOR_ERROR',
					errorMessage: error,
				});
			});
	};
};

const getProjectCategory = function getProjectCategory(projectCategories) {
	return {
		type: 'GET_PROJECT_CATEGORY',
		projectCategories,
	};
};

const getProjectInfo = function getProjectInfo(projectInfo) {
	return {
		type: 'GET_PROJECT_INFO',
		projectInfo,
	};
};

const getProjectBudget = (project_id) => {
	const params = project_id;
	return (dispatch) => {
		axios.get(`${API_URL}/projects/${project_id}/budget`, params)
			.then((response) => {
				dispatch({
					type: 'GET_PROJECT_BUDGET',
					projectBudget: response.data.data,
				});
			})
			.catch((error) => {
				dispatch({
					type: 'GET_PROJECT_BUDGET_ERROR',
					errorMessage: error,
				});
			});
	};
};

const addBudgetItem = (project_id, item) => {
	const params = item;
	return (dispatch) => {
		axios.post(`${API_URL}/projects/${project_id}/budget/items/add`, params)
			.then((response) => {
				dispatch({
					type: 'ADD_BUDGET_ITEM',
					budgetItem: response.data,
				});
			})
			.catch((error) => {
				dispatch({
					type: 'ADD_BUDGET_ITEM_ERROR',
					errorMessage: error,
				});
			});
	};
};

const updateBudgetItem = (project_id, item_id, item) => {
	const params = item;
	return (dispatch) => {
		axios.patch(`${API_URL}/projects/${project_id}/budget/items/${item_id}/update`, params)
			.then((response) => {
				dispatch({
					type: 'UPDATE_BUDGET_ITEM',
					budgetItem: response.data,
				});
			})
			.catch((error) => {
				dispatch({
					type: 'UPDATE_BUDGET_ITEM_ERROR',
					errorMessage: error,
				});
			});
	};
};

const updateOverallBudget = (project_id, projectData) => {
	const params = projectData;
	return (dispatch) => {
		axios.patch(`${API_URL}/projects/${project_id}`, params)
			.then((response) => {
				dispatch({
					type: 'UPDATE_OVERALL_BUDGET',
					excpectedFunding: response.data,
				});
			})
			.catch((error) => {
				dispatch({
					type: 'UPDATE_OVERALL_BUDGET_ERROR',
					errorMessage: error,
				});
			});
	};
};

const getProjects = function getProjects(projectList) {
	return {
		type: 'GET_PROJECTS',
		projectList,
	};
};

const addProject = (project) => {
	const params = project;
	return (dispatch) => {
		axios.post(`${API_URL}/projects/create`, params)
			.then((response) => {
				dispatch({
					type: 'ADD_PROJECT',
					project: response.data,
				});
			})
			.catch((error) => {
				dispatch({
					type: 'ADD_PROJECT_ERROR',
					errorMessage: error,
				});
			});
	};
};

const addWorker = (project_id, workersAdd) => {
	const params = workersAdd;
	return (dispatch) => {
		axios.post(`${API_URL}/projects/${project_id}/workers/add`, params)
			.then((response) => {
				dispatch({
					type: 'ADD_WORKER_TO_PROJECT_SUCCESS',
					workerAdded: response.data,
				});
			})
			.catch((error) => {
				dispatch({
					type: 'ADD_WORKER_TO_PROJECT_ERROR',
					errorMessage: error,
				});
			});
	};
};

const changeStatus = (project_id, task_id, status) => {
	const params = status;
	return (dispatch) => {
		axios.patch(`${API_URL}/projects/${project_id}/tasks/${task_id}/status`, params)
			.then((response) => {
				dispatch({
					type: 'CHANGE_STATUS',
					status: response.data,
				});
			})
			.catch((error) => {
				dispatch({
					type: 'CHANGE_STATUS_ERROR',
					errorMessage: error,
				});
			});
	};
};

const updateProject = (project_id, project) => {
	const params = project;
	return (dispatch) => {
		axios.patch(`${API_URL}/projects/${project_id}`, params)
			.then((response) => {
				dispatch({
					type: 'UPDATE_PROJECT_SUCCESS',
					updateProjectStatus: response.data,
				});
			})
			.catch((error) => {
				dispatch({
					type: 'UPDATE_PROJECT_ERROR',
					errorMessage: error,
				});
			});
	};
};

export const getProject = (project_id) => {
	return async (dispatch) => {
		try {
			const { data } = await request('GET', `/projects/${project_id}`);
			dispatch({
				type: 'GET_PROJECT_INFO',
				projectInfo: data,
			});
		} catch (error) {
			dispatch({
				type: 'GET_PROJECT_INFO_ERROR',
				errorMessage: error,
			});
		}
	};
};

export {
	getProjectInfo,
	addPhase,
	addTask,
	searchContractor,
	addContractor,
	getProjectCategory,
	getProjectBudget,
	addBudgetItem,
	updateBudgetItem,
	updateOverallBudget,
	getProjects,
	addProject,
	addWorker,
	changeStatus,
	updateProject,
};
