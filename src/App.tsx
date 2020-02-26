import * as React from "react";
import styled from "styled-components";
import WalletConnect from "@walletconnect/browser";
import { signingMethods } from "@walletconnect/utils";
import Button from "./components/Button";
import Card from "./components/Card";
import Input from "./components/Input";
import Header from "./components/Header";
import Column from "./components/Column";
import PeerMeta from "./components/PeerMeta";
import DisplayRequest from "./components/DisplayRequest";
import RequestButton from "./components/RequestButton";
import AccountDetails from "./components/AccountDetails";
import QRCodeScanner, { IQRCodeValidateResponse } from "./components/QRCodeScanner";
import { DEFAULT_CHAIN_ID, DEFAULT_ACTIVE_INDEX } from "./helpers/constants";
import {
  getAccounts,
  isWalletActive,
  initWallet,
  updateWallet,
  sendTransaction,
  signTransaction,
  signMessage,
  signPersonalMessage,
} from "./helpers/wallet";
import { starkMethods, getStarkKey } from "./helpers/starkware";
import { apiGetCustomRequest } from "./helpers/api";
import { getCachedSession } from "./helpers/utilities";
import custom from "./custom";

const SContainer = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  min-height: 100%;
  max-width: 600px;
  margin: 0 auto;
  padding: 0;
`;

const SVersionNumber = styled.div`
  position: absolute;
  font-size: 12px;
  bottom: 6%;
  right: -24px;
  opacity: 0.3;
  transform: rotate(-90deg);
`;

const SContent = styled.div`
  width: 100%;
  flex: 1;
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const SLogo = styled.div`
  padding: 10px 0;
  display: flex;
  & img {
    width: 100%;
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

const SActionsColumn = styled(SActions)`
  flex-direction: row;
  align-items: center;

  margin: 24px 0 6px;

  & > p {
    font-weight: 600;
  }
`;

const SButton = styled(Button)`
  width: 50%;
  height: 40px;
`;

const SInput = styled(Input)`
  width: 50%;
  margin: 10px;
  font-size: 14px;
  height: 40px;
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

const SRequestButton = styled(RequestButton)`
  margin-bottom: 10px;
`;

interface IAppState {
  loading: boolean;
  scanner: boolean;
  connector: WalletConnect | null;
  uri: string;
  peerMeta: {
    description: string;
    url: string;
    icons: string[];
    name: string;
    ssl: boolean;
  };
  connected: boolean;
  chainId: number;
  accounts: string[];
  activeIndex: number;
  address: string;
  requests: any[];
  results: any[];
  displayRequest: any;
}

const DEFAULT_ACCOUNTS = getAccounts();
const DEFAULT_ADDRESS = DEFAULT_ACCOUNTS[DEFAULT_ACTIVE_INDEX];

const INITIAL_STATE: IAppState = {
  loading: false,
  scanner: false,
  connector: null,
  uri: "",
  peerMeta: {
    description: "",
    url: "",
    icons: [],
    name: "",
    ssl: false,
  },
  connected: false,
  chainId: custom.chainId || DEFAULT_CHAIN_ID,
  accounts: DEFAULT_ACCOUNTS,
  address: DEFAULT_ADDRESS,
  activeIndex: DEFAULT_ACTIVE_INDEX,
  requests: [],
  results: [],
  displayRequest: null,
};

class App extends React.Component<{}> {
  public state: IAppState;

  constructor(props: any) {
    super(props);
    this.state = {
      ...INITIAL_STATE,
    };
  }
  public componentDidMount() {
    this.initWallet();
  }

  public initWallet = async () => {
    let { activeIndex, chainId } = this.state;

    const session = getCachedSession();

    if (!session) {
      await initWallet(activeIndex, chainId);
    } else {
      const connector = new WalletConnect({ session });

      const { connected, accounts, peerMeta } = connector;

      const address = accounts[0];

      activeIndex = accounts.indexOf(address);
      chainId = connector.chainId;

      await initWallet(activeIndex, chainId);

      await this.setState({
        connected,
        connector,
        address,
        activeIndex,
        accounts,
        chainId,
        peerMeta,
      });

      this.subscribeToEvents();
    }
    const starkKey = await getStarkKey();
    console.log("starkKey", starkKey);
  };

  public initWalletConnect = async () => {
    const { uri } = this.state;

    this.setState({ loading: true });

    try {
      const connector = new WalletConnect({ uri });

      if (!connector.connected) {
        await connector.createSession();
      }

      await this.setState({
        loading: false,
        connector,
        uri: connector.uri,
      });

      this.subscribeToEvents();
    } catch (error) {
      this.setState({ loading: false });

      throw error;
    }
  };

  public approveSession = () => {
    console.log("[approveSession]");
    const { connector, chainId, address } = this.state;
    if (connector) {
      connector.approveSession({ chainId, accounts: [address] });
    }
    this.setState({ connector });
  };

  public rejectSession = () => {
    console.log("[rejectSession]");
    const { connector } = this.state;
    if (connector) {
      connector.rejectSession();
    }
    this.setState({ connector });
  };

  public killSession = () => {
    console.log("[killSession]");
    const { connector } = this.state;
    if (connector) {
      connector.killSession();
    }
    this.resetApp();
  };

  public resetApp = async () => {
    await this.setState({ ...INITIAL_STATE });
    this.initWallet();
  };

  public subscribeToEvents = () => {
    console.log("[subscribeToEvents]");
    const { connector } = this.state;

    if (connector) {
      connector.on("session_request", (error, payload) => {
        console.log(`connector.on("session_request")`);

        if (error) {
          throw error;
        }

        const { peerMeta } = payload.params[0];
        this.setState({ peerMeta });
      });

      connector.on("session_update", error => {
        console.log(`connector.on("session_update")`);

        if (error) {
          throw error;
        }
      });

      connector.on("call_request", (error, payload) => {
        // tslint:disable-next-line
        console.log(`connector.on("call_request")`, "payload.method", payload.method);

        if (error) {
          throw error;
        }
        if (starkMethods.includes(payload.method)) {
          switch (payload.method) {
            case "stark_accounts":
              connector.approveRequest({
                id: payload.id,
                result: {
                  accounts: [],
                },
              });
              break;
            default:
              break;
          }
        } else if (!signingMethods.includes(payload.method)) {
          const { chainId } = this.state;
          apiGetCustomRequest(chainId, payload)
            .then(result =>
              connector.approveRequest({
                id: payload.id,
                result,
              }),
            )
            .catch(() =>
              connector.rejectRequest({
                id: payload.id,
                error: { message: "JSON RPC method not supported" },
              }),
            );
          return;
        }
        const requests = this.state.requests;
        requests.push(payload);
        this.setState({ requests });
      });

      connector.on("connect", (error, payload) => {
        console.log(`connector.on("connect")`);

        if (error) {
          throw error;
        }

        this.setState({ connected: true });
      });

      connector.on("disconnect", (error, payload) => {
        console.log(`connector.on("disconnect")`);

        if (error) {
          throw error;
        }

        this.resetApp();
      });

      if (connector.connected) {
        const { chainId, accounts } = connector;
        const index = 0;
        const address = accounts[index];
        updateWallet(index, chainId);
        this.setState({
          connected: true,
          address,
          chainId,
        });
      }

      this.setState({ connector });
    }
  };

  public updateSession = async (sessionParams: { chainId?: number; activeIndex?: number }) => {
    const { connector, chainId, accounts, activeIndex } = this.state;
    const _chainId = sessionParams.chainId || chainId;
    const _activeIndex = sessionParams.activeIndex || activeIndex;
    const address = accounts[_activeIndex];
    if (connector) {
      connector.updateSession({
        chainId: _chainId,
        accounts: [address],
      });
    }

    await this.setState({
      connector,
      chainId: _chainId,
      address,
    });
  };

  public updateChain = async (chainId: number | string) => {
    const { activeIndex } = this.state;
    const _chainId = Number(chainId);
    await updateWallet(activeIndex, _chainId);
    await this.updateSession({ chainId: _chainId });
  };

  public updateAddress = async (activeIndex: number) => {
    const { chainId } = this.state;
    await updateWallet(activeIndex, chainId);
    await this.updateSession({ activeIndex });
  };

  public toggleScanner = () => {
    console.log("[toggleScanner]");
    this.setState({ scanner: !this.state.scanner });
  };

  public onQRCodeValidate = (data: string): IQRCodeValidateResponse => {
    const res: IQRCodeValidateResponse = {
      error: null,
      result: null,
    };
    try {
      res.result = data;
    } catch (error) {
      res.error = error;
    }

    return res;
  };

  public onQRCodeScan = async (data: any) => {
    const uri = typeof data === "string" ? data : "";
    if (uri) {
      await this.setState({ uri });
      await this.initWalletConnect();
      this.toggleScanner();
    }
  };

  public onURIPaste = async (e: any) => {
    const data = e.target.value;
    const uri = typeof data === "string" ? data : "";
    if (uri) {
      await this.setState({ uri });
      await this.initWalletConnect();
    }
  };

  public onQRCodeError = (error: Error) => {
    throw error;
  };

  public onQRCodeClose = () => this.toggleScanner();

  public openRequest = (request: any) => this.setState({ displayRequest: request });

  public closeRequest = async () => {
    const { requests, displayRequest } = this.state;
    const filteredRequests = requests.filter(request => request.id !== displayRequest.id);
    await this.setState({
      requests: filteredRequests,
      displayRequest: null,
    });
  };

  public approveRequest = async () => {
    const { connector, displayRequest, address, activeIndex, chainId } = this.state;

    let errorMsg = "";

    try {
      let result = null;

      if (connector) {
        if (!isWalletActive()) {
          await initWallet(activeIndex, chainId);
        }

        let transaction = null;
        let dataToSign = null;
        let addressRequested = null;

        switch (displayRequest.method) {
          case "eth_sendTransaction":
            transaction = displayRequest.params[0];
            addressRequested = transaction.from;
            if (address.toLowerCase() === addressRequested.toLowerCase()) {
              result = await sendTransaction(transaction);
            } else {
              errorMsg = "Address requested does not match active account";
            }
            break;
          case "eth_signTransaction":
            transaction = displayRequest.params[0];
            addressRequested = transaction.from;
            if (address.toLowerCase() === addressRequested.toLowerCase()) {
              result = await signTransaction(transaction);
            } else {
              errorMsg = "Address requested does not match active account";
            }
            break;
          case "eth_sign":
            dataToSign = displayRequest.params[1];
            addressRequested = displayRequest.params[0];
            if (address.toLowerCase() === addressRequested.toLowerCase()) {
              result = await signMessage(dataToSign);
            } else {
              errorMsg = "Address requested does not match active account";
            }
            break;
          case "personal_sign":
            dataToSign = displayRequest.params[0];
            addressRequested = displayRequest.params[1];
            if (address.toLowerCase() === addressRequested.toLowerCase()) {
              result = await signPersonalMessage(dataToSign);
            } else {
              errorMsg = "Address requested does not match active account";
            }
            break;
          default:
            break;
        }

        if (result) {
          connector.approveRequest({
            id: displayRequest.id,
            result,
          });
        } else {
          let message = "JSON RPC method not supported";
          if (!isWalletActive()) {
            message = "No Active Account";
          }
          connector.rejectRequest({
            id: displayRequest.id,
            error: { message },
          });
        }
      }
    } catch (error) {
      console.error(error);
      if (connector) {
        connector.rejectRequest({
          id: displayRequest.id,
          error: { message: errorMsg || "Failed or Rejected Request" },
        });
      }
    }

    this.closeRequest();
    await this.setState({ connector });
  };

  public rejectRequest = async () => {
    const { connector, displayRequest } = this.state;
    if (connector) {
      connector.rejectRequest({
        id: displayRequest.id,
        error: { message: "Failed or Rejected Request" },
      });
    }
    await this.closeRequest();
    await this.setState({ connector });
  };

  public render() {
    const {
      peerMeta,
      scanner,
      connected,
      activeIndex,
      accounts,
      address,
      chainId,
      requests,
      displayRequest,
    } = this.state;
    return (
      <React.Fragment>
        <SContainer>
          <Header
            connected={connected}
            address={address}
            chainId={chainId}
            killSession={this.killSession}
          />
          <SContent>
            <Card maxWidth={400}>
              <SLogo>
                <img src={custom.logo} alt={custom.name} />
              </SLogo>
              {!connected ? (
                peerMeta && peerMeta.name ? (
                  <Column>
                    <PeerMeta peerMeta={peerMeta} />
                    <SActions>
                      <Button onClick={this.approveSession}>{`Approve`}</Button>
                      <Button onClick={this.rejectSession}>{`Reject`}</Button>
                    </SActions>
                  </Column>
                ) : (
                  <Column>
                    <AccountDetails
                      address={address}
                      activeIndex={activeIndex}
                      chainId={chainId}
                      accounts={accounts}
                      updateAddress={this.updateAddress}
                      updateChain={this.updateChain}
                    />
                    <SActionsColumn>
                      <SButton onClick={this.toggleScanner}>{`Scan`}</SButton>
                      {custom.styleOpts.showPasteUri && (
                        <>
                          <p>{"OR"}</p>
                          <SInput onChange={this.onURIPaste} placeholder={"Paste wc: uri"} />
                        </>
                      )}
                    </SActionsColumn>
                  </Column>
                )
              ) : !displayRequest ? (
                <Column>
                  <AccountDetails
                    address={address}
                    activeIndex={activeIndex}
                    chainId={chainId}
                    accounts={accounts}
                    updateAddress={this.updateAddress}
                    updateChain={this.updateChain}
                  />
                  {peerMeta && peerMeta.name && (
                    <>
                      <h6>{"Connected to"}</h6>
                      <SConnectedPeer>
                        <img src={peerMeta.icons[0]} alt={peerMeta.name} />
                        <div>{peerMeta.name}</div>
                      </SConnectedPeer>
                    </>
                  )}
                  <h6>{"Pending Call Requests"}</h6>
                  {requests.length ? (
                    requests.map(request => (
                      <SRequestButton key={request.id} onClick={() => this.openRequest(request)}>
                        <div>{request.method}</div>
                      </SRequestButton>
                    ))
                  ) : (
                    <div>
                      <div>{"No pending requests"}</div>
                    </div>
                  )}
                </Column>
              ) : (
                <DisplayRequest
                  displayRequest={displayRequest}
                  peerMeta={peerMeta}
                  approveRequest={this.approveRequest}
                  rejectRequest={this.rejectRequest}
                />
              )}
            </Card>
          </SContent>
          {scanner && (
            <QRCodeScanner
              onValidate={this.onQRCodeValidate}
              onScan={this.onQRCodeScan}
              onError={this.onQRCodeError}
              onClose={this.onQRCodeClose}
            />
          )}
        </SContainer>
        {custom.styleOpts.showVersion && (
          <SVersionNumber>{`v${process.env.REACT_APP_VERSION}`} </SVersionNumber>
        )}
      </React.Fragment>
    );
  }
}

export default App;
