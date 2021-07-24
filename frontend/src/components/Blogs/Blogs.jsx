/** Core packages */
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';

/** Components */
import Header from "../Layout/Header";
import Card from '../Blogs/BlogCard';

/** Redux: Action */
import { listUser, deletUser } from '../../redux/actions/BlogActions';

/** Blog component */
const Blogs = ()=> {

	const dispatch = useDispatch()

	const getBlogs = async () => {
		dispatch( listUser() )
	}

	useEffect(() => {
		getBlogs()
    })
	
	const deleteHandler= async (bid) => {
		if( window.confirm("Are you sure?") ) {
			dispatch( deletUser(bid) )
			getBlogs()
		}
	}

	return(
	    <>
			<Header />
			<div className='album py-5'>
				<div className="container">
					<div className='row'>
						<Card handler={deleteHandler}></Card>
					</div>
				</div>
			</div>
	    </>
  	);
}

export default Blogs;
