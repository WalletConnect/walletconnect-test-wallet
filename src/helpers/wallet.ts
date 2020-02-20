import * as ethers from "ethers";
import { getChainData } from "./utilities";
import { setLocal, getLocal } from "./local";
import { STANDARD_PATH, ENTROPY_KEY, MNEMONIC_KEY, STARKWARE_KEY } from "./constants";
import * as starkware from "./starkware";

let wallet: ethers.Wallet | null = null;
let starkKeyPair: starkware.KeyPair | null = null;

export function getWallet() {
  if (wallet) {
    return wallet;
  }
  return null;
}

export function getMultipleAccounts(count = 2) {
  const accounts = [];
  let wallet = null;
  for (let i = 0; i < count; i++) {
    wallet = createWallet(i);
    accounts.push(wallet.address);
  }
  return accounts;
}

export function getData(key: string) {
  let value = getLocal(key);
  if (!value) {
    switch (key) {
      case ENTROPY_KEY:
        value = generateEntropy();
        break;
      case MNEMONIC_KEY:
        value = generateMnemonic();
        break;
      case STARKWARE_KEY:
        value = generateStarkwareKeyPair();
        break;
      default:
        throw new Error(`Unknown data key: ${key}`);
    }
    setLocal(key, value);
  }
  return value;
}

export function generatePath(index: number) {
  const path = `${STANDARD_PATH}/${index}`;
  return path;
}

export function generateEntropy(): string {
  return ethers.utils.hexlify(ethers.utils.randomBytes(16));
}

export function generateMnemonic() {
  return ethers.utils.HDNode.entropyToMnemonic(getEntropy());
}

export function generateStarkwareKeyPair() {
  starkKeyPair = starkware.ec.genKeyPair({ entropy: getEntropy() });
  return starkKeyPair;
}

export function getEntropy() {
  return getData(ENTROPY_KEY);
}

export function getMnemonic() {
  return getData(MNEMONIC_KEY);
}

export function getStarkwareKeyPair() {
  return getData(STARKWARE_KEY);
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
    if (transaction.from && transaction.from.toLowerCase() !== wallet.address.toLowerCase()) {
      console.error("Transaction request From doesn't match active account");
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
    console.error("No Active Account");
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
    console.error("No Active Account");
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
    console.error("No Active Account");
  }
  return null;
}

export async function signPersonalMessage(message: any) {
  if (wallet) {
    const result = await wallet.signMessage(
      ethers.utils.isHexString(message) ? ethers.utils.arrayify(message) : message,
    );
    return result;
  } else {
    console.error("No Active Account");
  }
  return null;
}

export async function starkwareSign(msg: any) {
  return starkware.sign(getStarkwareKeyPair(), msg);
}

export async function starkwareVerify(msg: any, sig: any) {
  return starkware.verify(getStarkwareKeyPair(), msg, sig);
}
