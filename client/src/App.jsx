import Wallet from "./Wallet";
import Transfer from "./Transfer";
import "./App.scss";
import { useState } from "react";

function App() {
  const [balance, setBalance] = useState(0);
  const [publicKey, setPublicKey] = useState("");
  const [signature, setSignature] = useState("");
  const [msg, setMsg] = useState("");

  return (
    <div className="app">
      <Wallet
        publicKey={publicKey}
        setPublicKey={setPublicKey}
        msg={msg}
        setMsg={setMsg}
        signature={signature}
        setSignature={setSignature}
        balance={balance}
        setBalance={setBalance}
      />
      <Transfer setBalance={setBalance} address={publicKey} />
    </div>
  );
}

export default App;
