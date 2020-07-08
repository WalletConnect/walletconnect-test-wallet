import StarkwareController from "starkware-controller";

import { StoreController } from "./store";
import { WalletController } from "./wallet";

export function getStarkwareController(
  walletController: WalletController,
  storeController: StoreController,
) {
  return new StarkwareController(walletController.wallet, storeController);
}
