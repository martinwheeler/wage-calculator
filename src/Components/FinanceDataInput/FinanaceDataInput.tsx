import * as React from 'react';
import { useState, useEffect } from 'react';
import './FinanceDataInput.scss';

const FinanceDataInput = (prop: any) => {
    const [value, setValue] = useState('');
    const [error, setErrorState] = useState (false);
    const labelErrorMessage = document.getElementById('label');

    

    const handleChange= (e: any) => {
        setValue(e.target.value);
        if (/[^a-zA-Z\s]/.test(e.target.value)){
            setErrorState(false);
        }
        else {
            setErrorState(true);
        }
    }

    useEffect(() => {
        if (labelErrorMessage !== null && error === true){
            labelErrorMessage.innerHTML='This field is required.'
        }
    })


    return(
        <div className='centered'>
            <div className='group'>
                <input value={value} type={prop.type} onChange={handleChange} id='name' required={prop.required}/>
                <label htmlFor="name" className={error ? 'redLabel' : 'label'} id='label'>{prop.label}</label>
                <div className={error ? 'errorBar' : 'bar'}></div>
            </div>
        </div>

    )
}

export default FinanceDataInput;

