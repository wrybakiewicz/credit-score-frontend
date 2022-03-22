import React, {useState, useEffect} from 'react'
import {getCreditScore} from './api'



export default function Dashboard() {
    const [creditScore, setCreditScore] = useState({})

    function fetchCreditScore(){
        getCreditScore('0x8A03E0daB7E83076Af7200B09780Af7856F0298D').then(res => {
            setCreditScore(res)
        })
    }
    console.log(creditScore);
    
    function renderTokenHoldings(){
        return creditScore.details.tokenHoldingDetails.details.map((token,index) =>{
            return (
                <tr>
                    <td>{token.token}</td>
                </tr>
            )
        })}
    
    
    useEffect( () => {fetchCreditScore()}, []);

    return (
       <div>
           <p>Score: {creditScore.score}</p>
           <p>Token Holdings score: </p>
           {renderTokenHoldings()}
        </div>
    )
};