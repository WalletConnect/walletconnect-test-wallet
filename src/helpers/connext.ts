import * as connext from "@connext/client";
import ConnextStore from "connext-store";
import { Contract, ethers } from "ethers";
import { AddressZero } from "ethers/constants";
import ERC20Mintable from "../contracts/ERC20Mintable";
import { getLocal, setLocal } from "./local";
import { getMnemonic } from "./wallet";
import { prettyPrint, verifyPayload } from "./utilities";
import { Currency } from "./currency";
// import { toBN } from "./bn";

// const WITHDRAW_ESTIMATED_GAS = toBN("300000");
// const DEPOSIT_ESTIMATED_GAS = toBN("25000");
// const MAX_CHANNEL_VALUE = Currency.DAI("30");

const DEFAULT_COLLATERAL_MINIMUM = Currency.DAI("5");
const DEFAULT_AMOUNT_TO_COLLATERALIZE = Currency.DAI("10");

const SWAP_RATE_KEY = "SWAP_RATE";

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

  await registerChannelSubscriptions(channel, options.ethProviderUrl);

  return channel;
}

export async function registerChannelSubscriptions(
  channel: any,
  ethProviderUrl: string
) {
  const ethProvider = new ethers.providers.JsonRpcProvider(ethProviderUrl);

  const token = new Contract(
    channel.config.contractAddresses.Token,
    ERC20Mintable.abi,
    ethProvider
  );

  const swapRate = await channel.getLatestSwapRate(AddressZero, token.address);

  console.log(`Client created successfully!`); // tslint:disable-line
  console.log(` - Public Identifier: ${channel.publicIdentifier}`); // tslint:disable-line
  console.log(` - Account multisig address: ${channel.opts.multisigAddress}`); // tslint:disable-line
  console.log(` - CF Account address: ${channel.signerAddress}`); // tslint:disable-line
  console.log(` - Free balance address: ${channel.freeBalanceAddress}`); // tslint:disable-line
  console.log(` - Token address: ${token.address}`); // tslint:disable-line
  console.log(` - Swap rate: ${swapRate}`); // tslint:disable-line

  channel.subscribeToSwapRates(AddressZero, token.address, (res: any) => {
    if (!res || !res.swapRate) {
      return;
    }
    // tslint:disable-next-line
    console.log(
      `Got swap rate upate: ${getLocal(SWAP_RATE_KEY)} -> ${res.swapRate}`
    );
    setLocal(SWAP_RATE_KEY, res.swapRate);
  });

  channel.on("RECIEVE_TRANSFER_STARTED", (data: any) => {
    console.log("Received RECIEVE_TRANSFER_STARTED event: ", data); // tslint:disable-line
  });

  channel.on("RECIEVE_TRANSFER_FINISHED", (data: any) => {
    console.log("Received RECIEVE_TRANSFER_FINISHED event: ", data); // tslint:disable-line
  });

  channel.on("RECIEVE_TRANSFER_FAILED", (data: any) => {
    console.log("Received RECIEVE_TRANSFER_FAILED event: ", data); // tslint:disable-line
  });

  const tokenProfile = await channel.addPaymentProfile({
    amountToCollateralize: DEFAULT_AMOUNT_TO_COLLATERALIZE.wad.toString(),
    minimumMaintainedCollateral: DEFAULT_COLLATERAL_MINIMUM.wad.toString(),
    assetId: token.address
  });

  console.log(`Set a default token profile: ${prettyPrint(tokenProfile)}`); // tslint:disable-line
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
