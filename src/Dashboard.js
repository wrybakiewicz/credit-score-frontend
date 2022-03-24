import React, {useState} from 'react'
import {getCreditScore} from './api'
import AddressForm from './AddressForm';
import Account from "./Account";


export default function Dashboard() {
    const [creditScore, setCreditScore] = useState({});
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
                    <h2>Base Score: {creditScore.basicScore}</h2>
                    <h2>Account lifetime score: {creditScore.details.addressCreation.score} wage: {creditScore.details.addressCreation.wage}</h2>
                    <h2>Aave score: {creditScore.details.aaveAddressDetails.score} wage: {creditScore.details.aaveAddressDetails.wage} </h2>
                    <h2>Popas score: {creditScore.details.poapsDetails.score} wage: {creditScore.details.poapsDetails.wage}</h2>
                    <h2>Your Holdings score: {creditScore.details.tokenHoldingDetails.score} wage: {creditScore.details.tokenHoldingDetails.wage} </h2>
                </div>


                : null}


        </div>
    )
};