import axios from 'axios'



const api = axios.create({
    baseURL: 'https://api.cryptoscore.me'})



export async function getCreditScore(adress){
    let response = await api.get('/credit-score/'+adress)
    
    return response.data
}