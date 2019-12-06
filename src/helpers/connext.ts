import * as connext from "@connext/client";

import { cfStore } from "./store";
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
    store: cfStore
  };
  const channel = await connext.connect(options);
  // before returning wait until channel is available
  const channelIsAvailable = async () => {
    const chan = await channel.getChannel();
    return chan && chan.available;
  };
  // TODO: add timeout logic
  while (!(await channelIsAvailable())) {
    await new Promise((res, rej) => setTimeout(res, 300));
  }
  return channel;
}
