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

export const starkwareMethods = [
  "stark_account",
  "stark_register",
  "stark_deposit",
  "stark_depositCancel",
  "stark_depositReclaim",
  "stark_transfer",
  "stark_createOrder",
  "stark_withdrawal",
  "stark_fullWithdrawal",
  "stark_freeze",
  "stark_verifyEscape",
  "stark_escape",
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
  token: starkwareCrypto.Token,
  vaultId: string,
): Promise<StarkDepositResult> {
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
