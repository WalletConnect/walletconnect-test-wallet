import connextLogo from "./assets/connext-logo.svg";
import { RINKEBY_CHAIN_ID, CHANNEL_SUPPORTED_CHAIN_IDS } from "./helpers/constants";

import supportedChains from "./helpers/chains";

export default {
  name: "Connext",
  logo: connextLogo,
  chainId: RINKEBY_CHAIN_ID,
  colors: {
    defaultColor: "12, 12, 13",
    backgroundColor: "231, 171, 75",
  },
  chains: supportedChains.filter(x => CHANNEL_SUPPORTED_CHAIN_IDS.includes(x.chain_id)),
  styleOpts: {
    showPasteUri: true,
    showVersion: true,
  },
};
