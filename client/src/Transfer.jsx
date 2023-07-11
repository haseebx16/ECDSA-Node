import { useState } from "react";
import server from "./server";
import haseeb from "./haseeb";

function Transfer({ user, setBalance, sendAmount }) {
  const [recipient, setRecipient] = useState("");
  const [recipientBalance, setRecipientBalance] = useState(0);

  // Transfer function, that calls send on the server after signing from haseeb
  async function transfer(evt) {
    evt.preventDefault();

    const message = {
      amount: parseInt(sendAmount),
      recipient: haseeb.getAddress(recipient),
    };

    // Signature is composed of the user (private key?) and the message object
    const signature = await haseeb.sign(user, message);

    const transaction = {
      message,
      signature,
    };
    // Try calling send on the server with the transaction and updating sender balance afterwards
    try {
      const {
        data: { balance },
      } = await server.post(`send`, transaction);
      setBalance(balance);
    } catch (ex) {
      alert(ex);
    }

    // Update recipient address after successfully transfering
    const address = haseeb.getAddress(recipient);
    const {
      data: { balance },
    } = await server.get(`balance/${address}`);
    setRecipientBalance(balance);
  }

  // Function for users selector
  async function onSelectUser(evt) {
    const selectedUser = evt.target.value;
    setRecipient(selectedUser);

    if (selectedUser) {
      const address = haseeb.getAddress(selectedUser);
      const {
        data: { balance },
      } = await server.get(`balance/${address}`);
      setRecipientBalance(balance);
    } else {
      setRecipientBalance(0);
    }
  }

  return (
    <form className="container transfer" onSubmit={transfer}>
      <h1> Destination wallet 💸</h1>

      <label>
        Recipient wallet:{" "}
        {haseeb.getAddress(recipient)
          ? `${haseeb.getAddress(recipient)}`
          : null}
        <select className="selector" onChange={onSelectUser} value={recipient}>
          <option value="">- Select a wallet -</option>
          {haseeb.Foxes.map((u, i) => (
            <option key={i} value={u}>
              {u}
            </option>
          ))}
        </select>
      </label>

      <div className="balanceReceiver">
        Recipient balance: {recipientBalance}
      </div>

      <input type="submit" className="button" value="Transfer" />
    </form>
  );
}

export default Transfer;
