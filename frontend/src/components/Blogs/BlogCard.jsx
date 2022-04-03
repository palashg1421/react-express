/** Core packages */
import React from 'react'
import { Link } from 'react-router-dom';
import { Col } from 'react-bootstrap';

/** Custom modules */
import { DateFormat, isEmpty } from '../Util/Util';

const BlogCard = (props) => {

    const criteria      = props.criteria;
    const deleteHandler = props.handler;
    const response      = props.users;

    const strpiContent = ( content, limit ) => {
        const length    = content.length;
        if( length > limit ) {
            return content.substring(0, limit) + '...';
        } else {
            return content;
        }
    }

    const controlActions = (value) => {
        return(
            <div className="btn-group">
                <Link className='btn btn-sm btn-outline-secondary' to={`/blog/${value._id}`}>
                    Edit
                </Link>
                <Link className='btn btn-sm btn-outline-secondary' to='' onClick={ () => deleteHandler(value._id)}>
                    Delete
                </Link>
            </div>
        );
    };

    const listGenerator = (value, index, array) => {
        return(
            <Col md={4} key={value._id}>
                <div className="card mb-4 box-shadow">
                    <img
                        className="card-img-top"
                        src={process.env.REACT_APP_API_URL + value.thumbnail}
                        alt="blog-view"
                    />
                    <div className="card-body">
                        <h4>{ value.title ? strpiContent( value.title, 17) : '' }</h4>
                        <p className="card-text">
                            { value.content ? strpiContent( value.content, 100 ) : '' }
                        </p>
                        <div className="d-flex justify-content-between align-items-center">
                            { localStorage.getItem("user_jwt") ? controlActions(value) : '' }
                            <small className="text-muted">
                                { DateFormat( value.createdAt ) }
                            </small>
                        </div>
                    </div>
                </div>
            </Col>
        );
	}
    
    const noData = ( message = '' ) => {
		return(
			<div className="col-sm-12 text-center">
				<div className="alert alert-danger">
					{message || response.message}
				</div>
			</div>
		);	
	};

    const prepare = ( data, criteria ) => {
        
        if( isEmpty( criteria ) ) {
            return data ? data.map( listGenerator ) : noData()
        } else {
            const filter_data = data.filter( ( item ) => {
                let regx_title      = new RegExp( criteria.title, 'i' );
                let regx_content    = new RegExp( criteria.content, 'i' );

                if( item.content.match( regx_content ) !== null && item.title.match( regx_title ) !== null ) {
                    return item
                }
            } )
            return filter_data ? filter_data.map( listGenerator ) : noData( 'No Data found' )
            // console.log( filter_data );
        }
    }

    return(
        <>
            {/* { response.status ? response.data.map(listGenerator) : noData() } */}
            { prepare( response.data, criteria ) }
        </>
    );
}
export default BlogCard;