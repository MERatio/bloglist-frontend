import userService from '../services/users';
import { setNotification } from './notificationReducer';

const reducer = (state = {}, action) => {
	switch (action.type) {
		case 'SET_USER':
			return action.data;
		default:
			return state;
	}
};

export const setUser = (userId) => {
	return async (dispatch) => {
		try {
			const user = await userService.get(userId);
			dispatch({ type: 'SET_USER', data: user });
		} catch (error) {
			dispatch(setNotification(error.response.data.error, 'error', 5));
		}
	};
};

export default reducer;
