import React, {useState, useEffect} from 'react'
import {getCreditScore} from './api'
import AdressForm from './AdressForm';


export default function Dashboard() {
    const [creditScore, setCreditScore] = useState({});
    const [adress, setAdress] = useState('');

    function fetchCreditScore(){
        getCreditScore(adress).then(res => {
            setCreditScore(res)
        })
        .catch(err => {
            setCreditScore({})
        })
    }
    function onInputChange(e){
        console.log(e.target.value);
        setAdress(e.target.value);
    }
    function onSubmit(){
        fetchCreditScore(adress);
    }
    
    function renderTokenHoldings(){
        return creditScore.details.tokenHoldingDetails.details.map((token,index) =>{
            return (
                <tr key={token.token}>
                    <td>{token.token}</td>
                </tr>
            )
        })}
    
    /*useEffect( () => {fetchCreditScore()}, []);*/
    
    return (
       <div>
           {<AdressForm onInputChange={onInputChange} onButtonSubmit={onSubmit}/>}
           
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