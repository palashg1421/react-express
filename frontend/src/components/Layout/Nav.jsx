/** Core packages */
import React from 'react';
import { Link, useHistory } from 'react-router-dom';

/** Return "Nav" component */
const Nav = () => {

	const history = useHistory();

	const doLogout = () => {
		localStorage.removeItem('user_jwt');
		history.push('/login');
	}

	if(localStorage.getItem("user_jwt"))
	{
	return(
		<>
		<nav className="navbar navbar-expand-sm">
			<ul className="navbar-nav">
				<li className="nav-item"><Link to="/blog" className="nav-link">Add Blog</Link></li>
				<li className="nav-item"><Link to="#!" className='nav-link' onClick={doLogout}>Logout</Link></li>
			</ul>
			</nav>
		</>
	);
	}
	else
	{
	return(
		<>
		<nav className="navbar navbar-expand-sm">
			<ul className="navbar-nav">
				<li className="nav-item"><Link to="/login" className="nav-link">Login</Link></li>
			</ul>
			</nav>
		</>
	);
	}
}
export default Nav;
