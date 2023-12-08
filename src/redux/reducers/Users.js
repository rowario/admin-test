import {
    SHOW_LOADING,
    FETCH_USERS_SUCCEEDED,
    FETCH_USERS_REJECTED,
} from "../constants/Users";

const initState = {
    loading: false,
    data: [],
};

const users = (state = initState, action) => {
    switch (action.type) {
        case SHOW_LOADING:
            return {
                ...state,
                loading: true,
            };
        case FETCH_USERS_SUCCEEDED:
            return {
                ...state,
                loading: false,
                data: action.payload,
            };
        case FETCH_USERS_REJECTED:
            return {
                ...state,
                loading: false,
            };
        default:
            return state;
    }
};

export default users;
