import userService from '../services/users';
import { setNotification } from './notificationReducer';

const reducer = (state = [], action) => {
	switch (action.type) {
		case 'INIT_USERS':
			return action.data;
		default:
			return state;
	}
};

export const initUsers = () => {
	return async (dispatch) => {
		try {
			const users = await userService.getAll();
			dispatch({ type: 'INIT_USERS', data: users });
		} catch (error) {
			dispatch(setNotification(error.response.data.error, 'error', 5));
		}
	};
};

export default reducer;
