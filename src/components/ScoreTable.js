import { render } from '@testing-library/react';
import React from 'react';

export default function ScoreTable({creditScore}) {

    function renderTokenHoldings() {
        return creditScore.details.tokenHoldingDetails.details.map((token, index) => {
            return (
                <tr key={token.token}>
                    <td>{token.token}</td>
                </tr>
            )
        })
    }

    return (
        <div>
            <h1>Your Score: {creditScore.score}</h1>
            <h2>Base Score: {creditScore.basicScore}</h2>
            <h2>Account lifetime score: {creditScore.details.addressCreation.score} wage: {creditScore.details.addressCreation.wage}</h2>
            <h2>Aave score: {creditScore.details.aaveAddressDetails.score} wage: {creditScore.details.aaveAddressDetails.wage} </h2>
            <h2>Popas score: {creditScore.details.poapsDetails.score} wage: {creditScore.details.poapsDetails.wage}</h2>
            <h2>Your Holdings score: {creditScore.details.tokenHoldingDetails.score} wage: {creditScore.details.tokenHoldingDetails.wage} </h2>
            {renderTokenHoldings()}
        </div>
       
    )
}