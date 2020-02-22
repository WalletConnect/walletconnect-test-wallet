import starkwareLogo from "./assets/starkware-logo.svg";
import { MAINNET_CHAIN_ID } from "./helpers/constants";
import supportedChains from "./helpers/chains";

export default {
  name: "StarkWare",
  logo: starkwareLogo,
  chainId: MAINNET_CHAIN_ID,
  colors: {
    defaultColor: "40, 40, 110",
    backgroundColor: "25, 24, 46",
  },
  chains: supportedChains.filter(x => x.native_currency.name.toLowerCase() === "ether"),
  styleOpts: {
    showPasteUri: false,
    showVersion: false,
  },
};
