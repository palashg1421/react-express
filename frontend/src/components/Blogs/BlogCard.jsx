/** Core packages */
import React from 'react'
import { Link } from 'react-router-dom';
import { Col } from 'react-bootstrap';

const BlogCard = (props) => {
    const data = props.data;
    const deleteHandler = props.handler;

    const date = new Date(data.createdAt);
    const finalDate = date.getDate() + '-' + (date.getMonth()+1) +'-' + date.getFullYear();
		
    return(
        <>
            <Col md={4} key={data.index}>
                <div className="card mb-4 box-shadow">
                    <img className="card-img-top" src={process.env.REACT_APP_API_URL + data.thumbnail} alt="blog-view" />
                        <div className="card-body">
                            <h4>{data.title}</h4>
                            <p className="card-text">{data.content}</p>
                            <div className="d-flex justify-content-between align-items-center">
                                {
                                    localStorage.getItem("user_jwt") ? (
                                        <div className="btn-group">
                                            <Link className='btn btn-sm btn-outline-secondary' to={`/blog/${data._id}`}>Edit</Link>
                                            <Link className='btn btn-sm btn-outline-secondary' to='#!' onClick={ () => deleteHandler(data._id)}>Delete</Link>
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
export default BlogCard;