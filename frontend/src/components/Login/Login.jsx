/** Core packages */
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

/** React bootstrap components */
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

/** Components */

/** Return "App" component */
const Login = () => {

    const history = useHistory();

    /** From management & validation using react-hook-form */
    const { register, handleSubmit, errors } = useForm();
    
    /** From submit handler */
    const onSubmit = async data => {
        const request = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept':       'application/json'
            },
            body: JSON.stringify(data)
        }
        const url = process.env.REACT_APP_API_URL + 'auth/login';
        const response = await fetch(url, request);
        const result = await response.json();

        if( result.status )
            localStorage.setItem('user_jwt', result.data);
        else
            toast.error(result.message);
    };

    useEffect(() => {
        // localStorage.getItem('user_jwt');
        const checkLogin = localStorage.getItem('user_jwt');
        if( checkLogin )
            history.push('/');
    })

    return(
        <>
            <Container>
                <Row className="v-center">
                    <Col sm={4}>
                        <div className="form-wrapper login-form">

                            <Form onSubmit={handleSubmit(onSubmit)}>
                                <Form.Group>
                                    <Form.Label htmlFor='email'>Email:</Form.Label>
                                    <Form.Control type='text' id='email' name='email' ref={register({required: 'Email is required'})}></Form.Control>
                                    {errors.email && <span className="text-danger error">{errors.email.message}</span>}
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label htmlFor='password'>Password:</Form.Label>
                                    <Form.Control type='password' id='password' name='password' ref={register({required: 'Password is required'})}></Form.Control>
                                    {errors.password && <span className="text-danger error">{errors.password.message}</span>}
                                </Form.Group>
                                <Form.Group>
                                    <Button variant='info' type='submit' className='btn-block'>Login</Button>
                                </Form.Group>
                            </Form>

                            <div className="login-footer text-center">
                                <Link to='/'>
                                    &larr; Back to home
                                </Link>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default Login;
