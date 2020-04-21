import { WalletController } from "./wallet";
import { StarkwareController } from "./starkware";

interface IAppControllers {
  wallet: WalletController;
  starkware: StarkwareController;
}

let controllers: IAppControllers | undefined;

export function setupAppControllers(): IAppControllers {
  const wallet = new WalletController();
  const starkware = new StarkwareController(wallet);
  controllers = { wallet, starkware };
  return controllers;
}

export function getAppControllers(): IAppControllers {
  let _controllers = controllers;
  if (!_controllers) {
    _controllers = setupAppControllers();
  }
  return _controllers;
}
