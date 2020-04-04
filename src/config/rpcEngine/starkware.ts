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
      connector.approveRequest({
        id,
        result: await starkwareRpc.register(
          params.contractAddress,
          params.StarkPublicKey,
          params.operatorSignature,
        ),
      });
      break;
    case "stark_deposit":
      connector.approveRequest({
        id,
        result: await starkwareRpc.deposit(
          params.contractAddress,
          params.StarkPublicKey,
          params.quantizedAmount,
          params.token,
          params.vaultId,
        ),
      });
      break;
    case "stark_depositCancel":
      connector.approveRequest({
        id,
        result: await starkwareRpc.depositCancel(
          params.contractAddress,
          params.StarkPublicKey,
          params.token,
          params.vaultId,
        ),
      });
      break;
    case "stark_depositReclaim":
      connector.approveRequest({
        id,
        result: await starkwareRpc.depositReclaim(
          params.contractAddress,
          params.StarkPublicKey,
          params.token,
          params.vaultId,
        ),
      });
      break;
    case "stark_transfer":
      connector.approveRequest({
        id,
        result: await starkwareRpc.transfer(
          params.contractAddress,
          params.from,
          params.to,
          params.token,
          params.quantizedAmount,
          params.nonce,
          params.expirationTimestamp,
        ),
      });
      break;
    case "stark_createOrder":
      connector.approveRequest({
        id,
        result: await starkwareRpc.createOrder(
          params.contractAddress,
          params.starkPublicKey,
          params.sell,
          params.buy,
          params.nonce,
          params.expirationTimestamp,
        ),
      });
      break;
    case "stark_withdrawal":
      connector.approveRequest({
        id,
        result: await starkwareRpc.withdrawal(params.contractAddress, params.token),
      });
      break;
    case "stark_fullWithdrawal":
      connector.approveRequest({
        id,
        result: await starkwareRpc.fullWithdrawal(params.contractAddress, params.vaultId),
      });
      break;
    case "stark_freeze":
      connector.approveRequest({
        id,
        result: await starkwareRpc.freeze(params.contractAddress, params.vaultId),
      });
      break;
    case "stark_verifyEscape":
      connector.approveRequest({
        id,
        result: await starkwareRpc.verifyEscape(params.contractAddress, params.proof),
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
