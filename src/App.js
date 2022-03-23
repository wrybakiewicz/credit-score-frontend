import Dashboard from "./Dashboard";
import React, {useState} from 'react';
import Account from "./Account";

export default function App() {
    const [address, setAddress] = useState('');

    const setAddressCallback = (connectedAddress) => {
        setAddress(connectedAddress);
    };

    return (
        <div>
            <Account setAddressCallback={setAddressCallback}/>
            <Dashboard connectedAddress={address}/>
        </div>
    )
}