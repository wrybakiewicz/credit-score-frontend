export default function Account({setAddressCallback}) {

    const connectWallet = async () => {
        await initialize();

        window.ethereum.on("accountsChanged", ([newAddress]) => {
            initialize(newAddress);
        });
    }

    const initialize = async () => {
        const addresses = await window.ethereum.request({method: 'eth_requestAccounts'});
        const selectedAddress = addresses[0];
        console.log("User address: " + selectedAddress);
        setAddressCallback(selectedAddress);
    }

    return <button onClick={connectWallet}>Get my address</button>;
}