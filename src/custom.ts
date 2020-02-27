import starkwareLogo from "./assets/starkware-logo.svg";

import { ETH_STANDARD_PATH, ROPSTEN_CHAIN_ID } from "./helpers/constants";
import supportedChains from "./helpers/chains";
import { starkRegistryMap, getStarkKey, starkMethods } from "./helpers/starkware";
import { convertStringToNumber } from "./helpers/bignumber";
import { ICustomSettings } from "./helpers/types";

export const STARKWARE_SUPPORTED_CHAIN_IDS = Object.keys(starkRegistryMap).map(
  convertStringToNumber,
);

const custom: ICustomSettings = {
  name: "StarkWare",
  logo: starkwareLogo,
  chainId: ROPSTEN_CHAIN_ID,
  derivationPath: ETH_STANDARD_PATH,
  numberOfAccounts: 3,
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
    condition: payload => starkMethods.includes(payload.method),
    handler: async (payload, state, setState) => {
      if (!state.connector) {
        return;
      }
      switch (payload.method) {
        case "stark_accounts":
          state.connector.approveRequest({
            id: payload.id,
            result: {
              accounts: [],
            },
          });
          break;
        default:
          break;
      }
    },
  },
  onInit: async (state, setState) => {
    const starkKey = await getStarkKey();
    console.log("starkKey", starkKey);
  },
  onUpdate: (state, setState) => Promise.resolve(),
};

export default custom;
