import Wallet from "./Wallet";
import Transfer from "./Transfer";
import "./App.scss";
import { useState } from "react";

function App() {
  const [balance, setBalance] = useState(0);
  const [address, setAddress] = useState("");
  const [user, setUser] = useState("");
  const [sendAmount, setSendAmount] = useState("");

  return (
    <div className="app">
      <Wallet
        balance={balance}
        setBalance={setBalance}
        sendAmount={sendAmount}
        setSendAmount={setSendAmount}
        user={user}
        setUser={setUser}
      />

      <Transfer setBalance={setBalance} user={user} sendAmount={sendAmount} />
    </div>
  );
}

export default App;
