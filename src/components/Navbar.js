import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import LogoutBtn from './LogoutBtn';

const Navbar = () => {
	const currentUser = useSelector((state) => state.currentUser);

	if (!currentUser) {
		return null;
	}

	return (
		<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
			<div className="container-fluid">
				<button
					className="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarSupportedContent"
					aria-controls="navbarSupportedContent"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarSupportedContent">
					<ul className="navbar-nav me-auto mb-2 mb-lg-0">
						<li className="nav-item">
							<Link to="/" className="nav-link">
								blogs
							</Link>
						</li>
						<li className="nav-item">
							<Link to="/users" className="nav-link">
								users
							</Link>
						</li>
					</ul>
				</div>
				<div className="ms-lg-auto">
					<span className="text-light me-2">
						<span className="text-primary">{currentUser.name}</span> logged in{' '}
					</span>
					<LogoutBtn />
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
