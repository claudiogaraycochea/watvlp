const initialState = {
	user: {},
	profile_picture: {},
	projects: [],
	userFiles: {},
	errorMessage: null,
};

export default function user(state = initialState, action) {
	switch (action.type) {
		case 'USER_LOGIN':
			return {
				...state,
				token: action.user.data.token,
				data: action.user.data.user,
				errorMessage: null,
			};
		case 'USER_LOGIN_ERROR':
			return {
				...state,
				errorMessage: action.errorMessage,
			};
		case 'GET_USER_PROJECTS':
			return {
				...state,
				projects: action.user.data.projects,
			};
		case 'GET_USER_PROJECTS_ERROR':
			return {
				...state,
				errorMessage: action.errorMessage,
			};
		case 'USER_SIGN_UP':
			return {
				...state,
				user: action.user.data,
				errorMessage: null,
			};
		case 'USER_SIGN_UP_ERROR':
			return {
				...state,
				errorMessage: action.errorMessage,
			};
		case 'USER_UPDATE_SUCCESS':
			return {
				...state,
				user: action.user.data,
				errorMessage: null,
			};
		case 'USER_UPDATE_ERROR':
			return {
				...state,
				errorMessage: action.errorMessage,
			};
		case 'GET_USER_SUCCESS':
			return {
				...state,
				user: action.user.data,
				profile_picture: action.user.profile_picture,
			};
		case 'GET_USER_ERROR':
			return {
				...state,
				errorMessage: action.errorMessage,
			};
		case 'GET_USER_FILES_SUCCESS':
			return {
				...state,
				userFiles: action.userFiles,
			};
		case 'GET_USER_FILES_ERROR':
			return {
				...state,
				errorMessage: action.errorMessage,
			};
		default:
			return state;
	}
}
