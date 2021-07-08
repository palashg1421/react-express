/** Core packages */
import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom';

/** React bootstrap components */
import { Col } from 'react-bootstrap';

/** Components */
import Header from "../Layout/Header";

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
		const date = new Date(value.createdAt);
		const finalDate = date.getDate() + '-' + (date.getMonth()+1) +'-' + date.getFullYear();
		return(
			<>
				<Col md={4} key={index}>
					<div className="card mb-4 box-shadow">
						<img className="card-img-top" src={process.env.REACT_APP_API_URL + value.thumbnail} alt="blog-view" />
							<div className="card-body">
								<h4>{value.title}</h4>
								<p className="card-text">{value.content}</p>
								<div className="d-flex justify-content-between align-items-center">
									{
										localStorage.getItem("user_jwt") ? (
											<div className="btn-group">
												<Link className='btn btn-sm btn-outline-secondary' to={`/blog/${value._id}`}>Edit</Link>
												<Link className='btn btn-sm btn-outline-secondary' to='#!' onClick={ () => deleteHandler(value._id)}>Delete</Link>
											</div>
										) : ''
									}
								<small className="text-muted">
									{finalDate}
								</small>
							</div>
						</div>
					</div>
				</Col>
			</>
		);
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
