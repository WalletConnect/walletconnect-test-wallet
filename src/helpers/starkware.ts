import * as ethers from "ethers";
import * as starkwareCrypto from "starkware-crypto";
import { getWallet, signMessage } from "./wallet";

let starkKeyPair: starkwareCrypto.KeyPair | null = null;

export async function generateStarkwareKeyPair(): Promise<starkwareCrypto.KeyPair> {
  const privateKey = (await getWallet()).privateKey;
  starkKeyPair = starkwareCrypto.getKeyPair(privateKey);
  return starkKeyPair;
}

export async function getStakwareKeyPair(): Promise<starkwareCrypto.KeyPair> {
  let keyPair = starkKeyPair;
  if (!keyPair) {
    keyPair = await generateStarkwareKeyPair();
  }
  return keyPair;
}

export async function getStarkKey(): Promise<string> {
  const keyPair = await getStakwareKeyPair();
  const publicKey = starkwareCrypto.getPublic(keyPair);
  const starkKey = starkwareCrypto.getStarkKey(publicKey);
  return starkKey;
}

export async function starkwareRegister() {
  const wallet = await getWallet();
  const starkKey = await getStarkKey();
  const msg = starkwareGetRegisterMsg(wallet.address, starkKey);
  const sig = await signMessage(msg);
  // TODO: send sig to registry contract
  return sig;
}

export async function starkwareSign(msg: any) {
  const keyPair = await getStakwareKeyPair();
  return starkwareCrypto.sign(keyPair, msg);
}

export async function starkwareVerify(msg: any, sig: any) {
  const keyPair = await getStakwareKeyPair();
  return starkwareCrypto.verify(keyPair, msg, sig);
}

export function starkwareGetRegisterMsg(etherKey: string, starkKey: string) {
  return ethers.utils.keccak256(
    ethers.utils.defaultAbiCoder.encode(["address", "uint256"], [etherKey, starkKey]),
  );
}

export function starkwareGetTransferMsg(
  amount: string,
  nonce: string,
  senderVaultId: string,
  token: string,
  receiverVaultId: string,
  receiverPublicKey: string,
  expirationTimestamp: string,
) {
  return starkwareCrypto.getTransferMsg(
    amount,
    nonce,
    senderVaultId,
    token,
    receiverVaultId,
    receiverPublicKey,
    expirationTimestamp,
  );
}

export function starkwareGetLimitOrderMsg(
  vaultSell: string,
  vaultBuy: string,
  amountSell: string,
  amountBuy: string,
  tokenSell: string,
  tokenBuy: string,
  nonce: string,
  expirationTimestamp: string,
) {
  return starkwareCrypto.getLimitOrderMsg(
    vaultSell,
    vaultBuy,
    amountSell,
    amountBuy,
    tokenSell,
    tokenBuy,
    nonce,
    expirationTimestamp,
  );
}
