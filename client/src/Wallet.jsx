import server from "./server";
import { keccak256 } from "ethereum-cryptography/keccak.js";
import { secp256k1 } from "ethereum-cryptography/secp256k1.js";
import { utf8ToBytes , toHex} from "ethereum-cryptography/utils.js";

function Wallet({ publicKey , setPublicKey , msg , setMsg , signature, setSignature, balance, setBalance }) {
  async function onChange1() {
    const publicKey = document.getElementById("publicKey").value;
    setPublicKey(publicKey);
  }
  async function onChange2() {
    const signature = document.getElementById("signature").value;
    setSignature(signature);
  }
  async function onChange3() {
    const msg = document.getElementById("msg").value;
    setMsg(msg);
  }
  async function onClick(){
    const messageHash = keccak256(utf8ToBytes(msg));
    const isSigned = secp256k1.verify(signature, messageHash, publicKey);
    console.log(isSigned);
    if (isSigned) {
      const {
        data: { balance },
      } = await server.get(`balance/${publicKey}`);
      setBalance(balance);
    } else {
      setBalance(0);
    }
  }

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <label>
        Enter Public Key : 
        <input placeholder="Type a public key, for example: a1e.." value={publicKey} id="publicKey" required={true} onChange={onChange1}></input>
      </label>
      <label>
        Enter Signature :
        <input placeholder="Type a signature, for example: 0x1" value={signature} id="signature" required={true} onChange={onChange2}></input>
      </label>
      <label>
        Enter Message :
        <input placeholder="Type a message, for example: Hi" value={msg} id="msg" required={true} onChange={onChange3}></input>
      </label>
      <button onClick={onClick}>Check Balance</button>

      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;
