import { combineReducers } from 'redux';
import Auth from './Auth';
import Theme from './Theme';
import Users from './Users';
import User from './User';

const reducers = combineReducers({
    theme: Theme,
    auth: Auth,
	users: Users,
	user: User,
});

export default reducers;
