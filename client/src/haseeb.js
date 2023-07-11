import * as secp from "ethereum-cryptography/secp256k1";
import { keccak256 } from "ethereum-cryptography/keccak";
import { hexToBytes, toHex } from "ethereum-cryptography/utils";

const haseebu = new Map([
  [
    "Shahroz",
    {
      private:
        "f37a3b807ceadf05c52a1a83b36b98913e6b7c61d0da1f3b7d30c458ea782308",
      public:
        "0450acb1d24b74d83199e3c4f0d43896f2418fbd7b64340d85a24896a8b93ab07ac77caabeb19932f7727c409a0674a9415152aa9258967363ee21e1c368c306c0",
    },
  ],
  [
    "Rabeeb",
    {
      private:
        "52278765384b1b51460b31210a4151e35ed9d5b8141628e369661ae88a517e2a",
      public:
        "049ce157e8aa3ade5cf5c698608bc1fdb4818e289312b04a3476af0b5f7c0a54f6d9042ff7a31d5845a028e1b68b2c78dd0d12915a7a19b74889485fbf20af8c0f",
    },
  ],
  [
    "Egg",
    {
      private:
        "1844507cbad56e23db7b9ff36080648e9977eb28ad42ffee6e3f544d91473856",
      public:
        "04d33a1b562712da2b148bc3cfa60041db3eafe7b00ae0ae7a81be508d5629726407c9a97d83942a843e2ee4f540cda26c09654a7ddba6dbb0b62e6c3871c98b3d",
    },
  ],
]);

// Usernames derived from the list of accounts
const Foxes = Array.from(haseebu.keys());

// Standard hashMessage function
const hashMessage = (message) => keccak256(Uint8Array.from(message));

// Returns the private key as a Uint8Array.
const getPrivateKey = (user) => {
  if (!user) return null;
  return hexToBytes(haseebu.get(user).private);
};

// Returns the public key as a Uint8Array.
const getPublicKey = (user) => {
  if (!user) return null;
  return hexToBytes(haseebu.get(user).public);
};

// Get and return Ethereum address from the Public Key of a user
const getAddress = (user) => {
  if (!user) return null;
  const publicKey = getPublicKey(user);
  const hash = keccak256(publicKey.slice(1));
  return "0x" + toHex(hash.slice(-20));
};

// Sign a message, by entering a user and a message
// Returns a signature in hex format with the recovery bit as the first byte
const sign = async (username, message) => {
  const privateKey = getPrivateKey(username);
  const hash = hashMessage(message);

  const [signature, recoveryBit] = await secp.sign(hash, privateKey, {
    recovered: true,
  });

  const fullSignature = new Uint8Array([recoveryBit, ...signature]);
  return toHex(fullSignature);
};

const haseeb = {
  Foxes,
  sign,
  getAddress,
};
export default haseeb;
