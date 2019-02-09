import * as React from "react";
import styled from "styled-components";
import { responsive } from "../styles";

import Blockie from "./Blockie";

const SAccount = styled.div`
  display: flex;
  align-items: center;
`;

const SAddress = styled.p`
  font-family: monospace;
  font-size: 13px;
  font-weight: bold;
  @media screen and (${responsive.xs.max}) {
    font-size: 2.6vw;
    margin: 12px 0;
  }
`;

const SBlockie = styled(Blockie)`
  margin-right: 5px;
  @media screen and (${responsive.xs.max}) {
    margin-right: 1vw;
  }
`;

interface IAccountDetailsProps {
  accounts: string[];
}

const AccountDetails = (props: IAccountDetailsProps) => (
  <div>
    <h6>{"Accounts"}</h6>
    {props.accounts.map((address: string) => (
      <SAccount key={address}>
        <SBlockie size={25} address={address} />
        <SAddress>{address}</SAddress>
      </SAccount>
    ))}
  </div>
);
export default AccountDetails;
