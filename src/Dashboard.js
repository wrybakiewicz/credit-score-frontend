import React, {useState, useEffect} from 'react'
import {getCreditScore} from './api'



export default function Dashboard() {
    const [creditScore, setCreditScore] = useState({})
    function fetchCreditScore(){
        getCreditScore('0x8A03E0daB7E83076Af7200B09780Af7856F0298D').then(res => {
            setCreditScore(res)
        })
    }
    
    useEffect( () => {fetchCreditScore()}, []);

    return (
        <p>{creditScore.score}</p>
    )
}