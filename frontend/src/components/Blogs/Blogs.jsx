/** Core packages */
import React, {useEffect, useState} from 'react'

/** React bootstrap components */

/** Components */
import Header from "../Layout/Header";
import Card from '../Blogs/BlogCard';

/** Return "Blog" component */
const Blogs = ()=> {

	/** initilize the state with empty value */
	const[blogs, setBlogs] = useState({});

	useEffect(() => {
		getBlogs();
    }, [])
	
	const getBlogs = async () => {
        const request = {
            method: 'GET',
            headers: {
				'Content-Type':	'application/json',
				'Accept':		'application/json'
			}
        }
        const url = process.env.REACT_APP_API_URL + 'blog';
        const response = await fetch(url, request);
		const result = await response.json();
		setBlogs(result);
 	}

	const deleteHandler= async (bid) => {
		if( window.confirm("Are you sure?") )
		{
			const request = {
			    method: 'DELETE',
			    headers: {
					'Content-Type':	'application/json',
					'Accept':		'application/json',
					'Authorization': localStorage.getItem('user_jwt'),
				}
			}
			const url = process.env.REACT_APP_API_URL + `blog/${bid}`;
			const response = await fetch(url, request);
			await response.json();
			getBlogs()
		}
	}

	const listGenerator = (value, index, array) => {
		return( <Card data={value} handler={deleteHandler}></Card> );
	}

	const noData = () => {
		return(
			<div className="col-sm-12 text-center">
				<div className="alert alert-danger">
					{blogs.message}
				</div>
			</div>
		);	
	};

	return(
	    <>
			<Header />
			<div className='album py-5'>
				<div className="container">
					<div className='row'>
						{blogs.status ? blogs.data.map(listGenerator) : noData()}
					</div>
				</div>
			</div>
	    </>
  	);
}

export default Blogs;
