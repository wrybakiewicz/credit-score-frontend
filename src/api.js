import axios from 'axios'



const api = axios.create({
    baseURL: 'http://nodebackend-env.eba-i9jv2v5c.eu-central-1.elasticbeanstalk.com'})



export async function getCreditScore(adress){
    let response = await api.get('/credit-score/'+adress)
    
    return response.data
}