import { toWei } from "./utilities";

export const DEFAULT_COLLATERAL_MINIMUM = toWei("5");
export const DEFAULT_AMOUNT_TO_COLLATERALIZE = toWei("10");

export const MAINNET_CHAIN_ID = 1;
export const RINKEBY_CHAIN_ID = 4;
export const DEFAULT_CHAIN_ID = RINKEBY_CHAIN_ID;

export const CHANNEL_SUPPORTED_CHAIN_IDS = [MAINNET_CHAIN_ID, RINKEBY_CHAIN_ID];
