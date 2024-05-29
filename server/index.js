const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  // ada7fe8fa19892bb71832ba9f5ebc69415d684a1f54b391e1752574f19227607
  "03c519c29b8386dbc3f510da79afe72d48cebd53419ba94a263979d142d91e74ba": 100,
  // 3ab9e93ded0d1642112e2ef95eaedc2d7042d880068d6fe317e4fc132538753c
  "02631c873714717981fa56821d172002202ff11269a9b7ec0e58a7a9f5a5fc80e8": 50,
  // 4113753922319a2424b490e8e6a289f50d2123b9c1aa5c512c494f134bc49d09
  "0265e589eb24fa4cb764ed20b67047a158230d43e985d736e6ffd0a001d31f2e3f": 75,
  // ca085f64c5576ba62cfee173b61196220155fea79f3d856211225d7a94b1dbbb
  "0399a89a791da7a66ed461fe80549d4530b8817fa8347d9f113863bfabc03a3a54": 200
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { sender, recipient, amount } = req.body;

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
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
