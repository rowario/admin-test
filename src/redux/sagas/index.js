import { all } from "redux-saga/effects";
import Auth from "./Auth";
import Users from "./Users";
import User from "./User";

export default function* rootSaga(getState) {
	yield all([Auth(), Users(), User()]);
}
