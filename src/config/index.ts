import { CF_PATH } from "@connext/types";

import connextLogo from "./assets/connext-logo.svg";

import { RINKEBY_CHAIN_ID, MAINNET_CHAIN_ID } from "../helpers/constants";
import supportedChains from "../helpers/chains";
import { IAppConfig } from "../helpers/types";
import RpcEngine from "./rpcEngine";
import ethereum from "./rpcEngine/ethereum";
import connext from "./rpcEngine/connext";
import { onCreateChannelEvent } from "./helpers";

export const CHANNEL_SUPPORTED_CHAIN_IDS = [MAINNET_CHAIN_ID, RINKEBY_CHAIN_ID];

const appConfig: IAppConfig = {
  name: "Connext",
  logo: connextLogo,
  chainId: RINKEBY_CHAIN_ID,
  derivationPath: CF_PATH,
  numberOfAccounts: 1,
  colors: {
    defaultColor: "12, 12, 13",
    backgroundColor: "231, 171, 75",
  },
  chains: supportedChains.filter(x => CHANNEL_SUPPORTED_CHAIN_IDS.includes(x.chain_id)),
  styleOpts: {
    showPasteUri: true,
    showVersion: true,
  },
  rpcEngine: new RpcEngine([connext, ethereum]),
  events: {
    init: (state, setState) => onCreateChannelEvent(state, setState),
    update: (state, setState) => onCreateChannelEvent(state, setState),
  },
};

export function getAppConfig(): IAppConfig {
  return appConfig;
}
