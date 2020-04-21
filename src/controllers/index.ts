import { WalletController } from "./wallet";
import { StarkwareController } from "./starkware";

interface IAppControllers {
  wallet: WalletController;
  starkware: StarkwareController;
}

let controllers: IAppControllers | undefined;

export function setupAppControllers(): IAppControllers {
  controllers = {
    wallet: new WalletController(),
    starkware: new StarkwareController(),
  };
  return controllers;
}

export function getAppControllers(): IAppControllers {
  let _controllers = controllers;
  if (!_controllers) {
    _controllers = setupAppControllers();
  }
  return _controllers;
}
