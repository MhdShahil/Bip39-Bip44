require("dotenv").config();
const Tx = require("ethereumjs-tx").Transaction;
const Web3 = require("web3");
const ethers = require("ethers");
const bip39 = require("bip39");
const Wallet = require("ethereumjs-wallet");
const HDKey = require("hdkey");
const accountAddress = process.env.ACCOUNT_ADDRESS;
const ACCOUNT_PRIVATE_KEY = process.env.ACCOUNT_PRIVATE_KEY;
const web3 = new Web3(
  new Web3.providers.HttpProvider(
    "https://goerli.infura.io/v3/44ba5f98ceea4f71ba411ab8d814e2b6"
  )
);

web3.eth.accounts.wallet.add(ACCOUNT_PRIVATE_KEY);

// Generate a random mnemonic phrase with 12 words
const mnemonic = bip39.generateMnemonic(128);

console.log("Mnemonic phrase:", mnemonic);

// Define the BIP44 derivation path
const path = "m/44'/60'/0'/0";

// Generate a master seed (mnemonic phrase)
const seed = HDKey.fromMasterSeed(bip39.mnemonicToSeedSync(mnemonic));

// Derive the account extended keys for the BIP44 derivation path
const extendedKey = seed.derive(path);

// Create two wallet instances from the derived extended keys
const wallet1 = Wallet.fromPrivateKey(extendedKey.deriveChild(0).privateKey);
const wallet2 = Wallet.fromPrivateKey(extendedKey.deriveChild(1).privateKey);

// Log the addresses of the generated wallets
console.log("Address 1:", wallet1.getAddressString());
console.log("Address 2:", wallet2.getAddressString());
