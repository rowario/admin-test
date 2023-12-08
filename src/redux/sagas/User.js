import { all, takeEvery, put, fork, call } from "redux-saga/effects";
import { FETCH_USER } from "../constants/User";

import JsonPlaceholderService from "services/JsonPlaceholderService";
import { fetchRejected, fetchSucceeded } from "../actions/User";

export function* fetchUser() {
	yield takeEvery(FETCH_USER, function* ({ payload }) {
		try {
			const user = yield call(JsonPlaceholderService.getUser, payload);
			yield put(fetchSucceeded(user));
		} catch (err) {
			yield put(fetchRejected(err));
		}
	});
}

export default function* rootSaga() {
	yield all([fork(fetchUser)]);
}
