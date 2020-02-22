import React from 'react';
import './Input.css';

const Input = (props) => {

    let inputElement = null;
    switch (props.config.type) {
        case "text":
            inputElement = <input type="text" name={props.name} onChange={props.handleChange} {...props}/>
            break;
        case "number":
            inputElement = <input type="number" name={props.name} onChange={props.handleChange} {...props}/>
            break;
        case "email":
            inputElement = <input type="email" name={props.name} onChange={props.handleChange} {...props}/>
            break;
        case "date":
            inputElement = <input type="date" name={props.name} onChange={props.handleChange} {...props}/>
            break;
        case "password":
            inputElement = <input type="password" name={props.name} onChange={props.handleChange} {...props}/>
            break;
        default:
           inputElement = <input type="text" name={props.name} onChange={props.handleChange} {...props}/>
           
    }

    return (
        <>
            <label className="InputLabel">{props.label}</label>
            {inputElement}<br/>
        </>
    )
}

export default Input;