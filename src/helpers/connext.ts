import * as connext from "@connext/client";

import { connextStore } from "./store";
import { getMnemonic } from "./wallet";

export async function createChannel(chainId: number) {
  const baseUrl =
    chainId === 1
      ? "indra.connext.network/api"
      : chainId === 4
      ? "rinkeby.indra.connext.network/api"
      : null;

  if (!baseUrl) {
    throw new Error(`Channel not supported on chainid=${chainId}`);
  }

  const options = {
    mnemonic: getMnemonic(),
    nodeUrl: `wss://${baseUrl}/messaging`,
    ethProviderUrl: `https://${baseUrl}/ethprovider`,
    store: connextStore
  };
  const channel = await connext.connect(options);
  return channel;
}
