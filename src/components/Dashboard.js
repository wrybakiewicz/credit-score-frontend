import React, { useState } from 'react'
import { getCreditScore } from '../api'
import AddressForm from './AddressForm';
import Account from "./Account";
import { ethers } from "ethers";
import Loader from "./Loader";
import ScoreCard from './ScoreCards';
import PoapsDetails from "./details/PoapsDetails";
import AddressLifetimeDetails from "./details/AddressLifetimeDetails";
import SocialScoreDetails from "./details/SocialScoreDetails";
import TokenHoldingScoreDetails from './details/TokenHoldingDetails';
import TwitterDetails from './details/TwitterDetails';
import LoanDetails from "./details/LoanDetails";
import SocialScoreDetails2 from './details/SocialScoreDetails2';
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

    return (
        <div>
            {<Account calculateScoreCallback={calculateScoreCallback} />}
            {<AddressForm onButtonSubmit={onSubmit} onInputChange={onInputChange} onBlur={() => verifyAddress(address)}
                address={address} showInvalidAddressError={showInvalidAddressError} />}
            {!showCalculating && creditScore.score !== undefined ?
                <div>
                    <div style={{ display: 'flex', justifyContent: 'center', 'font-family': 'Red Hat Mono' }}>
                        <h1>Your Score: {creditScore.score.toFixed(2)} / 1000</h1>
                    </div>
                    <ScoreCard title={"Address Lifetime"} score={creditScore.details.addressCreation}
                        details={<AddressLifetimeDetails
                            details={creditScore.details.addressCreation.details} />} />
                    <ScoreCard title={"Social"} score={creditScore.details.cyberConnectDetails}
                        details={<SocialScoreDetails2
                            details={creditScore.details.cyberConnectDetails.details} address={address} />} />
                    <ScoreCard title={"Token Holdings"} score={creditScore.details.tokenHoldingDetails}
                        details={<TokenHoldingScoreDetails
                            details={creditScore.details.tokenHoldingDetails.details} address={address} />} />
                    <ScoreCard title={"Loans"} score={creditScore.details.aaveAddressDetails}
                        details={<LoanDetails details={creditScore.details.aaveAddressDetails.details} />} />
                    <ScoreCard title={"Twitter"} score={creditScore.details.twitterDetails}
                        details={<TwitterDetails details={creditScore.details.twitterDetails.details} />} />
                    <ScoreCard title={"Poaps"} score={creditScore.details.poapsDetails}
                        details={<PoapsDetails details={creditScore.details.poapsDetails.details} />} />
                    <ScoreCard title={"Friends social"} score={creditScore.details.friendsSocialScore}
                        details={<SocialScoreDetails
                            details={creditScore.details.friendsSocialScore.details} address={address} />} />
                </div>
                : null}
            {showCalculating && !showInvalidAddressError ?
                <Loader />
                : null}
        </div>
    )
};