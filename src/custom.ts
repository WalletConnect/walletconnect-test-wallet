import connextLogo from "./assets/connext-logo.svg";
import { baseColors } from "./styles";
import { RINKEBY_CHAIN_ID } from "./helpers/constants";

export default {
  name: "Connext",
  logo: connextLogo,
  chainId: RINKEBY_CHAIN_ID,
  colors: {
    defaultColor: baseColors.dark,
    backgroundColor: "231, 171, 75",
  },
  styleOpts: {
    showPasteUri: true,
    showVersion: true,
  },
};
