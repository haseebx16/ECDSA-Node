const secp = require("ethereum-cryptography/secp256k1");
const { keccak256 } = require("ethereum-cryptography/keccak");
const { hexToBytes, toHex } = require("ethereum-cryptography/utils");

// Hash a message to be able to be signed
const hashMessage = (message) => keccak256(Uint8Array.from(message));

// Get public key from signature
const signatureToPublicKey = (message, signature) => {
  const hash = hashMessage(message);
  const fullSignatureBytes = hexToBytes(signature);
  const recoveryBit = fullSignatureBytes[0];
  const signatureBytes = fullSignatureBytes.slice(1);
  return secp.recoverPublicKey(hash, signatureBytes, recoveryBit);
};

// Input a public key, output a Ethereum address
const publicKeyToAddress = (publicKey) => {
  const hash = keccak256(publicKey.slice(1));
  return "0x" + toHex(hash.slice(-20));
};

module.exports = {
  hashMessage,
  publicKeyToAddress,
  signatureToPublicKey,
};
