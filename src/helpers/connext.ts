import * as connext from "@connext/client";
import { getMnemonic } from "./wallet";
import { prettyPrint, verifyPayload, getChainData } from "./utilities";

export async function createChannel(chainId: number) {
  console.log("[createChannel]", "chainId", chainId);
  const network = getChainData(chainId).network.toLowerCase();
  console.log("[createChannel]", "network", network);
  const mnemonic = getMnemonic();
  const channel = await connext.connect(network, { mnemonic });
  console.log("[createChannel]", "channel", channel);
  return channel;
}

export async function handleChannelRequests(payload: any, channel: any) {
  let result;
  console.log("[handleChannelRequests]", "method", payload.method);
  console.log("[handleChannelRequests]", "params", prettyPrint(payload.params));
  try {
    verifyPayload(payload);
    result = await channel.channelProvider.send(payload.method, payload.params);
  } catch (e) {
    console.error(`Unknown error: ${prettyPrint(e)}`);
  }
  console.log("[handleChannelRequests]", "result", prettyPrint(result));
  return result;
}
