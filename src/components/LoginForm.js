import React from 'react';
import PropTypes from 'prop-types';

const LoginForm = ({
	username,
	password,
	onUsernameChange,
	onPasswordChange,
	onSubmit,
}) => (
	<form onSubmit={onSubmit}>
		<div>
			<label htmlFor="username">username</label>
			<input
				type="text"
				value={username}
				name="username"
				id="username"
				onChange={({ target }) => onUsernameChange(target.value)}
			/>
		</div>
		<div>
			<label htmlFor="password">password</label>
			<input
				type="password"
				value={password}
				name="password"
				id="password"
				onChange={({ target }) => onPasswordChange(target.value)}
			/>
		</div>
		<button type="submit" data-cy="login-button">
			login
		</button>
	</form>
);

LoginForm.propTypes = {
	username: PropTypes.string.isRequired,
	password: PropTypes.string.isRequired,
	onUsernameChange: PropTypes.func.isRequired,
	onPasswordChange: PropTypes.func.isRequired,
	onSubmit: PropTypes.func.isRequired,
};

export default LoginForm;
