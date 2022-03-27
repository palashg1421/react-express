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
            state.data = state.data.filter( ( data ) => {
                return data._id !== action.payload;
            } )
            return state;
        case ADD_USER:
            state.data.push( action.payload )
            return state;
        case EDIT_USER:
            const x = {
                ...state,
                data: state.data.map( ( value, index ) => value._id === action.payload ? { ...value, title: action.data.get('title'), thumbnail: action.data.get('thumbnail'), content: action.data.get('content') } : value )
            }
            return x
        default:
            return state;
    }
}
export default BlogReducer;