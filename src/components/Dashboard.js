import React, {useState} from 'react'
import {getCreditScore} from '../api'
import AddressForm from './AddressForm';
import Account from "./Account";
import {ethers} from "ethers";
import Loader from "./Loader";
import ScoreCard from './ScoreCards';

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
        return provider.resolveName(addressToVerify)
            .catch(resolveError => {
                setShowInvalidAddressError(true);
                throw resolveError;
            })
            .then(address => {
                if (address === null) {
                    if (addressToVerify !== "") {
                        setShowInvalidAddressError(true);
                    }
                    throw Error("Invalid address/ENS");
                }
                return address;
            });
    }

    const showAddressLifetimeScore = (details) => {
        if (details.created && details.lifetimeInDays) {
            return <div>
                First transaction on address was executed on <b>{details.created}</b> which
                is <b>{details.lifetimeInDays}</b> days ago
            </div>;
        } else {
            return <div>Address does not have transactions</div>
        }
    }

    return (
        <div>
            {<Account calculateScoreCallback={calculateScoreCallback}/>}
            {<AddressForm onButtonSubmit={onSubmit} onInputChange={onInputChange} onBlur={() => verifyAddress(address)}
                          address={address} showInvalidAddressError={showInvalidAddressError}/>}
            {!showCalculating && creditScore.score !== undefined ?
                <div>
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                        <h1>Your Score: {creditScore.score.toFixed(2)}</h1>
                    </div>
                    <ScoreCard title={"Token Holdings"} score={creditScore.details.tokenHoldingDetails}
                               details={(score) => JSON.stringify(score.details)}/>
                    <ScoreCard title={"Aave"} score={creditScore.details.aaveAddressDetails}
                               details={(score) => JSON.stringify(score.details)}/>
                    <ScoreCard title={"Social"} score={creditScore.details.friendsSocialScore}
                               details={(score) => JSON.stringify(score.details)}/>
                    <ScoreCard title={"Twitter"} score={creditScore.details.twitterDetails}
                               details={(score) => JSON.stringify(score.details)}/>
                    <ScoreCard title={"Cyber Connect"} score={creditScore.details.cyberConnectDetails}
                               details={(score) => JSON.stringify(score.details)}/>
                    <ScoreCard title={"Address Lifetime"} score={creditScore.details.addressCreation}
                               details={(score) => showAddressLifetimeScore(score.details)}/>
                    <ScoreCard title={"Poaps"} score={creditScore.details.poapsDetails}
                               details={(score) => JSON.stringify(score.details)}/>
                </div>
                : null}
            {showCalculating && !showInvalidAddressError ?
                <Loader/>
                : null}
        </div>
    )
};