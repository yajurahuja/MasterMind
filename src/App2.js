import React, {useState, useEffect} from "react";
import { ethers } from "ethers";
import Greeter from './artifacts/contracts/Greeter.sol/Greeter.json'

const contractAddress = "0x5FC8d32690cc91D4c39d9d3abcBD16989F875707";

function App() {
  const [greeting, setGreetingValue] = useState("");

  //fetch greeting 

  async function fetchGreeting() {
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(contractAddress, Greeter.abi, provider);
      try{
        const data = await contract.greet()
        setGreetingValue(data);
        console.log('data: ', data);
      } catch(err){
        console.log('Error: ', err);
      }
    }
  }

  async function setGreeting(value){
    if(!value) return;
    if (!typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, Greeter.abi, signer);
      const transaction = await contract.setGreeting(value)
      await transaction.wait();
      fetchGreeting();
    }
  }

  useEffect(() => {
    requestAccount();
    fetchGreeting();
    setGreeting("Changed Greeting");
  }, [])

  async function requestAccount(){
    await window.ethereum.request({method: 'eth_requestAccounts'})
  }
  return (
    <div>
      {<h1>Greeting - {greeting}</h1>}
    </div>
  );
}

export default App;
