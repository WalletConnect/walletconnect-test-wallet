import * as React from "react";
import styled from "styled-components";

import Blockie from "./Blockie";

const SAccount = styled.div`
  display: flex;
  align-items: center;
`;

const SAddress = styled.p`
  font-family: monospace;
  font-size: calc(6px + 1vmin);
  font-weight: bold;
`;

interface IAccountDetailsProps {
  accounts: string[];
}

const AccountDetails = (props: IAccountDetailsProps) => (
  <div>
    <h6>{"Accounts"}</h6>
    {props.accounts.map((address: string) => (
      <SAccount key={address}>
        <Blockie size={20} address={address} />
        <SAddress>{address}</SAddress>
      </SAccount>
    ))}
  </div>
);
export default AccountDetails;
