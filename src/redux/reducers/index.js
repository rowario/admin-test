import { combineReducers } from 'redux';
import Auth from './Auth';
import Theme from './Theme';
import Users from './Users';
import User from './User';
import Board from './Board';

const reducers = combineReducers({
    theme: Theme,
    auth: Auth,
	users: Users,
	user: User,
	board: Board
});

export default reducers;
