const initialState = {
	taskList: [],
	taskInfo: {},
	updateTaskStatus: {},
};

export default function task(state = initialState, action) {
	switch (action.type) {
		case 'GET_TASKS':
			return {
				...state,
				taskList: action.TaskList,
			};
		case 'GET_TASK_INFO':
			return {
				...state,
				taskInfo: action.taskInfo,
			};
		case 'UDPATE_TASK_SUCCESS':
			return {
				...state,
				updateTaskStatus: action.updateTaskStatus.data,
			};
		case 'UPDATE_TASK_ERROR':
			return {
				...state,
				errorMessage: action.errorMessage,
			};
		default:
			return state;
	}
}
