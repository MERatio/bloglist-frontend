import React, { useDispatch } from 'react-redux';
import { login } from '../reducers/userReducer';

const LoginForm = () => {
	const dispatch = useDispatch();

	const handleSubmit = (e) => {
		e.preventDefault();
		const username = e.target.username.value;
		const password = e.target.password.value;
		dispatch(login({ username, password }));
	};

	return (
		<form onSubmit={handleSubmit}>
			<div>
				<label htmlFor="username">username</label>
				<input type="text" name="username" id="username" />
			</div>
			<div>
				<label htmlFor="password">password</label>
				<input type="password" name="password" id="password" />
			</div>
			<button type="submit" data-cy="login-button">
				login
			</button>
		</form>
	);
};

export default LoginForm;
