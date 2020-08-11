import { IRpcEngine } from "../helpers/types";

import { IAppState } from "../App";
import { getAppControllers } from "../controllers";

import { formatTokenLabel, formatTokenAmountLabel } from "../helpers/starkware";

function filterStarkwareRequests(payload: any) {
  return payload.method.startsWith("stark_");
}

async function routeStarkwareRequests(payload: any, state: IAppState, setState: any) {
  if (!state.connector) {
    return;
  }
  const requests = state.requests;
  switch (payload.method) {
    case "stark_account":
      signStarkwareRequests(payload, state, setState);
      await setState({});
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
      value: params.starkPublicKey || getAppControllers().starkware.controller.starkPublicKey,
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
        ...formatTokenAmountLabel(params.quantizedAmount, params.token),
        {
          label: "Vault Id",
          value: params.vaultId,
        },
      ];
      break;
    case "stark_depositCancel":
      renderParams = [
        ...renderParams,
        ...formatTokenLabel(params.token),
        {
          label: "Vault Id",
          value: params.vaultId,
        },
      ];
      break;
    case "stark_depositReclaim":
      renderParams = [
        ...renderParams,
        ...formatTokenLabel(params.token),
        {
          label: "Vault Id",
          value: params.vaultId,
        },
      ];
      break;
    case "stark_transfer":
      renderParams = [
        ...renderParams,
        ...formatTokenAmountLabel(params.quantizedAmount, params.token),
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
        ...formatTokenAmountLabel(params.sell.quantizedAmount, params.sell.token, "Sell"),
        { label: "Buy Vault Id", value: params.buy.vaultId },
        ...formatTokenAmountLabel(params.buy.quantizedAmount, params.buy.token, "Buy"),
        { label: "Nonce", value: params.nonce },
        { label: "Expiration Timestamp", value: params.expirationTimestamp },
      ];
      break;
    case "stark_withdrawal":
      renderParams = [...renderParams, ...formatTokenLabel(params.token)];
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
        ...formatTokenAmountLabel(params.quantizedAmount, params.token),
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

  try {
    const response = await getAppControllers().starkware.resolve(payload);
    if ("result" in response) {
      state.connector.approveRequest(response);
    } else {
      state.connector.rejectRequest(response);
    }
  } catch (error) {
    console.error(error);
    state.connector.rejectRequest({
      id: payload.id,
      error: {
        message: error.message,
      },
    });
  }
  await setState({});
}

const starkware: IRpcEngine = {
  filter: filterStarkwareRequests,
  router: routeStarkwareRequests,
  render: renderStarkwareRequests,
  signer: signStarkwareRequests,
};

export default starkware;
