import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import LogoutBtn from './LogoutBtn';
import './Navbar.css';

const Navbar = () => {
	const currentUser = useSelector((state) => state.currentUser);

	if (!currentUser) {
		return null;
	}

	return (
		<nav className="navbar">
			<Link to="/">blogs</Link>
			<Link to="/users">users</Link>
			<div>
				{currentUser.name} logged in <LogoutBtn />
			</div>
		</nav>
	);
};

export default Navbar;
