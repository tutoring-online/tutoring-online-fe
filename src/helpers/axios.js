import axios from 'axios';
import { getFirebaseToken } from 'firebase-config/firebase';
import queryString from 'query-string';
import { ENV_DOMAIN } from './api';

const axiosClient = axios.create({
	baseURL: ENV_DOMAIN,
	headers: {
		'content-type': 'application/json',
	},
	paramsSerializer: params => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (config) => {
	const token = await getFirebaseToken();
	if (token) {
		config.headers.Authorization = token;
	}

	return config;
});

axiosClient.interceptors.response.use((response) => {
	if (response && response.data) {
		return response.data;
	}

	return response;
}, (error) => {
	// Handle errors
	throw error;
});

export default axiosClient;

const urlWithParams = (url, params) => {
	const newUrl = new URL(ENV_DOMAIN + url);
	if (params) {
		newUrl.search = new URLSearchParams(params).toString();
	}
	return newUrl;
}

const isAxiosError = (errorName) => {
	return errorName != null && errorName === "AxiosError";
}

const isResponseError = (response) => {
	return isAxiosError(response?.name);
}

export const axiosRequest = async (url, options = {}, params = {}) => {
	const preparedUrl = urlWithParams(url, params);
	const config = {
		url: preparedUrl,
		...(options || {})
	}

	try {
		const response = await axiosClient(config);

		if (isResponseError(response)) {
			throw new Error(response.message);
		}

		return response;
	} catch (error) {
		console.log(error);
		throw error
	}

}
