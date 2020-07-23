import BN from "bn.js";
import * as starkwareWallet from "starkware-wallet";

export function formatLabelPrefix(label: string, labelPrefix?: string) {
  return labelPrefix ? `${labelPrefix} ${label}` : `${label}`;
}

export function formatTokenLabel(token: starkwareWallet.Token, labelPrefix?: string) {
  const label = formatLabelPrefix("Asset", labelPrefix);
  if (token.type === "ETH") {
    return [{ label, value: "Ether" }];
  } else if (token.type === "ERC20") {
    return [
      { label, value: "ERC20 Token" },
      {
        label: formatLabelPrefix("Token Address", labelPrefix),
        value: (token.data as starkwareWallet.ERC20TokenData).tokenAddress,
      },
    ];
  } else if (token.type === "ERC721") {
    return [
      { label, value: "ERC721 NFT" },
      {
        label: formatLabelPrefix("Token ID", labelPrefix),
        value: (token.data as starkwareWallet.ERC721TokenData).tokenId,
      },
    ];
  } else {
    return [{ label, value: "Unknown" }];
  }
}

export function formatTokenAmount(quantizedAmount: string, token: starkwareWallet.Token) {
  let amount = quantizedAmount;
  const quantum =
    (token.data as starkwareWallet.ERC20TokenData | starkwareWallet.ETHTokenData).quantum || "0";
  if (quantum) {
    amount = new BN(amount).mul(new BN(quantum)).toString();
  }
  return amount;
}

export function formatTokenAmountLabel(
  quantizedAmount: string,
  token: starkwareWallet.Token,
  labelPrefix?: string,
) {
  return [
    ...formatTokenLabel(token),
    {
      label: formatLabelPrefix("Amount", labelPrefix),
      value: formatTokenAmount(quantizedAmount, token),
    },
  ];
}
