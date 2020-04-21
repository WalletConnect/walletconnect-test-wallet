import { IRpcEngine } from "../../helpers/types";

import { IAppState } from "../../App";
import { getAppControllers } from "src/controllers";

function filterStarkwareRequests(payload: any) {
  return payload.method.startsWith("stark_");
}

async function routeStarkwareRequests(payload: any, state: IAppState, setState: any) {
  if (!state.connector) {
    return;
  }
  const requests = state.requests;
  const { id, method, params } = payload;
  switch (method) {
    case "stark_account":
      state.connector.approveRequest({
        id,
        result: await getAppControllers().starkware.account(params.path),
      });
      break;
    default:
      requests.push(payload);
      await setState({ requests });
      break;
  }
}

function renderStarkwareRequests(payload: any) {
  const { params, method } = payload;
  let renderParams = [
    { label: "Method", value: payload.method },
    {
      label: "StarkPublicKey",
      value: params.starkPublicKey || getAppControllers().starkware.getStarkPublicKey(),
    },
  ];

  if (params.contractAddress) {
    renderParams = [
      ...renderParams,
      {
        label: "Contract Address",
        value: params.contractAddress,
      },
    ];
  }

  switch (method) {
    case "stark_register":
      renderParams = [
        ...renderParams,
        { label: "Operator Signature", value: params.operatorSignature },
      ];
      break;

    case "stark_deposit":
      renderParams = [
        ...renderParams,
        ...getAppControllers().starkware.formatTokenAmountLabel(
          params.quantizedAmount,
          params.token,
        ),
        {
          label: "Vault Id",
          value: params.vaultId,
        },
      ];
      break;
    case "stark_depositCancel":
      renderParams = [
        ...renderParams,
        ...getAppControllers().starkware.formatTokenLabel(params.token),
        {
          label: "Vault Id",
          value: params.vaultId,
        },
      ];
      break;
    case "stark_depositReclaim":
      renderParams = [
        ...renderParams,
        ...getAppControllers().starkware.formatTokenLabel(params.token),
        {
          label: "Vault Id",
          value: params.vaultId,
        },
      ];
      break;
    case "stark_transfer":
      renderParams = [
        ...renderParams,
        ...getAppControllers().starkware.formatTokenAmountLabel(
          params.quantizedAmount,
          params.token,
        ),
        { label: "Sender Vault Id", value: params.from.vaultId },
        { label: "Receiver Vault Id", value: params.to.vaultId },
        { label: "Receiver StarkPublicKey", value: params.to.starkPublicKey },
        { label: "Nonce", value: params.nonce },
        { label: "Expiration Timestamp", value: params.expirationTimestamp },
      ];
      break;
    case "stark_createOrder":
      renderParams = [
        ...renderParams,
        { label: "Sell Vault Id", value: params.sell.vaultId },
        ...getAppControllers().starkware.formatTokenAmountLabel(
          params.sell.quantizedAmount,
          params.sell.token,
          "Sell",
        ),
        { label: "Buy Vault Id", value: params.buy.vaultId },
        ...getAppControllers().starkware.formatTokenAmountLabel(
          params.buy.quantizedAmount,
          params.buy.token,
          "Buy",
        ),
        { label: "Nonce", value: params.nonce },
        { label: "Expiration Timestamp", value: params.expirationTimestamp },
      ];
      break;
    case "stark_withdrawal":
      renderParams = [
        ...renderParams,
        ...getAppControllers().starkware.formatTokenLabel(params.token),
      ];
      break;
    case "stark_fullWithdrawal":
      renderParams = [...renderParams, { label: "Vault Id", value: params.vaultId }];
      break;
    case "stark_freeze":
      renderParams = [...renderParams, { label: "Vault Id", value: params.vaultId }];
      break;
    case "stark_verifyEscape":
      renderParams = [...renderParams, { label: "Proof", value: params.proof }];
      break;
    case "stark_escape":
      renderParams = [
        ...renderParams,
        ...getAppControllers().starkware.formatTokenAmountLabel(
          params.quantizedAmount,
          params.token,
        ),
        {
          label: "Vault Id",
          value: params.vaultId,
        },
      ];
      break;
    default:
      break;
  }
  return renderParams;
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
        result: await getAppControllers().starkware.register(
          params.contractAddress,
          params.StarkPublicKey,
          params.operatorSignature,
        ),
      });
      break;
    case "stark_deposit":
      connector.approveRequest({
        id,
        result: await getAppControllers().starkware.deposit(
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
        result: await getAppControllers().starkware.depositCancel(
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
        result: await getAppControllers().starkware.depositReclaim(
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
        result: await getAppControllers().starkware.transfer(
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
        result: await getAppControllers().starkware.createOrder(
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
        result: await getAppControllers().starkware.withdrawal(
          params.contractAddress,
          params.token,
        ),
      });
      break;
    case "stark_fullWithdrawal":
      connector.approveRequest({
        id,
        result: await getAppControllers().starkware.fullWithdrawal(
          params.contractAddress,
          params.vaultId,
        ),
      });
      break;
    case "stark_freeze":
      connector.approveRequest({
        id,
        result: await getAppControllers().starkware.freeze(params.contractAddress, params.vaultId),
      });
      break;
    case "stark_verifyEscape":
      connector.approveRequest({
        id,
        result: await getAppControllers().starkware.verifyEscape(
          params.contractAddress,
          params.proof,
        ),
      });
      break;
    case "stark_escape":
      connector.approveRequest({
        id,
        result: await getAppControllers().starkware.escape(
          params.contractAddress,
          params.starkPublicKey,
          params.vaultId,
          params.token,
          params.quantizedAmount,
        ),
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
