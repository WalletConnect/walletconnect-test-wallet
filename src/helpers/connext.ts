import * as connext from "@connext/client";
import ConnextStore from "connext-store";
import { getMnemonic } from "./wallet";
import { prettyPrint, verifyPayload } from "./utilities";

export async function createChannel(chainId: number) {
  console.log("[createChannel]", "chainId", chainId); // tslint:disable-line
  const baseUrl =
    chainId === 1
      ? "indra.connext.network/api"
      : chainId === 4
      ? "rinkeby.indra.connext.network/api"
      : null;

  if (!baseUrl) {
    throw new Error(`Channel not supported on chainid=${chainId}`);
  }

  console.log("[createChannel]", "baseUrl", baseUrl); // tslint:disable-line

  const options = {
    mnemonic: getMnemonic(),
    nodeUrl: `wss://${baseUrl}/messaging`,
    ethProviderUrl: `https://${baseUrl}/ethprovider`,
    store: new ConnextStore(window.localStorage)
  };

  const channel = await connext.connect(options);

  console.log("[createChannel]", "channel", channel); // tslint:disable-line

  await channel.isAvailable();

  console.log("[createChannel]", "isAvailable", true); // tslint:disable-line

  return channel;
}

export async function handleChannelRequests(payload: any, channel: any) {
  let result;
  try {
    verifyPayload(payload);

    result = await channel.channelProvider.send(payload.method, payload.params);
  } catch (e) {
    console.error(`Unknown error: ${prettyPrint(e)}`); // tslint:disable-line
  }
  console.log("[handleChannelRequests]", "result", result); // tslint:disable-line
  return result;
}
