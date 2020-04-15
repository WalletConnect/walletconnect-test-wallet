import { WalletController } from "./wallet";

interface IAppControllers {
  wallet: WalletController;
}

let controllers: IAppControllers | undefined;

export function setupAppControllers(): IAppControllers {
  controllers = {
    wallet: new WalletController(),
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
