import * as connext from "@connext/client";
import { getChannelWallet } from "./channelWallet";
import { prettyPrint, verifyPayload, getChainData } from "./utilities";

export async function createChannel(chainId: number) {
  const network = getChainData(chainId).network.toLowerCase();
  const channelWallet = getChannelWallet();
  const channel = await connext.connect(network, {
    xpub: channelWallet.xpub,
    keyGen: (index: string) => channelWallet.keyGen(index),
  });
  return channel;
}

export async function handleChannelRequests(payload: any, channel: any) {
  let result;
  try {
    verifyPayload(payload);
    result = await channel.channelProvider.send(payload.method, payload.params);
  } catch (e) {
    console.error(`Unknown error: ${prettyPrint(e)}`);
  }
  return result;
}
