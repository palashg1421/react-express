export const DateFormat = ( input_date ) => {
    const date      = new Date( input_date );
    return(  date.getDate() + '-' + (date.getMonth()+1) +'-' + date.getFullYear() );
}

export const isEmpty = ( object ) => {
    let isEmpty = true;
    for( let item in object ) {
        if( object[item] !== '' ) {
            isEmpty = false;
            break;
        }
    }
    return isEmpty;
}
