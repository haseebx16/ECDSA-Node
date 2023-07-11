# FoxyMask (ECDSA Node)

Project implementing ECDSA on a client and a server to transact value between different addresses with ease and security.

**Why is it secure?:** Because it only allows transactions that have been signed by the funds owner.

**Usage made easy by:**

- Allowing to select between wallets with easy names for sender and recipient
- Updating balances for both sender and recipient after a transfer
- Set up and go, signing and complex stuff happens behind scenes
- Addresses are shown and processed in Ethereum address formatting

## Filesystem

Structure from [ecdsa-node](https://github.com/alchemyplatform/ecdsa-node) repo from Alchemy left untouched.

**New additions are:**

- `/client/src/FoxyMask.js` -wink to MetaMask- works as a wallet by storing private keys, sign function and getter functions
- `/server/scripts/hashi.js` is a library with functions for converting from signature to Ethereum address

## How to use

You must run the client and the server for the project to work as intended.

### Client

To run the client, follow these steps:

1. Open up a terminal in the `/client` folder
2. Run `npm install` to install all the depedencies
3. Run `npm run dev` to start the application
4. Now you should be able to visit the app at http://127.0.0.1:5173/

### Server

To run the server, follow these steps:

1. Open a terminal within the `/server` folder
2. Run `npm install` to install all the depedencies
3. Run `node index` to start the server

The application should connect to the default server port (3042) automatically!

_Hint_ - Use [nodemon](https://www.npmjs.com/package/nodemon) instead of `node` to automatically restart the server on any changes.
