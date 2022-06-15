import axios from 'axios';
import queryString from 'query-string';
import { auth } from 'firebase-config/firebase';
import { ENV_DOMAIN } from './api';

const getFirebaseToken = async () => {
	const currentUser = auth().currentUser;
	if (currentUser) return currentUser.getIdToken();

	const hasRememberedAccount = localStorage.getItem('firebaseui::rememberedAccounts');
	if (!hasRememberedAccount) return null;

	return new Promise((resolve, reject) => {
		const waitTimer = setTimeout(() => {
			reject(null);
			console.log('Reject timeout');
		}, 2000);

		const unregisterAuthObserver = auth().onAuthStateChanged(async (user) => {
			if (!user) {
				reject(null);
			}

			const token = await user.getIdToken();
			console.log('[AXIOS] Logged in user token: ', token);
			resolve(token);

			unregisterAuthObserver();
			clearTimeout(waitTimer);
		});
	});
}

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
