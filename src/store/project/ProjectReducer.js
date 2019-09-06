const initialState = {
	projectList: [],
	projectInfo: {},
	projectCategories: [],
	projectBudget: {
		items: [],
	},
	projectBudgetItem: {},
	contractorList: [],
	project: {},
	workerAdded: {},
	updateProjectStatus: false,
};

export default function project(state = initialState, action) {
	switch (action.type) {
		case 'ADD_PHASE':
			return {
				...state,
				phase: action.phase.data,
			};
		case 'ADD_PHASE_ERROR':
			return {
				...state,
				errorMessage: action.errorMessage,
			};
		case 'ADD_TASK':
			return {
				...state,
				task: action.task.data,
			};
		case 'ADD_TASK_ERROR':
			return {
				...state,
				errorMessage: action.errorMessage,
			};
		case 'SEARCH_CONTRACTOR':
			return {
				...state,
				contractorList: action.contractorList.data.filter(
					(contractor) => ((contractor.email.indexOf(action.query) !== -1)
						|| (contractor.role.indexOf(action.query) !== -1)),
				),
			};
		case 'SEARCH_CONTRACTOR_ERROR':
			return {
				...state,
				errorMessage: action.errorMessage,
			};
		case 'ADD_CONTRACTOR':
			return {
				...state,
				assignee: action.assignee,
			};
		case 'ADD_CONTRACTOR_ERROR':
			return {
				...state,
				errorMessage: action.errorMessage,
			};
		case 'GET_PROJECT_CATEGORY':
			return {
				...state,
				projectCategories: action.projectCategories,
			};
		case 'GET_PROJECT_INFO':
			return {
				...state,
				projectInfo: action.projectInfo,
			};
		case 'GET_PROJECT_INFO_ERROR':
			return {
				...state,
				errorMessage: action.errorMessage,
			};
		case 'GET_PROJECT_BUDGET':
			return {
				...state,
				projectBudget: action.projectBudget,
			};
		case 'GET_PROJECT_BUDGET_ERROR':
			return {
				...state,
				errorMessage: action.errorMessage,
			};
		case 'GET_PROJECT_BUDGET_ITEM':
			return {
				...state,
				projectBudgetItem: action.projectBudgetItem.data,
			};
		case 'GET_PROJECT_BUDGET_ITEM_ERROR':
			return {
				...state,
				errorMessage: action.errorMessage,
			};
		case 'UPDATE_OVERALL_BUDGET':
			return {
				...state,
				excpectedFunding: action.excpectedFunding,
			};
		case 'UPDATE_OVERALL_BUDGET_ERROR':
			return {
				...state,
				errorMessage: action.errorMessage,
			};
		case 'ADD_BUDGET_ITEM':
			return {
				...state,
				budgetItem: action.budgetItem.data,
			};
		case 'ADD_BUDGET_ITEM_ERROR':
			return {
				...state,
				errorMessage: action.errorMessage,
			};
		case 'UPDATE_BUDGET_ITEM':
			return {
				...state,
				budgetItem: action.budgetItem.data,
			};
		case 'UPDATE_BUDGET_ITEM_ERROR':
			return {
				...state,
				errorMessage: action.errorMessage,
			};
		case 'GET_PROJECTS':
			return {
				...state,
				projectList: action.projectList,
			};
		case 'ADD_PROJECT':
			return {
				...state,
				project: action.project.data,
			};
		case 'ADD_PROJECT_ERROR':
			return {
				...state,
				errorMessage: action.errorMessage,
			};
		case 'UPDATE_PROJECT_SUCCESS':
			return {
				...state,
				updateProjectStatus: action.updateProjectStatus,
			};
		case 'UPDATE_PROJECT_ERROR':
			return {
				...state,
				errorMessage: action.errorMessage,
			};
		case 'ADD_WORKER_TO_PROJECT_SUCCESS':
			return {
				...state,
				workerAdded: action.workerAdded,
			};
		case 'ADD_WORKER_TO_PROJECT_ERROR':
			return {
				...state,
				errorMessage: action.errorMessage,
			};
		case 'CHANGE_STATUS':
			return {
				...state,
				status: action.status,
			};
		case 'CHANGE_STATUS_ERROR':
			return {
				...state,
				errorMessage: action.errorMessage,
			};
		default:
			return state;
	}
}
