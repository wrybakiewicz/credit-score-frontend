import React, {useEffect, useState} from 'react';

export default function AddressForm({onButtonSubmit, connectedAddress}) {

    const [address, setAddress] = useState('');

    useEffect(() => {
        if (connectedAddress) {
            setAddress(connectedAddress);
        }
    });

    function onInputChange(e) {
        console.log(e.target.value);
        setAddress(e.target.value);
    }

    return (
        <div>
            <div>
                <input type='text' onChange={onInputChange} value={address}/>
                <button onClick={() => onButtonSubmit(address)}>Get Score</button>
            </div>
        </div>
    )
}