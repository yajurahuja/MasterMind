import React, {useState, useEffect} from "react";
import { ethers } from "ethers";
import MasterMind from './artifacts/contracts/MasterMind.sol/MasterMind.json'
import MmasterMind from './components/Mastermind';

const contractAddress = "0x5FC8d32690cc91D4c39d9d3abcBD16989F875707";

function App() {
  const [solCombination, setSolCombination] = useState("");
  const [solContract, setContract] = useState(null);
  const [signer, setSigner] = useState(null);

  async function requestAccount(){
    await window.ethereum.request({method: 'eth_requestAccounts'})
  }
  async function getNewCombination(){
    if (typeof window.ethereum !== 'undefined') {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const contract = new ethers.Contract(contractAddress, MasterMind.abi, provider);
        try{
          const data = await contract.getNewCombination();
          setSolCombination(data);
          console.log('data: ', data);
        } catch(err){
          console.log('Error: ', err);
        }
      }
  }
  async function generateCombination(){
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    setSigner(signer);
    const contract = new ethers.Contract(contractAddress, MasterMind.abi, signer);
    const transaction = await contract.generate_combination();
    await transaction.wait();
    setContract(contract);
    getNewCombination();
    
  }

  useEffect(() => {
    // requestAccount();
    // getNewCombination();
    // generateCombination();
  }, [])


  return (
    <div>
      {<h1>MASATERMIND</h1>}
      {<MmasterMind solContract={solContract} solCombination={solCombination}/>}
      </div>
  );
}

export default App;