import { ec } from "elliptic";
import * as ethers from "ethers";
import * as starkwareCrypto from "starkware-crypto";
import { controllers } from "../../controllers";
import StarkExchangeABI from "./contracts/StarkExchangeABI.json";
import {
  StarkAccountResult,
  StarkRegisterResult,
  StarkDepositResult,
  StarkDepositCancelResult,
  Token,
  OrderParams,
  StarkWithdrawalResult,
  StarkCreateOrderResult,
  StarkTransferResult,
  StarkFullWithdrawalResult,
  StarkFreezeResult,
  StarkVerifyEscapeResult,
  StarkDepositReclaimResult,
  TransferParams,
} from "../typings";

export const starkwareMethods = [
  "stark_account",
  "stark_register",
  "stark_deposit",
  "stark_sign",
  "stark_withdraw",
];

interface IGeneratedStarkKeyPairs {
  [index: number]: starkwareCrypto.KeyPair;
}

export const generateStarkKeyPairs: IGeneratedStarkKeyPairs = {};

export function starkwareGetExchangeContract(contractAddress: string) {
  const provider = controllers.wallet.getWallet().provider;
  return new ethers.Contract(contractAddress, StarkExchangeABI, provider);
}

export function starkwareFormatSignature(signature: ec.Signature) {
  return "0x" + signature.r.toString(16) + signature.s.toString(16);
}

export function starkwareGetKeyPair(_index?: number): starkwareCrypto.KeyPair {
  const index: number = typeof _index !== "undefined" ? _index : controllers.wallet.getIndex();
  const match = generateStarkKeyPairs[index];
  if (match) {
    return match;
  }
  const privateKey = controllers.wallet.getWallet(index).privateKey;
  const starkwareKeyPair = starkwareCrypto.getKeyPair(privateKey);
  return starkwareKeyPair;
}

export function starkwareGetStarkPubicKey(index?: number): string {
  const keyPair = starkwareGetKeyPair(index);
  const publicKey = starkwareCrypto.getPublic(keyPair);
  const starkPublicKey = starkwareCrypto.getStarkKey(publicKey);
  return starkPublicKey;
}

export async function starkwareSign(msg: any) {
  const keyPair = starkwareGetKeyPair();
  return starkwareCrypto.sign(keyPair, msg);
}

export async function starkwareVerify(msg: any, signature: any) {
  const keyPair = starkwareGetKeyPair();
  return starkwareCrypto.verify(keyPair, msg, signature);
}

export function starkwareGetRegisterMsg(ethereumAddress: string, starkPublicKey: string) {
  return ethers.utils.keccak256(
    ethers.utils.defaultAbiCoder.encode(["address", "uint256"], [ethereumAddress, starkPublicKey]),
  );
}

// ------------------------- JSON-RPC Methods ------------------------- //

export async function starkwareAccount(
  contractAddress: string,
  index: number,
): Promise<StarkAccountResult> {
  const starkPublicKey = starkwareGetStarkPubicKey(index);
  return { starkPublicKey };
}

export async function starkwareRegister(
  contractAddress: string,
  starkPublicKey: string,
  operatorSignature: string,
): Promise<StarkRegisterResult> {
  const exchangeContract = starkwareGetExchangeContract(contractAddress);
  const { hash: txhash } = await exchangeContract.register(starkPublicKey, operatorSignature);
  return { txhash };
}

export async function starkwareDeposit(
  contractAddress: string,
  starkPublicKey: string,
  quantizedAmount: string,
  token: Token,
  vaultId: string,
): Promise<StarkDepositResult> {
  const exchangeContract = starkwareGetExchangeContract(contractAddress);
  const tokenId = token.data as any;
  const { hash: txhash } = await exchangeContract.deposit(tokenId, vaultId, quantizedAmount);
  return { txhash };
}

export async function starkwareDepositCancel(
  contractAddress: string,
  starkPublicKey: string,
  token: Token,
  vaultId: string,
): Promise<StarkDepositCancelResult> {
  const exchangeContract = starkwareGetExchangeContract(contractAddress);
  const tokenId = token.data as any;
  const { hash: txhash } = await exchangeContract.depositCancel(tokenId, vaultId);
  return { txhash };
}

export async function starkwareDepositReclaim(
  contractAddress: string,
  starkPublicKey: string,
  token: Token,
  vaultId: string,
): Promise<StarkDepositReclaimResult> {
  const exchangeContract = starkwareGetExchangeContract(contractAddress);
  const tokenId = token.data as any;
  const { hash: txhash } = await exchangeContract.depositCancel(tokenId, vaultId);
  return { txhash };
}

export async function starkwareTransfer(
  contractAddress: string,
  from: TransferParams,
  to: TransferParams,
  token: Token,
  quantizedAmount: string,
  nonce: string,
  expirationTimestamp: string,
): Promise<StarkTransferResult> {
  const tokenId = token.data as any;
  const senderVaultId = from.vaultID;
  const receiverVaultId = to.vaultID;
  const receiverPublicKey = to.starkPublicKey;
  const msg = starkwareCrypto.getTransferMsg(
    quantizedAmount,
    nonce,
    senderVaultId,
    tokenId,
    receiverVaultId,
    receiverPublicKey,
    expirationTimestamp,
  );
  const keyPair = starkwareGetKeyPair();
  const signature = starkwareCrypto.sign(keyPair, msg);
  const starkSignature = starkwareFormatSignature(signature);
  return { starkSignature };
}

export async function starkwareCreateOrder(
  contractAddress: string,
  starkPublicKey: string,
  sell: OrderParams,
  buy: OrderParams,
  nonce: string,
  expirationTimestamp: string,
): Promise<StarkCreateOrderResult> {
  const vaultSell = sell.vaultID;
  const vaultBuy = buy.vaultID;
  const amountSell = sell.quantizedAmount;
  const amountBuy = buy.quantizedAmount;
  const tokenSell = sell.token.data as any;
  const tokenBuy = buy.token.data as any;
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
  const keyPair = starkwareGetKeyPair();
  const signature = starkwareCrypto.sign(keyPair, msg);
  const starkSignature = starkwareFormatSignature(signature);
  return { starkSignature };
}

export async function starkwareWithdrawal(
  contractAddress: string,
  token: Token,
): Promise<StarkWithdrawalResult> {
  const exchangeContract = starkwareGetExchangeContract(contractAddress);
  const { hash: txhash } = await exchangeContract.withdrawal(token);
  return { txhash };
}

export async function starkwareFullWithdrawal(
  contractAddress: string,
  vaultId: string,
): Promise<StarkFullWithdrawalResult> {
  const exchangeContract = starkwareGetExchangeContract(contractAddress);
  const { hash: txhash } = await exchangeContract.fullWithdrawal(vaultId);
  return { txhash };
}

export async function starkwareFreeze(
  contractAddress: string,
  vaultId: string,
): Promise<StarkFreezeResult> {
  const exchangeContract = starkwareGetExchangeContract(contractAddress);
  const { hash: txhash } = await exchangeContract.freeze(vaultId);
  return { txhash };
}

export async function starkwareVerifyEscape(
  contractAddress: string,
  proof: string[],
): Promise<StarkVerifyEscapeResult> {
  const exchangeContract = starkwareGetExchangeContract(contractAddress);
  const { hash: txhash } = await exchangeContract.verifyEscape(proof);
  return { txhash };
}

export const starkwareRpc = {
  account: starkwareAccount,
  register: starkwareRegister,
  deposit: starkwareDeposit,
  depositCancel: starkwareDepositCancel,
  depositReclaim: starkwareDepositReclaim,
  transfer: starkwareTransfer,
  createOrder: starkwareCreateOrder,
  withdrawal: starkwareWithdrawal,
  fullWithdrawal: starkwareFullWithdrawal,
  freeze: starkwareFreeze,
  verifyEscape: starkwareVerifyEscape,
};
