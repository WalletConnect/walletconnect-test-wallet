import StarkwareWallet from "starkware-wallet";

import { StoreController } from "./store";
import { WalletController } from "./wallet";

export function getStarkwareController(
  walletController: WalletController,
  storeController: StoreController,
) {
  return new StarkwareWallet(walletController.wallet, storeController);
}
