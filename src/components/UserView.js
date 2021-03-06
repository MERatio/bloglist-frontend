import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const UserView = () => {
	const params = useParams();

	const user = useSelector((state) =>
		state.users.find((user) => user.id === params.userId)
	);

	if (!user) {
		return null;
	}

	return (
		<div>
			<h2>{user.name}</h2>
			<h3>added blogs</h3>
			<ul className="list-group">
				{user.blogs.map((blog) => (
					<li key={blog.id} className="list-group-item">
						{blog.title}
					</li>
				))}
			</ul>
		</div>
	);
};

export default UserView;
