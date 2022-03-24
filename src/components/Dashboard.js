import React, { useState } from 'react'
import { getCreditScore } from '../api'
import AddressForm from './AddressForm';
import Account from "./Account";
import ScoreTable from './ScoreTable';

export default function Dashboard() {
    const [creditScore, setCreditScore] = useState({});
    const [showHoldings, setShowHoldings] = useState(true);
    const [address, setAddress] = useState('0x45f8ab9a1e240dab241f220c97ebb83c7886969e');

    const calculateScoreCallback = (connectedAddress) => {
        setAddress(connectedAddress);
        fetchCreditScore(connectedAddress);
    };

    function fetchCreditScore(address) {
        getCreditScore(address).then(res => {
            setCreditScore(res)
        })
            .catch(err => {
                setCreditScore({})
            })
    }

    function onSubmit(address) {
        fetchCreditScore(address)
        console.log(creditScore);
    }

    function onInputChange(e) {
        setAddress(e.target.value);
    }


    return (
        <div>
            {<Account calculateScoreCallback={calculateScoreCallback} />}
            {<AddressForm onButtonSubmit={onSubmit} onInputChange={onInputChange} address={address} />}
            {creditScore.score !== undefined ?
                <ScoreTable creditScore={creditScore}/>
                : null}
        </div>
    )
};