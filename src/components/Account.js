import "./account.css";

export default function Account({calculateScoreCallback}) {

    const isMetaMaskInstalled = () => Boolean(window.ethereum);

    const connectWallet = async () => {
        const addresses = await window.ethereum.request({method: 'eth_requestAccounts'});
        const selectedAddress = addresses[0];
        console.log("User address: " + selectedAddress);
        calculateScoreCallback(selectedAddress);
    }

    return isMetaMaskInstalled() ?
        <div className={"center"}>
            <button
                onClick={connectWallet}
                className={"calculate-button"}>
                Calculate credit score for my address
            </button>
        </div> : <div></div>;
}