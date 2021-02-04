/** Core packages */
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { useHistory, useParams } from 'react-router-dom';

/** Components */
import Header from "../Layout/Header";

/** Return "Blog" component */
const AddBlog = () => {

	const {bid}											= useParams();
	const history										= useHistory();
	const { register, handleSubmit, errors, setValue }	= useForm();

	/** From submit handler */
	const onSubmit = async (data) =>
	{
		let fd = new FormData();
		fd.append("title", data.title);
		fd.append("content", data.content);
		fd.append("thumbnail", data.thumbnail[0]);

		const request = {
			method:	'POST',
			body:	fd,
			headers: {
				'Authorization': localStorage.getItem('user_jwt'),
			}

		}

		let url = process.env.REACT_APP_API_URL + 'blog';
		if (bid)
			url = process.env.REACT_APP_API_URL + `blog/${bid}`;

		const response = await fetch(url, request);
		// const result = await response.json();
		// if( result.status )
		// 	history.push('/');
		// else
		// 	console.log(result.message);
	}

	useEffect( () => {
		if(bid)
			getBlogById(bid);
		else
		{
			setValue('title', '');
			setValue('content', '');
		}
	}, [])

	/** If blog id is available, then fetch record and allow to edit */
	const getBlogById = async (bid) =>
	{
		const request = {
            method: 'GET',
            headers: {
				'Content-Type':	'application/json',
			}
		}
		const url = process.env.REACT_APP_API_URL + `blog/${bid}`;
		const response = await fetch(url, request);
		const result = await response.json();
		setValue('title', result.data.title);
		setValue('content', result.data.content);
	}
	
	return(
		<>
      		<Header />
			<div className="container">
				<div className='row'>
					<div className="col-sm-8 offset-sm-2">

						<section className="form-section">
							<h2>{ bid ? 'Edit Blog' : 'Add Blog' }</h2>
							<form onSubmit={handleSubmit(onSubmit)}>
								<div className="row">
									<div className="col-sm-6">
										<div className="form-group">
											<label htmlFor="title">Title</label>
											<input
												type="text"
												id="title"
												name="title"
												className="form-control"
												autoComplete="off"
												ref={register({
													required: 'Blog title is required'
												})}
											/>
											{errors.title && <span className="text-danger error">{errors.title.message}</span>}
										</div>
									</div>
									<div className="col-sm-6">
										<div className="form-group">
											<label htmlFor="thumbnail">Image</label>
											<input
												type="file"
												id="thumbnail"
												name="thumbnail"
												className="form-control"
												ref={register}
											/>
										</div>
									</div>
								</div>

								<div className="form-group">
									<label htmlFor="content">Content</label>
									<textarea
										id="content"
										name="content"
										className="form-control"
										rows="5"
										ref={register({
											required: 'Content is required'
										})}
									/>
									{errors.content && <span className="text-danger error">{errors.content.message}</span>}
								</div>

								<button type='submit' className="btn btn-info">
									{ bid ? 'Update' : "Save" }
								</button>
							</form>
						</section>

					</div>
				</div>
			</div>
    	</>
	);
}

export default AddBlog;
