import axios from 'axios';
import queryString from 'query-string';
import firebase from 'firebase';
import { ENV_DOMAIN } from './api';
import toastr from 'toastr';

const getFirebaseToken = async () => {
	const currentUser = firebase.auth().currentUser;
	if (currentUser) return currentUser.getIdToken();

	const hasRememberedAccount = localStorage.getItem('firebaseui::rememberedAccounts');
	if (!hasRememberedAccount) return null;

	return new Promise((resolve, reject) => {
		const waitTimer = setTimeout(() => {
			reject(null);
			console.log('Reject timeout');
		}, 2000);

		const unregisterAuthObserver = firebase.auth().onAuthStateChanged(async (user) => {
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
		config.headers.Authorization = `Bearer ${token}`;
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


const SUCCESSFUL_CODE = 200;

export const axiosRequest = async (url, options = {}, params = {}) => {
	const newUrl = new URL(url);
	if (params) {
		newUrl.search = new URLSearchParams(params).toString();
	}

	try {
		const response = await axiosClient({ url: newUrl, ...(options || {}) });
		console.log(response);

		if (response.status !== SUCCESSFUL_CODE) {
			//Do something here
			throw response.data;
		}

		return response.data;
	} catch (error) {
		if (error.response) {
			toastr.error(error.response.data);
			toastr.error(error.response.status);
			toastr.error(error.response.headers);
		} else if (error.request) {
			toastr.error(error.request);
		} else {
			toastr.error('Error', error.message);
		}
		toastr.error(error.config);
		throw error
	}

}
