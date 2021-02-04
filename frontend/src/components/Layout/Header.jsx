/** Core packages */
import React from 'react'
import {Link} from "react-router-dom";

/** Components */
import Nav from './Nav';

/** Return "Header" component */
const Header = () => {
	return(
		<>
			<header>
				<div className="navbar navbar-dark bg-dark box-shadow">
					<div className="container d-flex justify-content-between">
						<Link to="/" className="navbar-brand d-flex align-items-center">
							<strong>My Blogs</strong>
						</Link>
						<Nav />
					</div>
				</div>
			</header>
		</>
	);
}

export default Header;
