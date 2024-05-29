const secp = require("ethereum-cryptography/secp256k1");
const { keccak256 } = require("ethereum-cryptography/keccak");
const { utf8ToBytes } = require("ethereum-cryptography/utils");

const PRIVATE_KEY = "ca085f64c5576ba62cfee173b61196220155fea79f3d856211225d7a94b1dbbb";

function hashMessage(message) {
    const bytes = utf8ToBytes(message);
    const hash = keccak256(bytes);
    return hash;
}

const hash = hashMessage("hello");
const sign = secp.secp256k1.sign(hash,PRIVATE_KEY);
console.log(sign);