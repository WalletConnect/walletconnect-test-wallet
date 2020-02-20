import { ethers } from "ethers";
import { CF_PATH } from "@connext/types";
import { HDNode, fromExtendedKey, fromMnemonic } from "ethers/utils/hdnode";
import { getMnemonic } from "./wallet";

let channelWallet: ChannelWallet;

export class ChannelWallet {
  public mainIndex = "0";
  public mnemonic: string;
  public hdNode: HDNode;
  public xpub: string;

  constructor(mnemonic?: string) {
    this.mnemonic = mnemonic || ethers.Wallet.createRandom().mnemonic;
    this.hdNode = fromExtendedKey(fromMnemonic(this.mnemonic).extendedKey).derivePath(CF_PATH);
    this.xpub = this.hdNode.neuter().extendedKey;
  }

  get address(): string {
    return this.hdNode.derivePath(this.mainIndex).address;
  }

  get privateKey(): string {
    return this.hdNode.derivePath(this.mainIndex).privateKey;
  }

  get publicKey(): string {
    return this.hdNode.derivePath(this.mainIndex).publicKey;
  }

  public keyGen(index: string) {
    const res = this.hdNode.derivePath(index);
    return Promise.resolve(res.privateKey);
  }
}

export function getChannelWallet(): ChannelWallet {
  if (!channelWallet) {
    channelWallet = new ChannelWallet(getMnemonic());
  }
  return channelWallet;
}
