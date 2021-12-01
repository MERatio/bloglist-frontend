import loginService from '../services/login';
import blogService from '../services/blogs';
import { setNotification } from './notificationReducer';

const reducer = (state = {}, action) => {
	switch (action.type) {
		case 'SET_USER':
			return action.data;
		default:
			return state;
	}
};

export const setUser = (data) => {
	return { type: 'SET_USER', data };
};

export const login = (credentials) => {
	return async (dispatch) => {
		try {
			const user = await loginService.login(credentials);
			localStorage.setItem('user', JSON.stringify(user));
			blogService.setToken(user.token);
			dispatch(setUser(user));
			dispatch(setNotification(`Welcome ${user.name}`, 'success', 5));
		} catch (error) {
			dispatch(setNotification(error.response.data.error, 'error', 5));
		}
	};
};

export const logout = () => {
	return async (dispatch) => {
		localStorage.removeItem('user');
		dispatch(setUser({}));
		dispatch(setNotification(`Logged out successfully`, 'success', 5));
	};
};

export default reducer;
