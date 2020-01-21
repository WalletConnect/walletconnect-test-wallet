import * as connext from "@connext/client";
import { getMnemonic } from "./wallet";
import { prettyPrint, verifyPayload, getChainData } from "./utilities";

export async function createChannel(chainId: number) {
  console.log("[createChannel]", "chainId", chainId); // tslint:disable-line
  const network = getChainData(chainId).network.toLowerCase();
  console.log("[createChannel]", "network", network); // tslint:disable-line
  const mnemonic = getMnemonic();
  const channel = await connext.connect(network, { mnemonic });
  console.log("[createChannel]", "channel", channel); // tslint:disable-line
  return channel;
}

export async function handleChannelRequests(payload: any, channel: any) {
  let result;
  console.log("[handleChannelRequests]", "method", payload.method); // tslint:disable-line
  console.log("[handleChannelRequests]", "params", prettyPrint(payload.params)); // tslint:disable-line
  try {
    verifyPayload(payload);
    result = await channel.channelProvider.send(payload.method, payload.params);
  } catch (e) {
    console.error(`Unknown error: ${prettyPrint(e)}`); // tslint:disable-line
  }
  console.log("[handleChannelRequests]", "result", prettyPrint(result)); // tslint:disable-line
  return result;
}
