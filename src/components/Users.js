import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { initUsers } from '../reducers/usersReducer';

const Users = () => {
	const dispatch = useDispatch();

	const users = useSelector((state) => state.users);

	useEffect(() => {
		dispatch(initUsers());
	}, []);

	return (
		<table className="table table-striped">
			<thead>
				<tr>
					<th></th>
					<th>blogs created</th>
				</tr>
			</thead>
			<tbody>
				{users.map((user) => (
					<tr key={user.id}>
						<td>
							<Link to={`${user.id}`}>{user.name}</Link>
						</td>
						<td>{user.blogs.length}</td>
					</tr>
				))}
			</tbody>
		</table>
	);
};

export default Users;
