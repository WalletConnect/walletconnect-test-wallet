import * as React from "react";
import styled from "styled-components";
import Column from "./Column";
import Button from "./Button";
import { IRequestRenderParams } from "../helpers/types";

const SRequestValues = styled.div`
  font-family: monospace;
  width: 100%;
  font-size: 12px;
  background-color: #eee;
  padding: 8px;
  word-break: break-word;
  border-radius: 8px;
  margin-bottom: 10px;
`;

const SConnectedPeer = styled.div`
  display: flex;
  align-items: center;
  & img {
    width: 40px;
    height: 40px;
  }
  & > div {
    margin-left: 10px;
  }
`;

const SActions = styled.div`
  margin: 0;
  margin-top: 20px;

  display: flex;
  justify-content: space-around;
  & > * {
    margin: 0 5px;
  }
`;

class RequestDisplay extends React.Component<any, any> {
  public render() {
    const { payload, peerMeta, approveRequest, rejectRequest, renderPayload } = this.props;

    const params: IRequestRenderParams[] = renderPayload(payload);
    console.log("RENDER", "method", payload.method);
    console.log("RENDER", "params", payload.params);
    console.log("RENDER", "formatted", params);
    return (
      <Column>
        <h6>{"Request From"}</h6>
        <SConnectedPeer>
          <img src={peerMeta.icons[0]} alt={peerMeta.name} />
          <div>{peerMeta.name}</div>
        </SConnectedPeer>
        {params.map(param => (
          <React.Fragment key={param.label}>
            <h6>{param.label}</h6>
            <SRequestValues>{param.value}</SRequestValues>
          </React.Fragment>
        ))}
        <SActions>
          <Button onClick={approveRequest}>{`Approve`}</Button>
          <Button onClick={rejectRequest}>{`Reject`}</Button>
        </SActions>
      </Column>
    );
  }
}

export default RequestDisplay;
