import { IRpcEngine } from "../../helpers/types";
import { starkwareMethods, starkwareGetStarkPubicKey, starkwareRpc } from "../helpers/starkware";
import { IAppState } from "src/App";

function filterStarkwareRequests(payload: any) {
  return starkwareMethods.includes(payload.method);
}

async function routeStarkwareRequests(payload: any, state: IAppState, setState: any) {
  if (!state.connector) {
    return;
  }
  if (payload.method === "stark_account") {
    state.connector.approveRequest({
      id: payload.id,
      result: await starkwareRpc.account(payload.params.contractAddress, payload.params.index),
    });
  } else {
    const requests = state.requests;
    requests.push(payload);
    await setState({ requests });
  }
}

function renderStarkwareRequests(payload: any) {
  let params = [{ label: "StarkPublicKey", value: starkwareGetStarkPubicKey() }];

  switch (payload.method) {
    case "stark_register":
      params = [...params, { label: "Signature", value: payload.params.signature }];
      break;

    case "stark_deposit":
      params = [
        ...params,
        { label: "Token", value: payload.params.token },
        { label: "Amount", value: payload.params.amount },
      ];
      break;
    case "stark_transfer":
      params = [
        ...params,
        { label: "amount", value: payload.params.amount },
        { label: "nonce", value: payload.params.nonce },
        { label: "senderVaultId", value: payload.params.senderVaultId },
        { label: "token", value: payload.params.token },
        { label: "receiverVaultId", value: payload.params.receiverVaultId },
        { label: "receiverPublicKey", value: payload.params.receiverPublicKey },
        { label: "expirationTimestamp", value: payload.params.expirationTimestamp },
      ];
      break;
    default:
      params = [
        ...params,
        { label: "vaultSell", value: payload.params.vaultSell },
        { label: "vaultBuy", value: payload.params.vaultBuy },
        { label: "amountSell", value: payload.params.amountSell },
        { label: "amountBuy", value: payload.params.amountBuy },
        { label: "tokenSell", value: payload.params.tokenSell },
        { label: "tokenBuy", value: payload.params.tokenBuy },
        { label: "nonce", value: payload.params.nonce },
        { label: "expirationTimestamp", value: payload.params.expirationTimestamp },
      ];
      break;
  }
  return params;
}

async function signStarkwareRequests(payload: any, state: IAppState, setState: any) {
  if (!state.connector) {
    return;
  }
  const { connector } = state;
  const { id, method, params } = payload;
  switch (method) {
    case "stark_register":
      // TODO: Display register screen
      connector.approveRequest({
        id,
        result: await starkwareRpc.register(params.signature, params.contractAddress),
      });
      break;
    case "stark_deposit":
      // TODO: Display deposit screen
      connector.approveRequest({
        id,
        result: await starkwareRpc.deposit(
          params.amount,
          params.token,
          params.vaultdId,
          params.contractAddress,
        ),
      });
      break;
    case "stark_transfer":
      // TODO: Display deposit screen
      connector.approveRequest({
        id,
        result: await starkwareRpc.transfer(
          params.amount,
          params.nonce,
          params.senderVaultId,
          params.token,
          params.receiverVaultId,
          params.receiverPublicKey,
          params.expirationTimestamp,
        ),
      });
      break;
    case "stark_createOrder":
      connector.approveRequest({
        id,
        result: await starkwareRpc.createOrder(
          params.vaultSell,
          params.vaultBuy,
          params.amountSell,
          params.amountBuy,
          params.tokenSell,
          params.tokenBuy,
          params.nonce,
          params.expirationTimestamp,
        ),
      });
      break;
    case "stark_withdraw":
      connector.approveRequest({
        id,
        result: await starkwareRpc.withdraw(params.token, params.contractAddress),
      });
      break;
    default:
      throw new Error(`Unknown Starkware RPC Method: ${method}`);
  }
}

const starkware: IRpcEngine = {
  filter: filterStarkwareRequests,
  router: routeStarkwareRequests,
  render: renderStarkwareRequests,
  signer: signStarkwareRequests,
};

export default starkware;
