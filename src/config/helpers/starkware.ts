import { ec } from "elliptic";
import * as ethers from "ethers";
import * as starkwareCrypto from "starkware-crypto";
import { getAppControllers } from "../../controllers";
import StarkExchangeABI from "./contracts/StarkExchangeABI.json";
import {
  StarkAccountResult,
  StarkRegisterResult,
  StarkDepositResult,
  StarkDepositCancelResult,
  StarkDepositReclaimResult,
  StarkTransferResult,
  StarkCreateOrderResult,
  StarkWithdrawalResult,
  StarkFullWithdrawalResult,
  StarkFreezeResult,
  StarkVerifyEscapeResult,
  StarkEscapeResult,
} from "../typings";
import { convertAmountFromRawNumber, convertStringToNumber } from "src/helpers/bignumber";
import { getLocal, setLocal } from "src/helpers/local";

interface IGeneratedStarkKeyPairs {
  [path: string]: starkwareCrypto.KeyPair;
}
const STARKWARE_ACCOUNT_MAPPING_KEY = "STARKWARE_ACCOUNT_MAPPING";
const generateStarkKeyPairs: IGeneratedStarkKeyPairs =
  getLocal(STARKWARE_ACCOUNT_MAPPING_KEY) || {};

let activeKeyPair: starkwareCrypto.KeyPair;

export function starkwareGetExchangeContract(contractAddress: string) {
  const provider = getAppControllers().wallet.getWallet().provider;
  return new ethers.Contract(contractAddress, StarkExchangeABI, provider);
}

export function starkwareFormatSignature(signature: ec.Signature) {
  return "0x" + signature.r.toString(16) + signature.s.toString(16);
}

export function starkwareFormatLabelPrefix(label: string, labelPrefix?: string) {
  return labelPrefix ? `${labelPrefix} ${label}` : `${label}`;
}

export function starkwareFormatTokenLabel(token: starkwareCrypto.Token, labelPrefix?: string) {
  const label = starkwareFormatLabelPrefix("Asset", labelPrefix);
  if (token.type === "ETH") {
    return [{ label, value: "Ether" }];
  } else if (token.type === "ERC20") {
    return [
      { label, value: "ERC20 Token" },
      {
        label: starkwareFormatLabelPrefix("Token Address", labelPrefix),
        value: (token.data as starkwareCrypto.ERC20TokenData).tokenAddress,
      },
    ];
  } else if (token.type === "ERC721") {
    return [
      { label, value: "ERC721 NFT" },
      {
        label: starkwareFormatLabelPrefix("Token ID", labelPrefix),
        value: (token.data as starkwareCrypto.ERC721TokenData).tokenId,
      },
    ];
  } else {
    return [{ label, value: "Unknown" }];
  }
}

export function starkwareFormatTokenAmount(quantizedAmount: string, token: starkwareCrypto.Token) {
  let amount = quantizedAmount;
  const quantum =
    (token.data as starkwareCrypto.ERC20TokenData | starkwareCrypto.ETHTokenData).quantum || "0";
  if (quantum) {
    amount = convertAmountFromRawNumber(quantizedAmount, convertStringToNumber(quantum));
  }
  return amount;
}

export function starkwareFormatTokenAmountLabel(
  quantizedAmount: string,
  token: starkwareCrypto.Token,
  labelPrefix?: string,
) {
  return [
    ...starkwareFormatTokenLabel(token),
    {
      label: starkwareFormatLabelPrefix("Amount", labelPrefix),
      value: starkwareFormatTokenAmount(quantizedAmount, token),
    },
  ];
}

export function starkwareGetKeyPair(path?: string): starkwareCrypto.KeyPair {
  if (!path) {
    if (activeKeyPair) {
      return activeKeyPair;
    } else {
      throw new Error("No Active Starkware KeyPair");
    }
  }
  const match = generateStarkKeyPairs[path];
  if (match) {
    return match;
  }
  activeKeyPair = starkwareCrypto.getKeyPairFromPath(getAppControllers().wallet.mnemonic, path);
  generateStarkKeyPairs[path] = activeKeyPair;
  setLocal(STARKWARE_ACCOUNT_MAPPING_KEY, generateStarkKeyPairs);
  return activeKeyPair;
}

export function starkwareGetStarkPublicKey(path?: string): string {
  const keyPair = starkwareGetKeyPair(path);
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

export function starkwareAssertStarkPublicKey(starkPublicKey: string) {
  starkwareAssertStarkPublicKey(starkPublicKey);
}

// ------------------------- JSON-RPC Methods ------------------------- //

export async function starkwareAccount(path: string): Promise<StarkAccountResult> {
  const starkPublicKey = starkwareGetStarkPublicKey(path);
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
  token: starkwareCrypto.Token,
  vaultId: string,
): Promise<StarkDepositResult> {
  starkwareAssertStarkPublicKey(starkPublicKey);
  const exchangeContract = starkwareGetExchangeContract(contractAddress);
  const tokenId = starkwareCrypto.hashTokenId(token);
  const { hash: txhash } = await exchangeContract.deposit(tokenId, vaultId, quantizedAmount);
  return { txhash };
}

export async function starkwareDepositCancel(
  contractAddress: string,
  starkPublicKey: string,
  token: starkwareCrypto.Token,
  vaultId: string,
): Promise<StarkDepositCancelResult> {
  starkwareAssertStarkPublicKey(starkPublicKey);
  const exchangeContract = starkwareGetExchangeContract(contractAddress);
  const tokenId = starkwareCrypto.hashTokenId(token);
  const { hash: txhash } = await exchangeContract.depositCancel(tokenId, vaultId);
  return { txhash };
}

export async function starkwareDepositReclaim(
  contractAddress: string,
  starkPublicKey: string,
  token: starkwareCrypto.Token,
  vaultId: string,
): Promise<StarkDepositReclaimResult> {
  starkwareAssertStarkPublicKey(starkPublicKey);
  const exchangeContract = starkwareGetExchangeContract(contractAddress);
  const tokenId = starkwareCrypto.hashTokenId(token);
  const { hash: txhash } = await exchangeContract.depositReclaim(tokenId, vaultId);
  return { txhash };
}

export async function starkwareTransfer(
  contractAddress: string,
  from: starkwareCrypto.TransferParams,
  to: starkwareCrypto.TransferParams,
  token: starkwareCrypto.Token,
  quantizedAmount: string,
  nonce: string,
  expirationTimestamp: string,
): Promise<StarkTransferResult> {
  starkwareAssertStarkPublicKey(from.starkPublicKey);
  const senderVaultId = from.vaultId;
  const receiverVaultId = to.vaultId;
  const receiverPublicKey = to.starkPublicKey;
  const msg = starkwareCrypto.getTransferMsg(
    quantizedAmount,
    nonce,
    senderVaultId,
    token,
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
  sell: starkwareCrypto.OrderParams,
  buy: starkwareCrypto.OrderParams,
  nonce: string,
  expirationTimestamp: string,
): Promise<StarkCreateOrderResult> {
  starkwareAssertStarkPublicKey(starkPublicKey);
  const vaultSell = sell.vaultId;
  const vaultBuy = buy.vaultId;
  const amountSell = sell.quantizedAmount;
  const amountBuy = buy.quantizedAmount;
  const tokenSell = sell.token;
  const tokenBuy = buy.token;
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
  token: starkwareCrypto.Token,
): Promise<StarkWithdrawalResult> {
  const exchangeContract = starkwareGetExchangeContract(contractAddress);
  const tokenId = starkwareCrypto.hashTokenId(token);
  const { hash: txhash } = await exchangeContract.withdraw(tokenId);
  return { txhash };
}

export async function starkwareFullWithdrawal(
  contractAddress: string,
  vaultId: string,
): Promise<StarkFullWithdrawalResult> {
  const exchangeContract = starkwareGetExchangeContract(contractAddress);
  const { hash: txhash } = await exchangeContract.fullWithdrawalRequest(vaultId);
  return { txhash };
}

export async function starkwareFreeze(
  contractAddress: string,
  vaultId: string,
): Promise<StarkFreezeResult> {
  const exchangeContract = starkwareGetExchangeContract(contractAddress);
  const { hash: txhash } = await exchangeContract.freezeRequest(vaultId);
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

export async function starkwareEscape(
  contractAddress: string,
  starkPublicKey: string,
  vaultId: string,
  token: starkwareCrypto.Token,
  quantizedAmount: string,
): Promise<StarkEscapeResult> {
  starkwareAssertStarkPublicKey(starkPublicKey);
  const exchangeContract = starkwareGetExchangeContract(contractAddress);
  const tokenId = starkwareCrypto.hashTokenId(token);
  const { hash: txhash } = await exchangeContract.escape(
    starkPublicKey,
    vaultId,
    tokenId,
    quantizedAmount,
  );
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
  escape: starkwareEscape,
};
