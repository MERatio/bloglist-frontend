const LoginForm = ({
	username,
	password,
	setUsername,
	setPassword,
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
				onChange={({ target }) => setUsername(target.value)}
			/>
		</div>
		<div>
			<label htmlFor="password">password</label>
			<input
				type="password"
				value={password}
				name="password"
				id="password"
				onChange={({ target }) => setPassword(target.value)}
			/>
		</div>
		<button type="submit">login</button>
	</form>
);

export default LoginForm;
