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

let activeAccount: ethers.Wallet | null = null;

export async function updateWallet(address: string, chainId: number) {
  const rpcUrl = getChainData(chainId).rpc_url;
  const account = testAccounts.filter(
    account => account.address === address
  )[0];
  if (account) {
    const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
    activeAccount = new ethers.Wallet(account.privateKey, provider);
  }
  return null;
}

export async function sendTransaction(transaction: any) {
  if (activeAccount) {
    if (transaction.from && transaction.from.toLowerCase() !== activeAccount.address.toLowerCase()) {
      console.error("Transaction request From doesn't match active account"); // tslint:disable-line
    }

    if (transaction.from) {
      delete transaction.from;
    }

    // ethers.js expects gasLimit instead
    if ('gas' in transaction) {
      transaction.gasLimit = transaction.gas;
      delete transaction.gas;
    }

    const result = await activeAccount.sendTransaction(transaction);
    return result.hash;
  } else {
    console.error("No Active Account"); // tslint:disable-line
  }
  return null;
}

export async function signMessage(message: any) {
  if (activeAccount) {
    const result = await activeAccount.signMessage(message);
    return result;
  } else {
    console.error("No Active Account"); // tslint:disable-line
  }
  return null;
}
