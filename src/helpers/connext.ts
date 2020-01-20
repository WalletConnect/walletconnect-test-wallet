import * as connext from "@connext/client";
import { getMnemonic } from "./wallet";
import { prettyPrint, verifyPayload } from "./utilities";

import { MAINNET_CHAIN_ID, RINKEBY_CHAIN_ID } from "./constants";
import { ClientOptions } from "@connext/types";

export function getChannelUrlOptions(chainId: number) {
  const baseUrl =
    chainId === MAINNET_CHAIN_ID
      ? "indra.connext.network/api"
      : chainId === RINKEBY_CHAIN_ID
      ? "rinkeby.indra.connext.network/api"
      : null;

  if (!baseUrl) {
    throw new Error(`Channel not supported on chainid=${chainId}`);
  }

  console.log("[getChannelUrlOptions]", "baseUrl", baseUrl); // tslint:disable-line

  const urlOptions = {
    ethProviderUrl: `https://${baseUrl}/ethprovider`,
    nodeUrl: `wss://${baseUrl}/messaging`
  };

  return urlOptions;
}

export async function createChannel(chainId: number) {
  console.log("[createChannel]", "chainId", chainId); // tslint:disable-line

  const urlOptions = getChannelUrlOptions(chainId);

  const options: ClientOptions = {
    mnemonic: getMnemonic(),
    ...urlOptions
  };

  console.log("[createChannel]", "options", prettyPrint(options)); // tslint:disable-line

  const channel = await connext.connect(options);

  console.log("[createChannel]", "channel", channel); // tslint:disable-line

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
