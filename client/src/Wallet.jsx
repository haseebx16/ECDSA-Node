import server from "./server";
import haseeb from "./haseeb";

function Wallet({
  user,
  setUser,
  balance,
  setBalance,
  sendAmount,
  setSendAmount,
}) {
  async function onSelectUser(evt) {
    const selectedUser = evt.target.value;
    setUser(selectedUser);

    if (selectedUser) {
      const address = haseeb.getAddress(selectedUser);
      const {
        data: { balance },
      } = await server.get(`balance/${address}`);
      setBalance(balance);
    } else {
      setBalance(0);
    }
  }

  const setValue = (setter) => (evt) => setter(evt.target.value);

  return (
    <div className="container wallet">
      <h1> EGG WALLET 🥚</h1>
      <label>
        Sender wallet:{" "}
        {haseeb.getAddress(user) ? `${haseeb.getAddress(user)}` : null}
        <select className="selector" onChange={onSelectUser} value={user}>
          <option value="">- Select a wallet -</option>
          {haseeb.Foxes.map((u, i) => (
            <option key={i} value={u}>
              {u}
            </option>
          ))}
        </select>
      </label>
      <div className="balance">Sender balance: {balance}</div>

      <label>
        Amount to send
        <input
          placeholder="1, 25, 100..."
          value={sendAmount}
          onChange={setValue(setSendAmount)}
        ></input>
      </label>
    </div>
  );
}

export default Wallet;
