import React, {useState} from 'react'
import {getCreditScore} from '../api'
import AddressForm from './AddressForm';
import Account from "./Account";
import ScoreTable from './ScoreTable';
import {ethers} from "ethers";
import Loader from "./Loader";

const provider = new ethers.providers.JsonRpcProvider(process.env.REACT_APP_JSON_PROVIDER_URL);

export default function Dashboard() {
    const [creditScore, setCreditScore] = useState({});
    const [address, setAddress] = useState('');
    const [showInvalidAddressError, setShowInvalidAddressError] = useState(false);
    const [showCalculating, setShowCalculating] = useState(false);

    const calculateScoreCallback = (connectedAddress) => {
        setAddress(connectedAddress);
        setShowInvalidAddressError(false);
        fetchCreditScore(connectedAddress);
    };

    function fetchCreditScore(addressToCalculateScore) {
        setShowCalculating(true);
        verifyAddress(addressToCalculateScore)
            .then(resolvedAddress => getCreditScore(resolvedAddress))
            .then(res => {
                setCreditScore(res)
                setShowCalculating(false);
            })
            .catch(err => {
                setCreditScore({})
                setShowCalculating(false);
            })
    }

    function onSubmit() {
        fetchCreditScore(address)
        console.log(creditScore);
    }

    function onInputChange(e) {
        setShowInvalidAddressError(false);
        setAddress(e.target.value);
    }

    function verifyAddress(addressToVerify) {
        return provider.resolveName(addressToVerify).then(address => {
            if(address === null) {
                if(addressToVerify !== "") {
                    setShowInvalidAddressError(true);
                }
                throw Error("Invalid address/ENS");
            }
            console.log(address);
            return address;
        });
    }


    return (
        <div>
            {<Account calculateScoreCallback={calculateScoreCallback}/>}
            {<AddressForm onButtonSubmit={onSubmit} onInputChange={onInputChange} onBlur={() => verifyAddress(address)} address={address} showInvalidAddressError={showInvalidAddressError}/>}
            {!showCalculating && creditScore.score !== undefined ?
                <ScoreTable creditScore={creditScore}/>
                : null}
            {showCalculating  ?
                <Loader />
                : null}
        </div>
    )
};