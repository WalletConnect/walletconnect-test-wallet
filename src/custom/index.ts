import starkwareLogo from "./assets/starkware-logo.svg";

import { convertStringToNumber } from "../helpers/bignumber";
import { ETH_STANDARD_PATH, ROPSTEN_CHAIN_ID } from "../helpers/constants";
import supportedChains from "../helpers/chains";
import { ICustomSettings } from "../helpers/types";

import {
  starkRegistryMap,
  starkwareGetStarkKey,
  starkwareMethods,
  starkwareGenerateKeyPair,
  handleStarkwareMethods,
} from "./helpers/starkware";

export const STARKWARE_SUPPORTED_CHAIN_IDS = Object.keys(starkRegistryMap).map(
  convertStringToNumber,
);

const custom: ICustomSettings = {
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
  rpcController: {
    condition: payload => starkwareMethods.includes(payload.method),
    handler: async (payload, state, setState) => {
      if (!state.connector) {
        return;
      }
      await handleStarkwareMethods(payload, state.connector);
    },
  },
  onInit: async (state, setState) => {
    await starkwareGenerateKeyPair();
    const starkKey = await starkwareGetStarkKey();
    console.log("starkKey", starkKey);
  },
  onUpdate: (state, setState) => Promise.resolve(),
};

export default custom;
