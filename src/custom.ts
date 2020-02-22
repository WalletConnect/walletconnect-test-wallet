import walletconnectLogo from "./assets/walletconnect-logo.png";
import { MAINNET_CHAIN_ID } from "./helpers/constants";
import supportedChains from "./helpers/chains";

export default {
  name: "WalletConnect",
  logo: walletconnectLogo,
  chainId: MAINNET_CHAIN_ID,
  colors: {
    defaultColor: "12, 12, 13",
    backgroundColor: "40, 44, 52",
  },
  chains: supportedChains,
  styleOpts: {
    showPasteUri: true,
    showVersion: true,
  },
};
