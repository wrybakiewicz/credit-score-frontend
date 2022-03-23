import React, {useState} from 'react'
import {getCreditScore} from './api'
import AddressForm from './AddressForm';
import Account from "./Account";


export default function Dashboard() {
    const [creditScore, setCreditScore] = useState({});
    const [address, setAddress] = useState('');

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
        fetchCreditScore(address);
    }

    function onInputChange(e) {
        setAddress(e.target.value);
    }

    function renderTokenHoldings() {
        return creditScore.details.tokenHoldingDetails.details.map((token, index) => {
            return (
                <tr key={token.token}>
                    <td>{token.token}</td>
                </tr>
            )
        })
    }

    /*useEffect( () => {fetchCreditScore()}, []);*/

    return (
        <div>
            {<Account calculateScoreCallback={calculateScoreCallback}/>}
            {<AddressForm onButtonSubmit={onSubmit} onInputChange={onInputChange} address={address}/>}

            {creditScore.score !== undefined ?
                <div>
                    <h1>Your Score: {creditScore.score}</h1>
                    <h1>Your Holdings: </h1>
                    {renderTokenHoldings()}
                </div>


                : null}


        </div>
    )
};