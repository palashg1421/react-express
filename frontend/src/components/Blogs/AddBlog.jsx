/** Core packages */
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { useHistory, useParams } from 'react-router-dom';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';

/** Components */
import Header from "../Layout/Header";

/** Actions */
import { addUser, editUser } from '../../redux/actions/BlogActions';

/** Return "Blog" component */
const AddBlog = () => {

	const {bid}											= useParams();
	const history										= useHistory();
	const { register, handleSubmit, errors, setValue }	= useForm();
	const dispatch 										= useDispatch()

	/** From submit handler */
	const onSubmit = async (data) => {
		let fd = new FormData();
		fd.append("title", data.title);
		fd.append("content", data.content);
		fd.append("thumbnail", data.thumbnail[0]);

		if( bid ) {
			fd.append( "_id", bid );
			await dispatch( editUser( fd ) );
			await history.push('/');
		} else {
			await dispatch( addUser(fd) );
			await history.push('/');
		}
	}
	useEffect( () => {
		if(bid)
			getBlogById(bid);
		else
		{
			setValue('title', '');
			setValue('content', '');
		}
	})

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
			<Container>
				<Row>
					<Col sm={{span: 8, offset: 2}}>
						<section className="form-section">
							<h2>{ bid ? 'Edit Blog' : 'Add Blog' }</h2>
							
							<Form onSubmit={handleSubmit(onSubmit)}>
								<Row>
									<Col sm={6}>
										<Form.Group>
											<Form.Label htmlFor='title'>Title</Form.Label>
											<Form.Control
												type='text'
												id='title'
												name='title'
												ref={register({
													required: "Blog title is required"
												})}
											/>
											{errors.title && <span className="text-danger error">{errors.title.message}</span>}
										</Form.Group>
									</Col>
									<Col sm={6}>
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
									</Col>
								</Row>
	
								<Form.Group>
									<Form.Label htmlFor='content'>Content</Form.Label>
									<Form.Control
										as='textarea'
										name='content'
										id='content'
										rows='5'
										ref={register({
											required: 'Content is required'
										})}
									/>
									{errors.content && <span className="text-danger error">{errors.content.message}</span>}
								</Form.Group>

								<Button variant='info' type='submit'>
									{ bid ? 'Update' : "Save" }
								</Button>
							</Form>

						</section>
					</Col>
				</Row>
			</Container>
    	</>
	);
}

export default AddBlog;
