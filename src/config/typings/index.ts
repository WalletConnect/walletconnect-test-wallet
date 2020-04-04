export interface StarkAccountResult {
  starkPublicKey: string;
}

export interface StarkRegisterResult {
  txhash: string;
}

export interface StarkDepositResult {
  txhash: string;
}

export interface StarkDepositCancelResult {
  txhash: string;
}

export interface StarkDepositReclaimResult {
  txhash: string;
}

export interface StarkTransferResult {
  starkSignature: string;
}

export interface StarkCreateOrderResult {
  starkSignature: string;
}

export interface StarkWithdrawalResult {
  txhash: string;
}

export interface StarkFullWithdrawalResult {
  txhash: string;
}

export interface StarkFreezeResult {
  txhash: string;
}

export interface StarkVerifyEscapeResult {
  txhash: string;
}

export interface ETHTokenData {
  quantum: string;
}

export interface ERC20TokenData {
  quantum: string;
  tokenAddress: string;
}

export interface ERC721TokenData {
  tokenId: string;
  tokenAddress: string;
}

export interface Token {
  type: string;
  data: ETHTokenData | ERC20TokenData | ERC721TokenData;
}

export interface TransferParams {
  starkPublicKey: string;
  vaultID: string;
}

export interface OrderParams {
  vaultID: string;
  token: Token;
  quantizedAmount: string;
}
