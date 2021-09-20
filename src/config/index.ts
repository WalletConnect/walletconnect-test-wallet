import walletconnectLogo from "./assets/walletconnect-logo.png";
import { SUPPORTED_CHAINS, ETH_STANDARD_PATH, KOVAN_CHAIN_ID } from "../constants";
import { IAppConfig } from "../helpers/types";
import { getRpcEngine } from "../engines";

const appConfig: IAppConfig = {
  name: "WalletConnect",
  logo: walletconnectLogo,
  chainId: KOVAN_CHAIN_ID,
  derivationPath: ETH_STANDARD_PATH,
  numberOfAccounts: 3,
  colors: {
    defaultColor: "12, 12, 13",
    backgroundColor: "40, 44, 52",
  },
  chains: SUPPORTED_CHAINS,
  styleOpts: {
    showPasteUri: true,
    showVersion: true,
  },
  rpcEngine: getRpcEngine(),
  events: {
    init: (state, setState) => Promise.resolve(),
    update: (state, setState) => Promise.resolve(),
  },
};

export function getAppConfig(): IAppConfig {
  return appConfig;
}
