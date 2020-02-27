import { CF_PATH } from "@connext/types";

import connextLogo from "./assets/connext-logo.svg";

import { IAppState } from "../App";
import { RINKEBY_CHAIN_ID, MAINNET_CHAIN_ID } from "../helpers/constants";
import { createChannel } from "./helpers/connext";
import supportedChains from "../helpers/chains";
import { IAppConfig } from "../helpers/types";
import RpcEngine from "./rpcEngine";
import ethereum from "src/config/rpcEngine/ethereum";
import connext from "src/config/rpcEngine/connext";

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
    init: (state, setState) => onCreateChannel(state, setState),
    update: (state, setState) => onCreateChannel(state, setState),
  },
};

async function onCreateChannel(state: IAppState, setState: any) {
  const { chainId } = state;

  await setState({ loading: true });

  try {
    await createChannel(chainId);
  } catch (e) {
    console.error(e.toString());
    await setState({ loading: false });
    return;
  }

  await setState({ loading: false });
}

export default appConfig;
