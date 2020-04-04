import starkwareLogo from "./assets/starkware-logo.svg";

import { ETH_STANDARD_PATH, ROPSTEN_CHAIN_ID } from "../helpers/constants";
import supportedChains from "../helpers/chains";
import { IAppConfig } from "../helpers/types";
import RpcEngine from "./rpcEngine";
import ethereum from "src/config/rpcEngine/ethereum";
import starkware from "src/config/rpcEngine/starkware";

import { starkwareGetStarkPubicKey } from "./helpers/starkware";

export const STARKWARE_SUPPORTED_CHAIN_IDS = [1, 3, 4];

const appConfig: IAppConfig = {
  name: "StarkWare",
  logo: starkwareLogo,
  chainId: ROPSTEN_CHAIN_ID,
  derivationPath: ETH_STANDARD_PATH,
  numberOfAccounts: 1,
  colors: {
    defaultColor: "40, 40, 110",
    backgroundColor: "25, 24, 46",
  },
  chains: supportedChains.filter(x => STARKWARE_SUPPORTED_CHAIN_IDS.includes(x.chain_id)),
  styleOpts: {
    showPasteUri: false,
    showVersion: false,
  },
  rpcEngine: new RpcEngine([starkware, ethereum]),
  events: {
    init: async (state, setState) => {
      const starkPublicKey = starkwareGetStarkPubicKey();
      console.log("starkPublicKey", starkPublicKey);
    },
    update: (state, setState) => Promise.resolve(),
  },
};

export default appConfig;
