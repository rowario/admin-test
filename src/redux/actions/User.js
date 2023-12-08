import { SHOW_LOADING, FETCH_USER, FETCH_USER_SUCCEEDED, FETCH_USER_REJECTED } from "../constants/User";

export const fetchUser = (userId) => {
	return {
		type: FETCH_USER,
		payload: userId
	};
};

export const fetchSucceeded = (users) => {
	return {
		type: FETCH_USER_SUCCEEDED,
		payload: users,
	};
};

export const fetchRejected = (error) => {
	return {
		type: FETCH_USER_REJECTED,
		payload: error,
	};
};

export const showLoading = () => {
	return {
		type: SHOW_LOADING,
	};
};
