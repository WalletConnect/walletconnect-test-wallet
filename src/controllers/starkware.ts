import BN from "bn.js";
import * as ethers from "ethers";
import * as starkwareCrypto from "starkware-crypto";
import { getAppControllers } from ".";
import StarkExchangeABI from "../contracts/StarkExchangeABI.json";
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
} from "../config/typings";
import { convertAmountFromRawNumber, convertStringToNumber } from "src/helpers/bignumber";
import { getLocal, setLocal } from "src/helpers/local";

interface IStarkwareAccountMapping {
  [path: string]: starkwareCrypto.KeyPair;
}

interface Signature {
  r: BN;
  s: BN;
  recoveryParam: number | null;
}

export class StarkwareController {
  public accountMappingKey = "STARKWARE_ACCOUNT_MAPPING";
  public activeKeyPair: starkwareCrypto.KeyPair | undefined;
  public accountMapping: IStarkwareAccountMapping = getLocal(this.accountMappingKey) || {};

  public async account(path: string): Promise<StarkAccountResult> {
    const starkPublicKey = this.getStarkPublicKey(path);
    return { starkPublicKey };
  }

  public async register(
    contractAddress: string,
    starkPublicKey: string,
    operatorSignature: string,
  ): Promise<StarkRegisterResult> {
    const exchangeContract = this.getExchangeContract(contractAddress);
    const { hash: txhash } = await exchangeContract.register(starkPublicKey, operatorSignature);
    return { txhash };
  }

  public async deposit(
    contractAddress: string,
    starkPublicKey: string,
    quantizedAmount: string,
    token: starkwareCrypto.Token,
    vaultId: string,
  ): Promise<StarkDepositResult> {
    this.assertStarkPublicKey(starkPublicKey);
    const exchangeContract = this.getExchangeContract(contractAddress);
    const tokenId = starkwareCrypto.hashTokenId(token);
    const { hash: txhash } = await exchangeContract.deposit(tokenId, vaultId, quantizedAmount);
    return { txhash };
  }

  public async depositCancel(
    contractAddress: string,
    starkPublicKey: string,
    token: starkwareCrypto.Token,
    vaultId: string,
  ): Promise<StarkDepositCancelResult> {
    this.assertStarkPublicKey(starkPublicKey);
    const exchangeContract = this.getExchangeContract(contractAddress);
    const tokenId = starkwareCrypto.hashTokenId(token);
    const { hash: txhash } = await exchangeContract.depositCancel(tokenId, vaultId);
    return { txhash };
  }

  public async depositReclaim(
    contractAddress: string,
    starkPublicKey: string,
    token: starkwareCrypto.Token,
    vaultId: string,
  ): Promise<StarkDepositReclaimResult> {
    this.assertStarkPublicKey(starkPublicKey);
    const exchangeContract = this.getExchangeContract(contractAddress);
    const tokenId = starkwareCrypto.hashTokenId(token);
    const { hash: txhash } = await exchangeContract.depositReclaim(tokenId, vaultId);
    return { txhash };
  }

  public async transfer(
    contractAddress: string,
    from: starkwareCrypto.TransferParams,
    to: starkwareCrypto.TransferParams,
    token: starkwareCrypto.Token,
    quantizedAmount: string,
    nonce: string,
    expirationTimestamp: string,
  ): Promise<StarkTransferResult> {
    this.assertStarkPublicKey(from.starkPublicKey);
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
    const keyPair = this.getKeyPair();
    const signature = starkwareCrypto.sign(keyPair, msg);
    const starkSignature = this.formatSignature(signature);
    return { starkSignature };
  }

  public async createOrder(
    contractAddress: string,
    starkPublicKey: string,
    sell: starkwareCrypto.OrderParams,
    buy: starkwareCrypto.OrderParams,
    nonce: string,
    expirationTimestamp: string,
  ): Promise<StarkCreateOrderResult> {
    this.assertStarkPublicKey(starkPublicKey);
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
    const keyPair = this.getKeyPair();
    const signature = starkwareCrypto.sign(keyPair, msg);
    const starkSignature = this.formatSignature(signature);
    return { starkSignature };
  }

  public async withdrawal(
    contractAddress: string,
    token: starkwareCrypto.Token,
  ): Promise<StarkWithdrawalResult> {
    const exchangeContract = this.getExchangeContract(contractAddress);
    const tokenId = starkwareCrypto.hashTokenId(token);
    const { hash: txhash } = await exchangeContract.withdraw(tokenId);
    return { txhash };
  }

  public async fullWithdrawal(
    contractAddress: string,
    vaultId: string,
  ): Promise<StarkFullWithdrawalResult> {
    const exchangeContract = this.getExchangeContract(contractAddress);
    const { hash: txhash } = await exchangeContract.fullWithdrawalRequest(vaultId);
    return { txhash };
  }

  public async freeze(contractAddress: string, vaultId: string): Promise<StarkFreezeResult> {
    const exchangeContract = this.getExchangeContract(contractAddress);
    const { hash: txhash } = await exchangeContract.freezeRequest(vaultId);
    return { txhash };
  }

  public async verifyEscape(
    contractAddress: string,
    proof: string[],
  ): Promise<StarkVerifyEscapeResult> {
    const exchangeContract = this.getExchangeContract(contractAddress);
    const { hash: txhash } = await exchangeContract.verifyEscape(proof);
    return { txhash };
  }

  public async escape(
    contractAddress: string,
    starkPublicKey: string,
    vaultId: string,
    token: starkwareCrypto.Token,
    quantizedAmount: string,
  ): Promise<StarkEscapeResult> {
    this.assertStarkPublicKey(starkPublicKey);
    const exchangeContract = this.getExchangeContract(contractAddress);
    const tokenId = starkwareCrypto.hashTokenId(token);
    const { hash: txhash } = await exchangeContract.escape(
      starkPublicKey,
      vaultId,
      tokenId,
      quantizedAmount,
    );
    return { txhash };
  }

  public getExchangeContract(contractAddress: string) {
    const provider = getAppControllers().wallet.getWallet().provider;
    return new ethers.Contract(contractAddress, StarkExchangeABI, provider);
  }

  public formatSignature(signature: Signature) {
    return "0x" + signature.r.toString(16) + signature.s.toString(16);
  }

  public formatLabelPrefix(label: string, labelPrefix?: string) {
    return labelPrefix ? `${labelPrefix} ${label}` : `${label}`;
  }

  public formatTokenLabel(token: starkwareCrypto.Token, labelPrefix?: string) {
    const label = this.formatLabelPrefix("Asset", labelPrefix);
    if (token.type === "ETH") {
      return [{ label, value: "Ether" }];
    } else if (token.type === "ERC20") {
      return [
        { label, value: "ERC20 Token" },
        {
          label: this.formatLabelPrefix("Token Address", labelPrefix),
          value: (token.data as starkwareCrypto.ERC20TokenData).tokenAddress,
        },
      ];
    } else if (token.type === "ERC721") {
      return [
        { label, value: "ERC721 NFT" },
        {
          label: this.formatLabelPrefix("Token ID", labelPrefix),
          value: (token.data as starkwareCrypto.ERC721TokenData).tokenId,
        },
      ];
    } else {
      return [{ label, value: "Unknown" }];
    }
  }

  public formatTokenAmount(quantizedAmount: string, token: starkwareCrypto.Token) {
    let amount = quantizedAmount;
    const quantum =
      (token.data as starkwareCrypto.ERC20TokenData | starkwareCrypto.ETHTokenData).quantum || "0";
    if (quantum) {
      amount = convertAmountFromRawNumber(quantizedAmount, convertStringToNumber(quantum));
    }
    return amount;
  }

  public formatTokenAmountLabel(
    quantizedAmount: string,
    token: starkwareCrypto.Token,
    labelPrefix?: string,
  ) {
    return [
      ...this.formatTokenLabel(token),
      {
        label: this.formatLabelPrefix("Amount", labelPrefix),
        value: this.formatTokenAmount(quantizedAmount, token),
      },
    ];
  }

  public getKeyPair(path?: string): starkwareCrypto.KeyPair {
    if (!path) {
      return this.getActiveKeyPair();
    }
    const match = this.accountMapping[path];
    if (match) {
      return match;
    }
    const activeKeyPair = starkwareCrypto.getKeyPairFromPath(
      getAppControllers().wallet.mnemonic,
      path,
    );
    this.setActiveKeyPair(path, activeKeyPair);
    return activeKeyPair;
  }

  public getStarkPublicKey(path?: string): string {
    const keyPair = this.getKeyPair(path);
    const publicKey = starkwareCrypto.getPublic(keyPair);
    const starkPublicKey = starkwareCrypto.getStarkKey(publicKey);
    return starkPublicKey;
  }

  public assertStarkPublicKey(starkPublicKey: string) {
    if (this.getStarkPublicKey() !== starkPublicKey) {
      throw new Error("StarkPublicKey request does not match active key");
    }
  }

  public setActiveKeyPair(path: string, activeKeyPair: starkwareCrypto.KeyPair) {
    this.activeKeyPair = this.accountMapping[path] = activeKeyPair;
    setLocal(this.accountMappingKey, this.accountMapping[path]);
  }

  public getActiveKeyPair() {
    if (this.activeKeyPair) {
      return this.activeKeyPair;
    } else {
      throw new Error("No Active Starkware KeyPair - please provide a path");
    }
  }
}
