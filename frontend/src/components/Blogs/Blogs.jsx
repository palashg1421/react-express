/** Core packages */
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

/** Components */
import Header from "../Layout/Header";
import Card from '../Blogs/BlogCard';

/** Redux */
import { listUser, deletUser } from '../../redux/actions/BlogActions';
import { useSelector } from 'react-redux';

/** Blog component */
const Blogs = ()=> {

	const history		= useHistory();
	const dispatch 		= useDispatch()
	const usersInStore	= useSelector( (state) => { return state.BlogReducer } );

	const getBlogs 		= async () => {
		if( !usersInStore.data.length ) {
			dispatch( listUser() )
		}
	}

	useEffect(() => {
		getBlogs()
    })
	
	const deleteHandler= async (bid) => {
		if( window.confirm("Are you sure?") ) {
			await dispatch( deletUser(bid) )
			await history.push('/');
		}
	}

	return(
	    <>
			<Header />
			<div className='album py-5'>
				<div className="container">
					<div className='row'>
						<Card handler={deleteHandler} users={usersInStore}></Card>
					</div>
				</div>
			</div>
	    </>
  	);
}

export default Blogs;
