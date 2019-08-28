import axios from 'axios';

import { API_URL } from '../constants';

const getUserProjects = (uid) => {
	const params = { uid };
	return (dispatch) => {
		axios.get(`${API_URL}/users/${uid}/projects`, params)
			.then((response) => {
				dispatch({
					type: 'GET_USER_PROJECTS',
					user: response.data,
				});
			})
			.catch((error) => {
				dispatch({
					type: 'GET_USER_PROJECTS_ERROR',
					errorMessage: error,
				});
			});
	};
};

const userLogin = (email, password) => {
	const params = { email, password };
	return (dispatch) => {
		axios.post(`${API_URL}/users/auth`, params)
			.then((response) => {
				dispatch({
					type: 'USER_LOGIN',
					user: response.data,
				});
			})
			.catch((error) => {
				dispatch({
					type: 'USER_LOGIN_ERROR',
					errorMessage: error,
				});
			});
	};
};

const signUp = (user) => {
	const params = user;
	return (dispatch) => {
		axios.post(`${API_URL}/users/register`, params)
			.then((response) => {
				dispatch({
					type: 'USER_SIGN_UP',
					user: response.data,
				});
			})
			.catch((error) => {
				dispatch({
					type: 'USER_SIGN_UP_ERROR',
					errorMessage: error,
				});
			});
	};
};

const userUpdate = (uid, user) => {
	const params = user;
	return (dispatch) => {
		axios.patch(`${API_URL}/users/${uid}`, params)
			.then((response) => {
				dispatch({
					type: 'USER_UPDATE_SUCCESS',
					user: response.data,
				});
			})
			.catch((error) => {
				dispatch({
					type: 'USER_UPDATE_ERROR',
					errorMessage: error,
				});
			});
	};
};

const getUser = (uid) => {
	const params = { uid };
	return (dispatch) => {
		axios.get(`${API_URL}/users/${uid}`, params)
			.then((response) => {
				dispatch({
					type: 'GET_USER_SUCCESS',
					user: response.data,
				});
			})
			.catch((error) => {
				dispatch({
					type: 'GET_USER_ERROR',
					errorMessage: error,
				});
			});
	};
};

const getUserFiles = (uid) => {
	const params = { uid };
	return (dispatch) => {
		axios.get(`${API_URL}/users/${uid}/files`, params)
			.then((response) => {
				dispatch({
					type: 'GET_USER_FILES_SUCCESS',
					userFiles: response.data,
				});
			})
			.catch((error) => {
				dispatch({
					type: 'GET_USER_FILES_ERROR',
					errorMessage: error,
				});
			});
	};
};

export {
	userLogin, getUserProjects, signUp, userUpdate, getUser, getUserFiles,
};
