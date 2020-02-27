import walletconnectLogo from "./assets/walletconnect-logo.png";
import { MAINNET_CHAIN_ID, ETH_STANDARD_PATH } from "./helpers/constants";
import supportedChains from "./helpers/chains";

export default {
  name: "WalletConnect",
  logo: walletconnectLogo,
  chainId: MAINNET_CHAIN_ID,
  derivationPath: ETH_STANDARD_PATH,
  numberOfAccounts: 3,
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
