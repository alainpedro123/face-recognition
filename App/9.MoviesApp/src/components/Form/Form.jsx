import React, { Component } from 'react';
import Joi from 'joi-browser';
import Input from './Input';
import Select from './Select';

class Form extends Component {
    state = { 
        data: {},
        errors: {}
     }

     validate = () => { // validation function. It validates the entire form
        const options = { abortEarly: false };
        const { error } = Joi.validate(this.state.data, this.schema, options); //1) the object we want to validate    2) the schema
     
        if(!error) 
            return null;

        // mapping this array into an obect
        const errors = {};
        for(let item of error.details)
            errors[item.path[0]] = item.message;
        return errors;
    }

    validateProperty = ({ name, value }) => {  // validation function. It validates only one input/property
       const obj = {[name]: value };  //computed properties 
       const schema = { [name]: this.schema[name] }; // this.schema of name
       const { error } = Joi.validate(obj, schema);
       return error ? error.details[0].message : null;
    }

    // every time the user clicks the submit button we want to validate the data, if there's any error we want to return
    handleSubmit = e => {
        e.preventDefault();

        const errors = this.validate();
        this.setState({ errors: errors || {} }) // if there's an error display it, otherwise keeps the object empty
        if(errors) 
            return;

        this.doSubmit();
    }

    doSubmit = () => {
         // call the server
        console.log("Submitted")
    }

    // every time the user types something in an input field, we want to validate that input field and update the state
    handleChange = ({ currentTarget: input }) =>{
        const errors = {...this.state.errors};
        const errorMessage = this.validateProperty(input);
        const data = {...this.state.data};
        if(errorMessage) // if the error message is truthy, we're going to store it into the errors object
            errors[input.name] = errorMessage;
        
        else // delete the existing property
            delete errors[input.name];

        data[input.name] = input.value;  //data.username = e.currentTarget.values;
        this.setState({ data, errors })
    }

    renderButton(label){
        return (
        <button className="btn btn-primary" disabled={this.validate()} /* disable the button when the button is not valid */ >
            {label}
        </button>
        )
    }

    renderInput(name, label, type="text"){
        const { data, errors } = this.state;
        return(
            <Input
                type={type}
                name={name}
                value={data[name]}  //data.username
                label={label}
                onChange={this.handleChange} 
                error={errors[name]}
            />
        )
    }

    renderSelect(name, label, options){
        const { data, errors } = this.state;
        return(
            <Select
                name={name}
                value={data[name]}
                label={label}
                options={options}
                onChange={this.handleChange} 
                error={errors[name]}
            />
        )
    }
}
 
export default Form;