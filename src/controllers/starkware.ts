import StarkwareController from "starkware-controller";
import { Wallet } from "ethers";

import { StoreController } from "./store";
import { WalletController } from "./wallet";

export function getStarkwareController(
  walletController: WalletController,
  storeController: StoreController,
) {
  const wallet = Wallet.fromMnemonic(walletController.mnemonic).connect(walletController.provider);
  return new StarkwareController(wallet, storeController);
}
