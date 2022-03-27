import { LIST_USER, DELETE_USER, ADD_USER, EDIT_USER } from '../constants';

import axios from 'axios';

export const listUser = () => async( dispatch ) => {
    const url = process.env.REACT_APP_API_URL + 'blog';
    const response = await axios.get( url );
    dispatch({
        type: LIST_USER,
        payload: response.data
    });
}

export const deletUser = ( blog_id ) => async( dispatch ) => {
    const url = process.env.REACT_APP_API_URL + `blog/${blog_id}`;
    await axios.delete( url );
    dispatch({
        type: DELETE_USER,
        payload: blog_id
    });
}

export const addUser = ( data ) => async( dispatch ) => {
    const url = process.env.REACT_APP_API_URL + 'blog';
    const response = await axios.post( url, data );
    dispatch({
        type: ADD_USER,
        payload: response.data.data
    });
}

export const editUser = ( blog_data ) => async( dispatch ) => {
    let data = {};
    blog_data.forEach( ( value, key ) => data[key] = value );

    const url = process.env.REACT_APP_API_URL + `blog/${data._id}`;
    const response = await axios.post( url, data );
    dispatch({
        type: EDIT_USER,
        payload: data,
    });
}
