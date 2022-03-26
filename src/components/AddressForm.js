import React from 'react';
import "./addressForm.css"

export default function AddressForm({onButtonSubmit, onInputChange, onBlur, address, showInvalidAddressError}) {

    return (
        <div className={"center"}>
            <div>
                <input id="walletAddress" className={"address " + (showInvalidAddressError ? "invalidAddress": "")} type='text' onChange={onInputChange} value={address} onBlur={onBlur}
                       placeholder={"Your address or ENS"}/>
            </div>
            <button className={"calculate-score-button"} onClick={() => onButtonSubmit(address)}>Calculate score
            </button>
        </div>
    )
}