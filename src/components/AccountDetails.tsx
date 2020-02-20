import * as React from "react";
import styled from "styled-components";
import Dropdown from "../components/Dropdown";
import supportedChains from "../helpers/chains";
import { ellipseAddress } from "src/helpers/utilities";
import { responsive } from "../styles";
import Blockie from "./Blockie";
import { getViewportDimensions } from "../helpers/utilities";
import { CHANNEL_SUPPORTED_CHAIN_IDS } from "src/helpers/constants";

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
  activeIndex: number;
  address: string;
  chainId: number;
}

const AccountDetails = (props: IAccountDetailsProps) => {
  const { chainId, address, activeIndex, accounts, updateAddress, updateChain } = props;
  const windowWidth = getViewportDimensions().x;
  const maxWidth = 468;
  const maxChar = 12;
  const chains = supportedChains.filter(x => CHANNEL_SUPPORTED_CHAIN_IDS.includes(x.chain_id));
  const ellipseLength =
    windowWidth > maxWidth ? maxChar : Math.floor(windowWidth * (maxChar / maxWidth));
  const accountsMap = accounts.map((addr: string, index: number) => ({
    index,
    display_address: ellipseAddress(addr, ellipseLength),
  }));
  return (
    <React.Fragment>
      <SSection>
        <h6>{"Account"}</h6>
        <SAddressDropdownWrapper>
          <SBlockie size={40} address={address} />
          <Dropdown
            monospace
            selected={activeIndex}
            options={accountsMap}
            displayKey={"display_address"}
            targetKey={"index"}
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
