/** Core packages */
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

/** Components */
import Header from '../Layout/Header';
import Card from '../Blogs/BlogCard';
import Search from '../Blogs/Search';
import Filter from '../Blogs/Filter';

/** Redux */
import { listUser, deletUser } from '../../redux/actions/BlogActions';
import { useSelector } from 'react-redux';

/** Blog component */
const Blogs = () => {

	const history		= useHistory();
	const dispatch 		= useDispatch()
	const usersInStore	= useSelector( ( state ) => { return state.BlogReducer } );
	
	const [ criteria, setCriteria ] = useState({});
	
	const getBlogs 		= async () => {
		if( !usersInStore.data.length ) {
			dispatch( listUser() )
		}
	}

	useEffect( () => {
		getBlogs()
    }, [] )
	
	const deleteHandler = async ( bid ) => {
		if( window.confirm( "Are you sure?" ) ) {
			await dispatch( deletUser( bid ) )
			await history.push( '/' );
		}
	}

	const handleSearch = ( data ) => {
		setCriteria( data );
	}

	return(
	    <>
			<Header />
			<div className='album py-5'>
				<Container>
					<Row>
						<Col sm={3} className='content-search'>
							<Search handler={handleSearch} />
						</Col>
						<Col sm={9} className='content-body' >
							{/* <Row><Filter /></Row> */}
							<Row><Card handler={deleteHandler} users={usersInStore} criteria={criteria}></Card></Row>
						</Col>
					</Row>
				</Container>
			</div>
	    </>
  	);
}

export default Blogs;
