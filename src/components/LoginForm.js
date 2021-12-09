import React, { useDispatch } from 'react-redux';
import { login } from '../reducers/currentUserReducer';

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
			<div className="mb-3">
				<label htmlFor="username" className="form-label">
					username
				</label>
				<input
					type="text"
					name="username"
					className="form-control"
					id="username"
				/>
			</div>
			<div className="mb-3">
				<label htmlFor="password" className="form-label">
					password
				</label>
				<input
					type="password"
					name="password"
					className="form-control"
					id="password"
				/>
			</div>
			<button type="submit" className="btn btn-primary" data-cy="login-button">
				login
			</button>
		</form>
	);
};

export default LoginForm;
