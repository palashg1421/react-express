/** Core packages */
import React from "react";
import { Row, Col, Form } from 'react-bootstrap';

const Filter = () => {
    return(
        <>
            <Col sm={{ span:2, offset: 10 }}>
                <div className="filter_wrapper">
                    <Form method='POST'>
                        <select name="" id="" className="form-control">
                            <option value="">Sort by</option>
                            <option value="">A to Z</option>
                            <option value="">Z to A</option>
                        </select>
                    </Form>
                </div>
            </Col>
        </>
    )
}
export default Filter