import { ADD_ITEM, IMPORT_ITEMS, DELETE_ITEM, DELETE_ALL_ITEMS, SELECT_ITEM, MOVE_ITEM } from "../constants/Board";

export const addItem = (item) => {
	return {
		type: ADD_ITEM,
		payload: item,
	};
};

export const importItems = (items) => {
	return {
		type: IMPORT_ITEMS,
		payload: items,
	};
};

export const deleteItem = (itemId) => {
	return {
		type: DELETE_ITEM,
		payload: itemId,
	};
};

export const deleteAllItems = () => {
	return {
		type: DELETE_ALL_ITEMS,
	};
};

export const selectItem = (item) => {
	return {
		type: SELECT_ITEM,
		payload: item,
	};
};

export const moveItem = (item) => {
	return {
		type: MOVE_ITEM,
		payload: item,
	};
};
