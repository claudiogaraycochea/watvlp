import axios from 'axios';

export const ContentTypes = {
	json: 'application/json',
	formData: 'multiplart/form-data',
};

const API_URL = 'https://weband.tv/instant/api/v1';

// More info: https://github.com/axios/axios
export function request(method, endpoint, data = {}, headers = { 'content-type': ContentTypes.json }, other) {
	const url = `${API_URL}${endpoint}`;
	const options = {
		method,
		url,
		data,
		headers,
		...other,
	};
	return axios(options);
}
