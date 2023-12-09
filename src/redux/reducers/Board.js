import { ADD_ITEM, IMPORT_ITEMS, DELETE_ITEM, DELETE_ALL_ITEMS, SELECT_ITEM, MOVE_ITEM } from "../constants/Board";

const initState = {
	selectedItem: null,
	items: [],
};

const board = (state = initState, action) => {
	switch (action.type) {
		case ADD_ITEM:
			return {
				...state,
				items: [...state.items, action.payload],
			};
		case IMPORT_ITEMS:
			return {
				selectedItem: null,
				items: action.payload,
			};
		case DELETE_ITEM:
			return {
				...state,
				items: state.items.filter((item) => item.id !== action.payload),
			};
		case DELETE_ALL_ITEMS:
			return {
				...state,
				items: [],
			};
		case SELECT_ITEM:
			return {
				...state,
				selectedItem: action.payload,
			};
		case MOVE_ITEM:
			const { id, x, y } = action.payload;
			return {
				...state,
				items: state.items.map((item) => {
					if (item.id === id) {
						item.x = x;
						item.y = y;
					}
					return item;
				}),
			};
		default:
			return state;
	}
};

export default board;
