import StarkwareController from "starkware-controller";

import { WalletController, getWalletController } from "./wallet";
import { StoreController, getStoreController } from "./store";
import { getStarkwareController } from "./starkware";

interface IAppControllers {
  store: StoreController;
  wallet: WalletController;
  starkware: StarkwareController;
}

let controllers: IAppControllers | undefined;

export function setupAppControllers(): IAppControllers {
  const wallet = getWalletController();
  const store = getStoreController();
  const starkware = getStarkwareController(wallet, store);
  controllers = { store, wallet, starkware };
  return controllers;
}

export function getAppControllers(): IAppControllers {
  let _controllers = controllers;
  if (!_controllers) {
    _controllers = setupAppControllers();
  }
  return _controllers;
}
