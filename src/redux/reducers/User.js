import { SHOW_LOADING, FETCH_USER_SUCCEEDED, FETCH_USER_REJECTED } from "../constants/User";

const initState = {
	loading: false,
	loaded: false,
	data: null,
};

const user = (state = initState, action) => {
	switch (action.type) {
		case SHOW_LOADING:
			return {
				...state,
				loading: true,
			};
		case FETCH_USER_SUCCEEDED:
			return {
				...state,
				loading: false,
				loaded: true,
				data: action.payload,
			};
		case FETCH_USER_REJECTED:
			return {
				...state,
				loading: false,
			};
		default:
			return state;
	}
};

export default user;
