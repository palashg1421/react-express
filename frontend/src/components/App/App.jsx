/** Core packages */
import React from 'react'
import {Route, Switch, Redirect} from "react-router-dom";

/** Components */
import Login from "../Login/Login";
import Blogs from "../Blogs/Blogs";
import User from "../User/User";
import AddBlog from "../Blogs/AddBlog";

/** Return "App" component */
const App = () => {

	const PrivateRoute = ({component: Component, ...rest}) => {
		return(
			<Route
				{...rest}
				render={props => (
					localStorage.getItem('user_jwt')
					?
					<Component {...props} />
					:
					<Redirect to={{pathname:'/login', state: {from: props.location}}} />
				)}
			/>
		)
  	}

	return(
	<>
		<Switch>
			<Route path='/' component={Blogs} exact />
			<Route path='/login' component={Login} />
			<Route path='/user' component={User} />
			<PrivateRoute path='/blog/:bid?' component={AddBlog} />
			<Redirect to='/' />
		</Switch>
	</>
	);
}

export default App;
