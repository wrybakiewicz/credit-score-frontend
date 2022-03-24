import React from 'react';

export default function AddressForm({onButtonSubmit, onInputChange, address}) {

    return (
        <div>
            <div>
                <input type='text' onChange={onInputChange} value={address} placeholder={"Your address or ENS"}/>
                <button onClick={() => onButtonSubmit(address)}>Get Score</button>
            </div>
        </div>
    )
}