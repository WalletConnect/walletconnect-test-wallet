import walletconnectLogo from "./assets/walletconnect-logo.png";
import { baseColors } from "./styles";
import { MAINNET_CHAIN_ID } from "./helpers/constants";

export default {
  name: "WalletConnect",
  logo: walletconnectLogo,
  chainId: MAINNET_CHAIN_ID,
  colors: {
    defaultColor: baseColors.dark,
    backgroundColor: "40, 44, 52",
  },
  styleOpts: {
    showPasteUri: true,
    showVersion: true,
  },
};
