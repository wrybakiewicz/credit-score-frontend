import React, {useState} from 'react'
import {getCreditScore} from './api'
import AddressForm from './AddressForm';


export default function Dashboard({connectedAddress}) {
    const [creditScore, setCreditScore] = useState({});

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
            {<AddressForm onButtonSubmit={onSubmit} connectedAddress={connectedAddress}/>}

            {creditScore.score ?
                <div>
                    <h1>Your Score: {creditScore.score}</h1>
                    <h1>Your Holdings: </h1>
                    {renderTokenHoldings()}
                </div>


                : null}


        </div>
    )
};