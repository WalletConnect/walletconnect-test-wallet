import * as connext from "@connext/client";
import ConnextStore from "connext-store";
import { getMnemonic } from "./wallet";
import { prettyPrint, verifyPayload } from "./utilities";

import {
  DEFAULT_COLLATERAL_MINIMUM,
  DEFAULT_AMOUNT_TO_COLLATERALIZE,
  MAINNET_CHAIN_ID,
  RINKEBY_CHAIN_ID
} from "./constants";

export function getChannelBaseUrl(chainId: number) {
  const baseUrl =
    chainId === MAINNET_CHAIN_ID
      ? "indra.connext.network/api"
      : chainId === RINKEBY_CHAIN_ID
      ? "rinkeby.indra.connext.network/api"
      : null;

  if (!baseUrl) {
    throw new Error(`Channel not supported on chainid=${chainId}`);
  }
  return baseUrl;
}

export async function createChannel(chainId: number) {
  console.log("[createChannel]", "chainId", chainId); // tslint:disable-line

  const baseUrl = getChannelBaseUrl(chainId);

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

  const tokenProfile = await channel.addPaymentProfile({
    minimumMaintainedCollateral: DEFAULT_AMOUNT_TO_COLLATERALIZE,
    amountToCollateralize: DEFAULT_COLLATERAL_MINIMUM,
    assetId: channel.config.contractAddresses.Token
  });

  // tslint:disable-next-line
  console.log(
    `Created channel with tokenProfile: ${prettyPrint(tokenProfile)}`
  );

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
