import starkwareLogo from "./assets/starkware-logo.svg";

import { ETH_STANDARD_PATH, ROPSTEN_CHAIN_ID } from "./helpers/constants";
import supportedChains from "./helpers/chains";
import { starkRegistryMap } from "./helpers/starkware";
import { convertStringToNumber } from "./helpers/bignumber";

export const STARKWARE_SUPPORTED_CHAIN_IDS = Object.keys(starkRegistryMap).map(
  convertStringToNumber,
);

export default {
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
};
