import * as React from "react";
import styled from "styled-components";
import Dropdown from "../components/Dropdown";
import chains from "../helpers/chains";
import { ellipseAddress } from "src/helpers/utilities";
import { responsive } from "../styles";
import Blockie from "./Blockie";
import { getViewportDimensions } from "../helpers/utilities";

const SSection = styled.div`
  width: 100%;
`;

const SBlockie = styled(Blockie)`
  margin-right: 5px;
  @media screen and (${responsive.xs.max}) {
    margin-right: 1vw;
  }
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
  const windowWidth = getViewportDimensions().x;
  const maxWidth = 468;
  const maxChar = 12;
  const ellipseLength =
    windowWidth > maxWidth
      ? maxChar
      : Math.floor(windowWidth * (maxChar / maxWidth));
  const accountsMap = accounts.map((addr: string) => ({
    address: addr,
    display_address: ellipseAddress(addr, ellipseLength)
  }));
  return (
    <React.Fragment>
      <SSection>
        <h6>{"Account"}</h6>
        <SAddressDropdownWrapper>
          <SBlockie size={40} address={address} />
          <Dropdown
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
        <Dropdown
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
