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

export interface StarkEscapeResult {
  txhash: string;
}
