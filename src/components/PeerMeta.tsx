import * as React from "react";
import styled from "styled-components";
import { IClientMeta } from "src/lib/types";

const SIcon = styled.img`
  width: 100px;
  margin: 0 auto;
`;

const SCenter = styled.div`
  text-align: center;
`;

const SName = styled(SCenter)`
  font-weight: bold;
`;

interface IPeerMetaProps {
  peerMeta: IClientMeta;
}

const PeerMeta = (props: IPeerMetaProps) => (
  <>
    <SIcon src={props.peerMeta.icons[0]} alt={props.peerMeta.name} />
    <SName>{props.peerMeta.name}</SName>
    <SCenter>{props.peerMeta.description}</SCenter>
    <SCenter>{props.peerMeta.url}</SCenter>
  </>
);

export default PeerMeta;
