import * as ethers from "ethers";
import { getChainData } from "./utilities";

export const testAccounts = [
  {
    address: "0x6e4d387c925a647844623762aB3C4a5B3acd9540",
    privateKey:
      "c13d25f6ad00f532b530d75bf3a5f16b8e11e5619bc9b165a6ac99b150a2f456"
  },
  {
    address: "0xeF8fD2BDC6F6Be83F92054F8Ecd6B010f28CE7F4",
    privateKey:
      "67543bed4cc767d6153daf55547c5fa751657dab953d4bc01846c7a6a4fc4782"
  }
];

let wallet: ethers.Wallet | null = null;

export function getWallet() {
  if (wallet) {
    return wallet;
  }
  return null;
}

export async function updateWallet(address: string, chainId: number) {
  const rpcUrl = getChainData(chainId).rpc_url;
  const account = testAccounts.filter(
    account => account.address === address
  )[0];
  if (account) {
    const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
    wallet = new ethers.Wallet(account.privateKey, provider);
  }
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
