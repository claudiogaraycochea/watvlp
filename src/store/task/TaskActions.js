import axios from 'axios';

import { API_URL } from '../constants';

const getTasks = function getTasks(TaskList) {
	return {
		type: 'GET_TASKS',
		TaskList,
	};
};
const getTaskInfo = function getTaskInfo(taskInfo) {
	return {
		type: 'GET_TASK_INFO',
		taskInfo,
	};
};

const updateTask = (project_id, task_id, task) => {
	const params = task;
	return (dispatch) => {
		axios.patch(`${API_URL}/projects/${project_id}/tasks/${task_id}/update`, params)
			.then((response) => {
				dispatch({
					type: 'UDPATE_TASK_SUCCESS',
					updateTaskStatus: response.data,
				});
			})
			.catch((error) => {
				dispatch({
					type: 'UPDATE_TASK_ERROR',
					errorMessage: error,
				});
			});
	};
};

export { getTasks, getTaskInfo, updateTask };
