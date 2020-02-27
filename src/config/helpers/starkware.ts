import * as ethers from "ethers";
import * as starkwareCrypto from "starkware-crypto";
import { getWallet, signMessage } from "../../helpers/wallet";
import { IStarkwareRegistryMap } from "../typings";

export const starkRegistryMap: IStarkwareRegistryMap = {
  3: "0x204eAF71D3f15CF6F9A024159228573EE4543bF9",
};

export const starkwareMethods = [
  "stark_accounts",
  "stark_register",
  "stark_deposit",
  "stark_sign",
  "stark_withdraw",
];

let starkwareKeyPair: starkwareCrypto.KeyPair | null = null;

export async function starkwareGenerateKeyPair(): Promise<starkwareCrypto.KeyPair> {
  const privateKey = (await getWallet()).privateKey;
  starkwareKeyPair = starkwareCrypto.getKeyPair(privateKey);
  return starkwareKeyPair;
}

export async function starkwareGetKeyPair(): Promise<starkwareCrypto.KeyPair> {
  let keyPair = starkwareKeyPair;
  if (!keyPair) {
    keyPair = await starkwareGenerateKeyPair();
  }
  return keyPair;
}

export async function starkwareGetStarkKey(): Promise<string> {
  const keyPair = await starkwareGetKeyPair();
  const publicKey = starkwareCrypto.getPublic(keyPair);
  const starkKey = starkwareCrypto.getStarkKey(publicKey);
  return starkKey;
}

export async function starkwareGetAccounts(): Promise<string[]> {
  return [await starkwareGetStarkKey()];
}

export async function starkwareRegister() {
  const wallet = await getWallet();
  const starkKey = await starkwareGetStarkKey();
  const msg = starkwareGetRegisterMsg(wallet.address, starkKey);
  const sig = await signMessage(msg);
  // TODO: send sig to registry contract
  const txhash = `${sig}`;
  const accounts = await starkwareGetAccounts();
  return { accounts, txhash };
}

export async function starkwareDeposit(amount: string, token: string) {
  // 1. receive stark_deposit with token and amount
  // 2. verify token balance
  // 3. call deposit on smart contract
  // 4. return transaction hash
  const txhash = "";
  return { txhash };
}

export async function starkwareSign(msg: any) {
  const keyPair = await starkwareGetKeyPair();
  return starkwareCrypto.sign(keyPair, msg);
}

export async function starkwareVerify(msg: any, sig: any) {
  const keyPair = await starkwareGetKeyPair();
  return starkwareCrypto.verify(keyPair, msg, sig);
}

export function starkwareGetRegisterMsg(etherKey: string, starkKey: string) {
  return ethers.utils.keccak256(
    ethers.utils.defaultAbiCoder.encode(["address", "uint256"], [etherKey, starkKey]),
  );
}

export async function starkwareSignTransfer(
  amount: string,
  nonce: string,
  senderVaultId: string,
  token: string,
  receiverVaultId: string,
  receiverPublicKey: string,
  expirationTimestamp: string,
) {
  const msg = starkwareCrypto.getTransferMsg(
    amount,
    nonce,
    senderVaultId,
    token,
    receiverVaultId,
    receiverPublicKey,
    expirationTimestamp,
  );
  const sig = starkwareCrypto.sign(await starkwareGetKeyPair(), msg);
  return sig;
}

export async function starkwareSignCreateOrder(
  vaultSell: string,
  vaultBuy: string,
  amountSell: string,
  amountBuy: string,
  tokenSell: string,
  tokenBuy: string,
  nonce: string,
  expirationTimestamp: string,
) {
  const msg = starkwareCrypto.getLimitOrderMsg(
    vaultSell,
    vaultBuy,
    amountSell,
    amountBuy,
    tokenSell,
    tokenBuy,
    nonce,
    expirationTimestamp,
  );
  const sig = starkwareCrypto.sign(await starkwareGetKeyPair(), msg);
  return sig;
}
