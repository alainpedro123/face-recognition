import React from 'react';

const Input = ({ name, label, error, ...rest }) => {
    return ( 
        <div className="form-group">
            <label htmlFor={name}>{label}</label>
            <input {...rest} name={name} id={name} className="form-control"/>
            {error && <div className="alert alert-danger">{error}</div>}
            {/* if the error is truthy so display this technique otherwise ignore*/}
        </div>
     );
}
 
export default Input;


/*
BEFORE

const Input = ({name, label, value, onChange, error, type}) => {
    return ( 
        <div className="form-group">
            <label htmlFor={name}>{label}</label>
            <input 
                value={value}
                onChange={onChange} 
                type={type} 
                id={name} 
                name={name}
                className="form-control"
            />
        {error && <div className="alert alert-danger">{error}</div>}
        {/* if the error is truthy so display this technique otherwise ignore
        </div>
     );
}
*/