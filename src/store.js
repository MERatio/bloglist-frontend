import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import currentUserReducer from './reducers/currentUserReducer';
import usersReducer from './reducers/usersReducer';
import userReducer from './reducers/userReducer';
import blogsReducer from './reducers/blogsReducer';
import notificationReducer from './reducers/notificationReducer';

const reducer = combineReducers({
	currentUser: currentUserReducer,
	users: usersReducer,
	user: userReducer,
	blogs: blogsReducer,
	notification: notificationReducer,
});

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
