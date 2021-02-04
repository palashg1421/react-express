/** Core packages */
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { Link, useHistory } from 'react-router-dom';

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
            alert(result.message);
    };

    useEffect(() => {
        const checkLogin = localStorage.getItem('user_jwt');
        if( checkLogin )
            history.push('/'); 
    })

    return(
        <>
            <div className="container">
                <div className='row v-center'>
                    <div className="col-sm-4">
                        <div className="form-wrapper login-form">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="form-group">
                                    <label htmlFor="email">Email:</label>
                                    <input
                                        type="text"
                                        id="email"
                                        name="email"
                                        className="form-control"
                                        autoComplete="off"
                                        autoFocus
                                        ref={register({
                                            required: 'Email address is required'
                                        })}
                                    />
                                    {errors.email && <span className="text-danger error">{errors.email.message}</span>}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Password:</label>
                                    <input
                                        type="password"
                                        id="password"
                                        name="password"
                                        className="form-control"
                                        ref={register({
                                            required: "Password is required",
                                            minLength: {
                                                value: 7,
                                                message: "password must be at least 7 digits long"
                                            }
                                        })}
                                    />
                                    {errors.password && <span className="text-danger error">{errors.password.message}</span>}
                                </div>
                                <div className="form-group">
                                    <button type="submit" className="btn btn-info btn-block">Login</button>
                                </div>
                            </form>
                            <div className="login-footer text-center">
                                <Link to='/'>
                                    &larr; Back to home
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;
