import connextLogo from "./assets/connext-logo.svg";
import { CF_PATH } from "@connext/types";
import { RINKEBY_CHAIN_ID, MAINNET_CHAIN_ID } from "./helpers/constants";

import supportedChains from "./helpers/chains";
import { ICustomSettings } from "./helpers/types";
import { handleChannelRequests } from "./helpers/connext";

export const CHANNEL_SUPPORTED_CHAIN_IDS = [MAINNET_CHAIN_ID, RINKEBY_CHAIN_ID];

const custom: ICustomSettings = {
  name: "Connext",
  logo: connextLogo,
  chainId: RINKEBY_CHAIN_ID,
  derivationPath: CF_PATH,
  numberOfAccounts: 1,
  colors: {
    defaultColor: "12, 12, 13",
    backgroundColor: "231, 171, 75",
  },
  chains: supportedChains.filter(x => CHANNEL_SUPPORTED_CHAIN_IDS.includes(x.chain_id)),
  styleOpts: {
    showPasteUri: true,
    showVersion: true,
  },
  rpcController: {
    condition: payload => payload.method.startsWith("chan_"),
    handler: (payload, state, setState) =>
      handleChannelRequests(payload, state.channel)
        .then(result =>
          state.connector?.approveRequest({
            id: payload.id,
            result,
          }),
        )
        .catch(e =>
          state.connector?.rejectRequest({
            id: payload.id,
            error: { message: e.message },
          }),
        ),
  },
};

export default custom;
