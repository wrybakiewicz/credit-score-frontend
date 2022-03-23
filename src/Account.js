export default function Account({calculateScoreCallback}) {

    const connectWallet = async () => {
        const addresses = await window.ethereum.request({method: 'eth_requestAccounts'});
        const selectedAddress = addresses[0];
        console.log("User address: " + selectedAddress);
        calculateScoreCallback(selectedAddress);
    }

    return <button onClick={connectWallet}>Calculate for my address</button>;
}