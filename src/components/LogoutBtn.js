import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../reducers/currentUserReducer';

const LogoutBtn = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleLogoutBtnClick = () => {
		dispatch(logout());
		navigate('/');
	};

	return (
		<button
			type="button"
			className="btn btn-outline-danger"
			onClick={handleLogoutBtnClick}
		>
			logout
		</button>
	);
};

export default LogoutBtn;
