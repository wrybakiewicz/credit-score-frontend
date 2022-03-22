import React from 'react';

export default function AdressForm({onInputChange, onButtonSubmit}){
    
    return (
        <div>
            <div>
                <input type='text' onChange={onInputChange}/>
                <button onClick={onButtonSubmit}>Get Score</button>
            </div>
        </div>
    )
}