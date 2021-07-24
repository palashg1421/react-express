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
    const response = await axios.delete( url );
    dispatch({
        type: DELETE_USER,
        payload: response.data
    });
}

export const addUser = ( data ) => async( dispatch ) => {
    const url = process.env.REACT_APP_API_URL + 'blog';
    const response = await axios.post( url, data );
    dispatch({
        type: ADD_USER,
        payload: response.data
    });
}

export const editUser = ( bid, data ) => async( dispatch ) => {
    const url = process.env.REACT_APP_API_URL + `blog/${bid}`;
    const response = await axios.post( url, data );
    dispatch({
        type: EDIT_USER,
        payload: response.data
    });
}
