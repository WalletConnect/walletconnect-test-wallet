import * as React from "react";
import styled from "styled-components";
import { convertHexToNumber } from "@walletconnect/utils";
import Column from "./Column";
import Button from "./Button";
import { convertHexToUtf8IfPossible } from "../helpers/utilities";

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

class DisplayRequest extends React.Component<any, any> {
  public render() {
    const {
      displayRequest,
      peerMeta,
      approveRequest,
      rejectRequest
    } = this.props;

    let params = [{ label: "Method", value: displayRequest.method }];

    switch (displayRequest.method) {
      case "eth_sendTransaction":
      case "eth_signTransaction":
        params = [
          ...params,
          { label: "From", value: displayRequest.params[0].from },
          { label: "To", value: displayRequest.params[0].to },
          {
            label: "Gas Limit",
            value: displayRequest.params[0].gas
              ? convertHexToNumber(displayRequest.params[0].gas)
              : displayRequest.params[0].gasLimit
              ? convertHexToNumber(displayRequest.params[0].gasLimit)
              : ""
          },
          {
            label: "Gas Price",
            value: convertHexToNumber(displayRequest.params[0].gasPrice)
          },
          {
            label: "Nonce",
            value: convertHexToNumber(displayRequest.params[0].nonce)
          },
          {
            label: "Value",
            value: convertHexToNumber(displayRequest.params[0].value)
          },
          { label: "Data", value: displayRequest.params[0].data }
        ];
        break;

      case "eth_sign":
        params = [
          ...params,
          { label: "Address", value: displayRequest.params[0] },
          { label: "Message", value: displayRequest.params[1] }
        ];
        break;
      case "personal_sign":
        params = [
          ...params,
          { label: "Address", value: displayRequest.params[1] },
          {
            label: "Message",
            value: convertHexToUtf8IfPossible(displayRequest.params[0])
          }
        ];
        break;
      default:
        params = [
          ...params,
          {
            label: "params",
            value: JSON.stringify(displayRequest.params, null, "\t")
          }
        ];
        break;
    }
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

export default DisplayRequest;
