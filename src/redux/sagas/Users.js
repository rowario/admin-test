import { all, takeEvery, put, fork, call } from "redux-saga/effects";
import { FETCH_USERS } from "../constants/Users";

import JsonPlaceholderService from "services/JsonPlaceholderService";
import { fetchRejected, fetchSucceeded } from "../actions/Users";

export function* fetchUsers() {
    yield takeEvery(FETCH_USERS, function* () {
        try {
            const users = yield call(JsonPlaceholderService.getUsers);
            yield put(fetchSucceeded(users));
        } catch (err) {
            yield put(fetchRejected(err));
        }
    });
}

export default function* rootSaga() {
    yield all([fork(fetchUsers)]);
}
