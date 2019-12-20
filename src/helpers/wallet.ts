import * as ethers from "ethers";
import { getChainData } from "./utilities";
import { setLocal, getLocal } from "./local";

const standardPath = "m/44'/60'/0'/0";
const MNEMONIC_KEY = "MNEMONIC";

let wallet: ethers.Wallet | null = null;

export function getWallet() {
  if (wallet) {
    return wallet;
  }
  return null;
}

export function getMultipleAccounts(count: number = 2) {
  const accounts = [];
  let wallet = null;
  for (let i = 0; i < count; i++) {
    wallet = createWallet(i);
    accounts.push(wallet.address);
  }
  return accounts;
}

export function generatePath(index: number) {
  const path = `${standardPath}/${index}`;
  return path;
}

export function generateMnemonic() {
  const entropy = ethers.utils.randomBytes(16);
  const mnemonic = ethers.utils.HDNode.entropyToMnemonic(entropy);
  return mnemonic;
}

export function getMnemonic() {
  let mnemonic = getLocal(MNEMONIC_KEY);
  if (!mnemonic) {
    mnemonic = generateMnemonic();
    setLocal(MNEMONIC_KEY, mnemonic);
  }
  return mnemonic;
}

export function createWallet(index: number) {
  const mnemonic = getMnemonic();
  const path = generatePath(index);
  const wallet = ethers.Wallet.fromMnemonic(mnemonic, path);
  return wallet;
}

export async function updateWallet(index: number, chainId: number) {
  const rpcUrl = getChainData(chainId).rpc_url;
  wallet = createWallet(index);
  const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
  wallet.connect(provider);
  return null;
}

export async function sendTransaction(transaction: any) {
  if (wallet) {
    if (
      transaction.from &&
      transaction.from.toLowerCase() !== wallet.address.toLowerCase()
    ) {
      console.error("Transaction request From doesn't match active account"); // tslint:disable-line
    }

    if (transaction.from) {
      delete transaction.from;
    }

    // ethers.js expects gasLimit instead
    if ("gas" in transaction) {
      transaction.gasLimit = transaction.gas;
      delete transaction.gas;
    }

    const result = await wallet.sendTransaction(transaction);
    return result.hash;
  } else {
    console.error("No Active Account"); // tslint:disable-line
  }
  return null;
}

export async function signTransaction(data: any) {
  if (wallet) {
    if (data && data.from) {
      delete data.from;
    }
    const result = await wallet.sign(data);
    return result;
  } else {
    console.error("No Active Account"); // tslint:disable-line
  }
  return null;
}

export async function signMessage(data: any) {
  if (wallet) {
    const signingKey = new ethers.utils.SigningKey(wallet.privateKey);
    const sigParams = await signingKey.signDigest(ethers.utils.arrayify(data));
    const result = await ethers.utils.joinSignature(sigParams);
    return result;
  } else {
    console.error("No Active Account"); // tslint:disable-line
  }
  return null;
}

export async function signPersonalMessage(message: any) {
  if (wallet) {
    const result = await wallet.signMessage(
      ethers.utils.isHexString(message)
        ? ethers.utils.arrayify(message)
        : message
    );
    return result;
  } else {
    console.error("No Active Account"); // tslint:disable-line
  }
  return null;
}
