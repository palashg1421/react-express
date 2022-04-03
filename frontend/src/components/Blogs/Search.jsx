/** Core packages */
import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap';

/** Search component */
const Search = ( props ) => {

    const initialState = {
		'title':    '',
		'content':  ''
	};

    const [ search, setSearch ] = useState( initialState );

    const handleChange = ( e  ) => {
        const name  = e.target.name;
        const value = e.target.value;
        setSearch( { ...search, [name] : value })
	}

    const handleSubmit = ( e ) => {
        e.preventDefault();
        props.handler( search );
    }

    const resetSearch = () => {
        props.handler( initialState );
        setSearch( initialState );
    }

    return(
        <>
            <div className="search-wrapper">
                <Form method='POST' onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Control
                            type='text'
                            name='title'
                            value={search.title}
                            placeholder='Search with title'
                            autoComplete='off'
                            onChange={ handleChange }
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Control
                            type='text'
                            name='content'
                            value={search.content}
                            placeholder='Search with content'
                            autoComplete='off'
                            onChange={ handleChange }
                        />
                    </Form.Group>
                    <hr />
                    <Button className='btn-block' type='submit' variant='info'>Search</Button>
                    <Button className='btn-block' type='button' variant='secondary' onClick={resetSearch}>Reset</Button>
                </Form>
            </div>
        </>
    );
}

export default Search;
