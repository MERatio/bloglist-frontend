import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../reducers/userReducer';

const LogoutBtn = () => {
	const dispatch = useDispatch();

	const handleLogoutBtnClick = () => {
		dispatch(logout());
	};

	return (
		<button type="button" onClick={handleLogoutBtnClick}>
			logout
		</button>
	);
};

export default LogoutBtn;
