import * as React from "react";
import styled from "styled-components";
import Dropdown from "../components/Dropdown";
import chains from "../helpers/chains";
import { ellipseAddress } from "src/helpers/utilities";
import { responsive } from "../styles";
import Blockie from "./Blockie";

const SSection = styled.div`
  width: 100%;
`;

const SBlockie = styled(Blockie)`
  margin-right: 5px;
  @media screen and (${responsive.xs.max}) {
    margin-right: 1vw;
  }
`;

const SDropdown = styled(Dropdown)`
  width: 100%;
`;

const SAddressDropdownWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

interface IAccountDetailsProps {
  updateAddress?: any;
  updateChain?: any;
  accounts: string[];
  address: string;
  chainId: number;
}

const AccountDetails = (props: IAccountDetailsProps) => {
  const { chainId, address, accounts, updateAddress, updateChain } = props;
  const accountsMap = accounts.map((addr: string) => ({
    address: addr,
    display_address: ellipseAddress(addr, 8)
  }));
  console.log("address", address); // tslint:disable-line
  console.log("accountsMap", accountsMap); // tslint:disable-line
  return (
    <React.Fragment>
      <SSection>
        <h6>{"Account"}</h6>
        <SAddressDropdownWrapper>
          <SBlockie size={40} address={address} />
          <SDropdown
            monospace
            selected={address}
            options={accountsMap}
            displayKey={"display_address"}
            targetKey={"address"}
            onChange={updateAddress}
          />
        </SAddressDropdownWrapper>
      </SSection>
      <SSection>
        <h6>{"Network"}</h6>
        <SDropdown
          selected={chainId}
          options={chains}
          displayKey={"name"}
          targetKey={"chain_id"}
          onChange={updateChain}
        />
      </SSection>
    </React.Fragment>
  );
};
export default AccountDetails;
