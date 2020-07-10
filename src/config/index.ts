import connextLogo from "./assets/connext-logo.svg";

import {
  RINKEBY_CHAIN_ID,
  MAINNET_CHAIN_ID,
  SUPPORTED_CHAINS,
  ETH_STANDARD_PATH,
} from "../constants";
import { IAppConfig } from "../helpers/types";
import { onCreateChannelEvent } from "../helpers/connext";
import { getRpcEngine } from "../engines";

export const CHANNEL_SUPPORTED_CHAIN_IDS = [MAINNET_CHAIN_ID, RINKEBY_CHAIN_ID];

const appConfig: IAppConfig = {
  name: "Connext",
  logo: connextLogo,
  chainId: RINKEBY_CHAIN_ID,
  derivationPath: ETH_STANDARD_PATH,
  numberOfAccounts: 1,
  colors: {
    defaultColor: "12, 12, 13",
    backgroundColor: "231, 171, 75",
  },
  chains: SUPPORTED_CHAINS.filter(x => CHANNEL_SUPPORTED_CHAIN_IDS.includes(x.chain_id)),
  styleOpts: {
    showPasteUri: true,
    showVersion: true,
  },
  rpcEngine: getRpcEngine(),
  events: {
    init: (state, setState) => onCreateChannelEvent(state, setState),
    update: (state, setState) => onCreateChannelEvent(state, setState),
  },
};

export function getAppConfig(): IAppConfig {
  return appConfig;
}
