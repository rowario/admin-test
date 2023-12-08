import {
    SHOW_LOADING,
    FETCH_USERS,
    FETCH_USERS_SUCCEEDED,
    FETCH_USERS_REJECTED,
} from "../constants/Users";

export const fetchUsers = () => {
    return {
        type: FETCH_USERS,
    };
};

export const fetchSucceeded = (users) => {
    return {
        type: FETCH_USERS_SUCCEEDED,
        payload: users,
    };
};

export const fetchRejected = (error) => {
    return {
        type: FETCH_USERS_REJECTED,
        payload: error,
    };
};

export const showLoading = () => {
    return {
        type: SHOW_LOADING,
    };
};
