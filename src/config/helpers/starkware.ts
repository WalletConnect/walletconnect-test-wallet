import * as ethers from "ethers";
import * as starkwareCrypto from "starkware-crypto";
import { getWallet, signMessage } from "../../helpers/wallet";
import { IStarkwareRegistryMap } from "../typings";
import ERC20TokenABI from "./contracts/ERC20TokenABI.json";
import StarkExchangeABI from "./contracts/StarkExchangeABI.json";
import { convertAmountToRawNumber } from "src/helpers/bignumber";

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

export function getERC20TokenDecimals(tokenAddress: string) {
  const provider = getWallet().provider;
  const tokenContract = new ethers.Contract(tokenAddress, ERC20TokenABI, provider);
  const decimals = tokenContract.decimals();
  return decimals;
}

export async function starkwareGetExchangeContract(): Promise<ethers.Contract> {
  const provider = getWallet().provider;
  const { chainId } = await provider.getNetwork();
  const contractAddress = starkRegistryMap[chainId];
  if (!contractAddress) {
    throw new Error(`No StarkExchange Contract found for chainId: ${chainId}`);
  }
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

export async function starkwareRegister() {
  const wallet = getWallet();
  const starkKey = starkwareGetStarkKey();
  const msg = starkwareGetRegisterMsg(wallet.address, starkKey);
  const sig = await signMessage(msg);
  const exchangeContract = await starkwareGetExchangeContract();
  const { hash: txhash } = await exchangeContract.register(starkKey, sig);
  const accounts = await starkwareGetAccounts();
  return { accounts, txhash };
}

export async function starkwareDeposit(amount: string, token: string, vaultId: string) {
  const decimals = getERC20TokenDecimals(token);
  const quantizedAmount = convertAmountToRawNumber(amount, decimals);
  const exchangeContract = starkwareGetExchangeContract();
  // TODO: research where to find vaultId
  // @ts-ignore
  const { hash: txhash } = await exchangeContract.deposit(token, vaultId, quantizedAmount);
  return { txhash };
}

export async function starkwareWithdraw(token: string) {
  const exchangeContract = starkwareGetExchangeContract();
  // @ts-ignore
  const { hash: txhash } = await exchangeContract.withdraw(token);
  return { txhash };
}

export async function starkwareSign(msg: any) {
  const keyPair = starkwareGetKeyPair();
  return starkwareCrypto.sign(keyPair, msg);
}

export async function starkwareVerify(msg: any, sig: any) {
  const keyPair = starkwareGetKeyPair();
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
