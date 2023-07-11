const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

const hashi = require("./scripts/hashi");

app.use(cors());
app.use(express.json());

const balances = {
  "0x0f6cc022a606523ec2a06fc06bc38ffce74ab7d1": 100,
  "0xdeda08a56dc44afee1b2e8e9191e337edb2d82ca": 50,
  "0x4523e349d9f855cf15adee8e349bafa16953a899": 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { message, signature } = req.body;
  const { amount, recipient } = message;

  const publicKey = hashi.signatureToPublicKey(message, signature);
  const sender = hashi.publicKeyToAddress(publicKey); // To ETH address

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else if (amount < 0) {
    res.status(400).send({ message: "You can't steal with this trick!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
