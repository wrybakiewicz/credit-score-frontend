import React from 'react';

export default function AddressForm({onButtonSubmit, onInputChange, onBlur, address, showInvalidAddressError}) {

    return (
        <div>
            <div>
                <input type='text' onChange={onInputChange} value={address} onBlur={onBlur} placeholder={"Your address or ENS"}/>
                <button onClick={() => onButtonSubmit(address)}>Get Score</button>
                {showInvalidAddressError ? <div>Invalid address</div> : <div/>}
            </div>
        </div>
    )
}