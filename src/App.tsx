import * as React from "react";
import styled from "styled-components";
import WalletConnect from "@walletconnect/browser";
import Button from "./components/Button";
import Card from "./components/Card";
import Input from "./components/Input";
import Header from "./components/Header";
import Column from "./components/Column";
import PeerMeta from "./components/PeerMeta";
import DisplayRequest from "./components/DisplayRequest";
import RequestButton from "./components/RequestButton";
import AccountDetails from "./components/AccountDetails";
import QRCodeScanner, {
  IQRCodeValidateResponse
} from "./components/QRCodeScanner";
import {
  testAccounts,
  updateWallet,
  sendTransaction,
  signMessage
} from "./helpers/wallet";
import { apiGetBlockNumber } from "./helpers/api";

const SContainer = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  min-height: 100%;
  max-width: 600px;
  margin: 0 auto;
  padding: 0;
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

const STitle = styled.h1`
  margin: 10px auto;
  text-align: center;
  font-size: calc(10px + 2vmin);
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
  walletConnector: WalletConnect | null;
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
  address: string;
  requests: any[];
  results: any[];
  displayRequest: any;
}

const defaultChainId = 3;

const INITIAL_STATE = {
  loading: false,
  scanner: false,
  walletConnector: null,
  uri: "",
  peerMeta: {
    description: "",
    url: "",
    icons: [],
    name: "",
    ssl: false
  },
  connected: false,
  chainId: defaultChainId,
  accounts: testAccounts.map(account => account.address),
  address: testAccounts[0].address,
  requests: [],
  results: [],
  displayRequest: null
};

class App extends React.Component<{}> {
  public state: IAppState;

  constructor(props: any) {
    super(props);
    this.state = {
      ...INITIAL_STATE
    };
  }
  public componentDidMount() {
    this.initWallet();
  }

  public initWallet = async () => {
    const local = localStorage ? localStorage.getItem("walletconnect") : null;

    if (local) {
      let session;

      try {
        session = JSON.parse(local);
      } catch (error) {
        throw error;
      }

      const walletConnector = new WalletConnect({ session });

      const { connected, chainId, accounts, peerMeta } = walletConnector;

      const address = accounts[0];

      updateWallet(address, chainId);

      await this.setState({
        connected,
        walletConnector,
        address,
        chainId,
        peerMeta
      });

      this.subscribeToEvents();
    }
  };

  public initWalletConnect = async () => {
    const { uri } = this.state;

    this.setState({ loading: true });

    try {
      const walletConnector = new WalletConnect({ uri });

      window.walletConnector = walletConnector; // tslint:disable-line

      if (!walletConnector.connected) {
        await walletConnector.createSession();
      }

      await this.setState({
        loading: false,
        walletConnector,
        uri: walletConnector.uri
      });

      this.subscribeToEvents();
    } catch (error) {
      this.setState({ loading: false });

      throw error;
    }
  };

  public approveSession = () => {
    const { walletConnector, chainId, address } = this.state;
    if (walletConnector) {
      walletConnector.approveSession({ chainId, accounts: [address] });
    }
    this.setState({ walletConnector });
  };

  public rejectSession = () => {
    const { walletConnector } = this.state;
    if (walletConnector) {
      walletConnector.rejectSession();
    }
    this.setState({ walletConnector });
  };

  public killSession = () => {
    const { walletConnector } = this.state;
    if (walletConnector) {
      walletConnector.killSession();
    }
    this.resetApp();
  };

  public resetApp = async () => {
    await this.setState({ ...INITIAL_STATE });
    this.initWallet();
  };

  public subscribeToEvents = () => {
    const { walletConnector } = this.state;

    if (walletConnector) {
      walletConnector.on("session_request", (error, payload) => {
        console.log('walletConnector.on("session_request")'); // tslint:disable-line

        if (error) {
          throw error;
        }

        const { peerMeta } = payload.params[0];
        this.setState({ peerMeta });
      });

      walletConnector.on("session_update", (error, payload) => {
        console.log('walletConnector.on("session_update")'); // tslint:disable-line

        if (error) {
          throw error;
        }
      });

      walletConnector.on("call_request", (error, payload) => {
        console.log('walletConnector.on("call_request")'); // tslint:disable-line

        if (error) {
          throw error;
        }

        if (payload.method === "eth_blockNumber") {
          const { chainId } = this.state;
          apiGetBlockNumber(chainId)
            .then(result =>
              walletConnector.approveRequest({
                id: payload.id,
                result
              })
            )
            .catch(() =>
              walletConnector.rejectRequest({
                id: payload.id,
                error: { message: "JSON RPC method not supported" }
              })
            );
          return;
        }

        const requests = [...this.state.requests, payload];
        this.setState({ requests });
      });

      walletConnector.on("connect", (error, payload) => {
        console.log('walletConnector.on("connect")'); // tslint:disable-line

        if (error) {
          throw error;
        }

        this.setState({ connected: true });
      });

      walletConnector.on("disconnect", (error, payload) => {
        console.log('walletConnector.on("disconnect")'); // tslint:disable-line

        if (error) {
          throw error;
        }

        this.resetApp();
      });

      if (walletConnector.connected) {
        const { chainId, accounts } = walletConnector;
        const address = accounts[0];
        updateWallet(address, chainId);
        this.setState({
          connected: true,
          address,
          chainId
        });
      }

      this.setState({ walletConnector });
    }
  };

  public updateSession = async (sessionParams: {
    chainId?: number;
    address?: string;
  }) => {
    const { walletConnector, chainId, address } = this.state;
    const _chainId = sessionParams.chainId || chainId;
    const _address = sessionParams.address || address;
    if (walletConnector) {
      walletConnector.updateSession({
        chainId: _chainId,
        accounts: [_address]
      });
    }

    await this.setState({
      walletConnector,
      chainId: _chainId,
      address: _address
    });
  };

  public updateChain = async (chainId: number | string) => {
    const { address } = this.state;
    const _chainId = Number(chainId);
    await updateWallet(address, _chainId);
    await this.updateSession({ chainId: _chainId });
  };

  public updateAddress = async (address: string) => {
    const { chainId } = this.state;
    await updateWallet(address, chainId);
    await this.updateSession({ address });
  };

  public toggleScanner = () => {
    this.setState({ scanner: !this.state.scanner });
  };

  public onQRCodeValidate = (data: string): IQRCodeValidateResponse => {
    const res: IQRCodeValidateResponse = {
      error: null,
      result: null
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

  public openRequest = (request: any) =>
    this.setState({ displayRequest: request });

  public closeRequest = async () => {
    const { requests, displayRequest } = this.state;
    const filteredRequests = requests.filter(
      request => request.id !== displayRequest.id
    );
    await this.setState({
      requests: filteredRequests,
      displayRequest: null
    });
  };

  public approveRequest = async () => {
    const { walletConnector, displayRequest, address } = this.state;

    try {
      let result = null;

      if (walletConnector) {
        switch (displayRequest.method) {
          case "eth_sendTransaction":
            result = await sendTransaction(displayRequest.params[0]);
            break;
          case "personal_sign":
          case "eth_sign":
            if (
              address.toLowerCase() === displayRequest.params[0].toLowerCase()
            ) {
              result = await signMessage(displayRequest.params[1]);
            }
          default:
            break;
        }

        if (result) {
          walletConnector.approveRequest({
            id: displayRequest.id,
            result
          });
        } else {
          walletConnector.rejectRequest({
            id: displayRequest.id,
            error: { message: "JSON RPC method not supported" }
          });
        }
      }
    } catch (error) {
      console.error(error); // tslint:disable-line
      if (walletConnector) {
        walletConnector.rejectRequest({
          id: displayRequest.id,
          error: { message: "Failed or Rejected Request" }
        });
      }
    }

    this.closeRequest();
    await this.setState({ walletConnector });
  };

  public rejectRequest = async () => {
    const { walletConnector, displayRequest } = this.state;
    if (walletConnector) {
      walletConnector.rejectRequest({
        id: displayRequest.id,
        error: { message: "Failed or Rejected Request" }
      });
    }
    await this.closeRequest();
    await this.setState({ walletConnector });
  };

  public render() {
    const {
      peerMeta,
      scanner,
      connected,
      accounts,
      address,
      chainId,
      requests,
      displayRequest
    } = this.state;
    return (
      <SContainer>
        <Header
          connected={connected}
          address={address}
          chainId={chainId}
          killSession={this.killSession}
        />
        <SContent>
          <Card maxWidth={400}>
            <STitle>{`Wallet`}</STitle>
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
                    chainId={chainId}
                    accounts={accounts}
                    updateAddress={this.updateAddress}
                    updateChain={this.updateChain}
                  />
                  <SActionsColumn>
                    <SButton onClick={this.toggleScanner}>{`Scan`}</SButton>
                    <p>{"OR"}</p>
                    <SInput
                      onChange={this.onURIPaste}
                      placeholder={"Paste wc: uri"}
                    />
                  </SActionsColumn>
                </Column>
              )
            ) : !displayRequest ? (
              <Column>
                <AccountDetails
                  address={address}
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
                {!!requests.length ? (
                  requests.map(request => (
                    <SRequestButton
                      key={request.id}
                      onClick={() => this.openRequest(request)}
                    >
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
    );
  }
}

export default App;
