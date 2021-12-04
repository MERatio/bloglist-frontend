import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { setUser } from '../reducers/userReducer';

const UserView = () => {
	const dispatch = useDispatch();
	const params = useParams();

	const user = useSelector((state) => state.user);

	useEffect(() => {
		dispatch(setUser(params.userId));
	}, []);

	if (!user.id || user.id !== params.userId) {
		return null;
	}

	return (
		<div>
			<h2>{user.name}</h2>
			<h3>added blogs</h3>
			<ul>
				{user.blogs.map((blog) => (
					<li key={blog.id}>{blog.title}</li>
				))}
			</ul>
		</div>
	);
};

export default UserView;
