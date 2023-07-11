const { secp256k1 } = require("ethereum-cryptography/secp256k1");
const { toHex } = require("ethereum-cryptography/utils");
const { keccak256 } = require("ethereum-cryptography/keccak");

const privateKey = secp256k1.utils.randomPrivateKey();
console.log("Private key:", toHex(privateKey));

const publicKey = secp256k1.getPublicKey(privateKey);
console.log("Public key:", toHex(publicKey));

// Taking out the first byte, which indicates the format of the key
// Then hashing, then taking out the last 20 bytes of that hash
// And displaying them with 0x for hex style
const ethAddress = keccak256(publicKey.slice(1)).slice(-20);
console.log("Eth Address:", "0x" + toHex(ethAddress));
