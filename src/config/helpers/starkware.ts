import * as ethers from "ethers";
import * as starkwareCrypto from "starkware-crypto";
import { getWallet } from "../../helpers/wallet";
import ERC20TokenABI from "./contracts/ERC20TokenABI.json";
import StarkExchangeABI from "./contracts/StarkExchangeABI.json";
import { convertAmountToRawNumber } from "src/helpers/bignumber";

export const starkwareMethods = [
  "stark_accounts",
  "stark_register",
  "stark_deposit",
  "stark_sign",
  "stark_withdraw",
];

let starkwareKeyPair: starkwareCrypto.KeyPair | null = null;

export function getERC20TokenContract(contractAddress: string) {
  const provider = getWallet().provider;
  return new ethers.Contract(contractAddress, ERC20TokenABI, provider);
}

export function starkwareGetExchangeContract(contractAddress: string) {
  const provider = getWallet().provider;
  return new ethers.Contract(contractAddress, StarkExchangeABI, provider);
}

export function starkwareGenerateKeyPair(): starkwareCrypto.KeyPair {
  const privateKey = getWallet().privateKey;
  starkwareKeyPair = starkwareCrypto.getKeyPair(privateKey);
  return starkwareKeyPair;
}

export function starkwareGetKeyPair(): starkwareCrypto.KeyPair {
  let keyPair = starkwareKeyPair;
  if (!keyPair) {
    keyPair = starkwareGenerateKeyPair();
  }
  return keyPair;
}

export function starkwareGetStarkKey(): string {
  const keyPair = starkwareGetKeyPair();
  const publicKey = starkwareCrypto.getPublic(keyPair);
  const starkKey = starkwareCrypto.getStarkKey(publicKey);
  return starkKey;
}

export function starkwareGetAccounts(): string[] {
  return [starkwareGetStarkKey()];
}

export async function starkwareSign(msg: any) {
  const keyPair = starkwareGetKeyPair();
  return starkwareCrypto.sign(keyPair, msg);
}

export async function starkwareVerify(msg: any, signature: any) {
  const keyPair = starkwareGetKeyPair();
  return starkwareCrypto.verify(keyPair, msg, signature);
}

export function starkwareGetRegisterMsg(etherKey: string, starkKey: string) {
  return ethers.utils.keccak256(
    ethers.utils.defaultAbiCoder.encode(["address", "uint256"], [etherKey, starkKey]),
  );
}

// ------------------------- JSON-RPC Methods ------------------------- //

export async function starkwareAccounts() {
  const accounts = starkwareGetAccounts();
  return { accounts };
}

export async function starkwareRegister(signature: string, contractAddress: string) {
  const starkKey = starkwareGetStarkKey();
  const exchangeContract = starkwareGetExchangeContract(contractAddress);
  const { hash: txhash } = await exchangeContract.register(starkKey, signature);
  return { txhash };
}

export async function starkwareDeposit(
  amount: string,
  token: string,
  vaultId: string,
  contractAddress: string,
) {
  const tokenContract = getERC20TokenContract(token);
  const decimals = await tokenContract.decimals();
  const quantizedAmount = convertAmountToRawNumber(amount, decimals);
  const exchangeContract = starkwareGetExchangeContract(contractAddress);
  // TODO: research where to find vaultId
  // @ts-ignore
  const { hash: txhash } = await exchangeContract.deposit(token, vaultId, quantizedAmount);
  return { txhash };
}

export async function starkwareWithdraw(token: string, contractAddress: string) {
  const exchangeContract = starkwareGetExchangeContract(contractAddress);
  // @ts-ignore
  const { hash: txhash } = await exchangeContract.withdraw(token);
  return { txhash };
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
  const signature = starkwareCrypto.sign(await starkwareGetKeyPair(), msg);
  return { signature };
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
  const signature = starkwareCrypto.sign(await starkwareGetKeyPair(), msg);
  return { signature };
}

export const starkwareRpc = {
  accounts: starkwareAccounts,
  register: starkwareRegister,
  deposit: starkwareDeposit,
  transfer: starkwareSignTransfer,
  createOrder: starkwareSignCreateOrder,
  withdraw: starkwareWithdraw,
};
