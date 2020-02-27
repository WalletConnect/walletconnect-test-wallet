import { IAppState } from "../../App";
import { handleChannelRequests } from "../helpers/connext";
import { IRpcEngine } from "src/helpers/types";

function filterConnextRequests(payload: any) {
  return payload.method.startsWith("chan_");
}

async function routeConnextRequests(payload: any, state: IAppState, setState: any) {
  if (!state.connector) {
    return;
  }
  try {
    const result = await handleChannelRequests(payload);
    state.connector.approveRequest({
      id: payload.id,
      result,
    });
  } catch (e) {
    state.connector.rejectRequest({
      id: payload.id,
      error: { message: e.message },
    });
  }
}

const connext: IRpcEngine = {
  filter: filterConnextRequests,
  router: routeConnextRequests,
  render: payload => [],
  signer: (payload, state, setState) => Promise.resolve(),
};

export default connext;
