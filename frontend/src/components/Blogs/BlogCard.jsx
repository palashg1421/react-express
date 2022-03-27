/** Core packages */
import React from 'react'
import { Link } from 'react-router-dom';
import { Col } from 'react-bootstrap';

/** Custom modules */
import { DateFormat } from '../Util/Util';

const BlogCard = (props) => {

    const deleteHandler = props.handler;
    const response      = props.users;

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

    const strpiContent = ( content, limit ) => {
        const length    = content.length;
        if( length > limit ) {
            return content.substring(0, limit) + '...';
        } else {
            return content;
        }
    }

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
                        <h4>
                            { value.title ? strpiContent( value.title, 27) : '' }
                        </h4>
                        <p className="card-text">
                            { value.content ? strpiContent( value.content, 300 ) : '' }
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
    
    const noData = () => {
		return(
			<div className="col-sm-12 text-center">
				<div className="alert alert-danger">
					{response.message}
				</div>
			</div>
		);	
	};

    return(
        <>{ response.status ? response.data.map(listGenerator) : noData() }</>
    );
}
export default BlogCard;