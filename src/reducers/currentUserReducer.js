import loginService from '../services/login';
import blogService from '../services/blogs';
import commentService from '../services/comments';
import { setNotification } from './notificationReducer';

const reducer = (state = {}, action) => {
	switch (action.type) {
		case 'SET_CURRENT_USER':
			return action.data;
		default:
			return state;
	}
};

export const setCurrentUser = (data) => {
	return { type: 'SET_CURRENT_USER', data };
};

export const login = (credentials) => {
	return async (dispatch) => {
		try {
			const currentUser = await loginService.login(credentials);
			localStorage.setItem('currentUser', JSON.stringify(currentUser));
			blogService.setToken(currentUser.token);
			commentService.setToken(currentUser.token);
			dispatch(setCurrentUser(currentUser));
			dispatch(setNotification(`Welcome ${currentUser.name}`, 'success', 5));
		} catch (error) {
			dispatch(setNotification(error.response.data.error, 'error', 5));
		}
	};
};

export const logout = () => {
	return async (dispatch) => {
		localStorage.removeItem('currentUser');
		dispatch(setCurrentUser({}));
		dispatch(setNotification(`Logged out successfully`, 'success', 5));
	};
};

export default reducer;
