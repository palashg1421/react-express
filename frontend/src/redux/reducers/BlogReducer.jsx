import { LIST_USER, DELETE_USER, ADD_USER, EDIT_USER } from '../constants';

const initialState = {
    message: '',
    status: 0,
    data: [],
    error: ''
};

const BlogReducer = (state = initialState, action) => {
    switch( action.type ) {
        case LIST_USER:
            return action.payload;
        case DELETE_USER:
            return action.payload;
        default:
            return state;
    }
}
export default BlogReducer;