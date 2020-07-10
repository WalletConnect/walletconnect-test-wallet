import { IConnextClient } from "@connext/types";
import * as connext from "@connext/client";

import { prettyPrint, verifyPayload, getChainData } from "./utilities";
import { IAppState } from "../App";
import { getAppControllers } from "src/controllers";

export let activeChannel: IConnextClient;

export async function createChannel(chainId: number) {
  const network = getChainData(chainId).network.toLowerCase();
  const signer = getAppControllers().wallet.wallet.privateKey;
  const channel = await connext.connect(network, { signer });
  activeChannel = channel;
  return channel;
}

export async function onCreateChannelEvent(state: IAppState, setState: any) {
  const { chainId } = state;

  await setState({ loading: true });

  try {
    await createChannel(chainId);
  } catch (e) {
    console.error(e.toString());
    await setState({ loading: false });
    return;
  }

  await setState({ loading: false });
}

export async function handleChannelRequests(payload: any) {
  if (!activeChannel) {
    throw new Error("No Active Channel");
  }
  let result;
  try {
    verifyPayload(payload);
    result = await activeChannel.channelProvider.send(payload.method, payload.params);
  } catch (e) {
    console.error(`Unknown error: ${prettyPrint(e)}`);
  }
  return result;
}
