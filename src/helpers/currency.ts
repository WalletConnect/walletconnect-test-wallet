import { ethers as eth } from "ethers";

import { toBN } from "./bn";

const { commify, formatUnits, parseUnits } = eth.utils;

export class Currency {
  ////////////////////////////////////////
  // Static Properties/Methods

  public static DAI = (amount: any, daiRate?: any) =>
    new Currency("DAI", amount, daiRate);
  public static DEI = (amount: any, daiRate?: any) =>
    new Currency("DEI", amount, daiRate);
  public static ETH = (amount: any, daiRate?: any) =>
    new Currency("ETH", amount, daiRate);
  public static FIN = (amount: any, daiRate?: any) =>
    new Currency("FIN", amount, daiRate);
  public static WEI = (amount: any, daiRate?: any) =>
    new Currency("WEI", amount, daiRate);

  public typeToSymbol = {
    DAI: "$",
    DEI: "DEI ",
    ETH: eth.constants.EtherSymbol,
    FIN: "FIN ",
    WEI: "WEI "
  };

  public defaultOptions = {
    DAI: { commas: false, decimals: 2, symbol: true, round: true },
    DEI: { commas: false, decimals: 0, symbol: false, round: true },
    ETH: { commas: false, decimals: 3, symbol: true, round: true },
    FIN: { commas: false, decimals: 3, symbol: false, round: true },
    WEI: { commas: false, decimals: 0, symbol: false, round: true }
  };

  ////////////////////////////////////////
  // Private Properties

  // wad is in units like MakerDAO's wad aka an integer w 18 extra units of precision
  // ray is in units like MakerDAO's ray aka an integer w 36 extra units of precision
  // So: this.wad is to the currency amount as wei is to an ether amount
  // These let us handle divisions & decimals cleanly w/out needing a BigDecimal library
  public wad: any;
  public ray: any;
  public type: any;

  public daiRate: any;
  public daiRateGiven: any;

  ////////////////////////////////////////
  // Constructor

  constructor(type: any, amount: any, daiRate?: any) {
    this.type = type;
    this.daiRate = typeof daiRate !== "undefined" ? daiRate : "1";
    this.daiRateGiven = !!daiRate;
    try {
      this.wad = this.toWad(amount._hex ? toBN(amount._hex) : amount);
      this.ray = this.toRay(amount._hex ? toBN(amount._hex) : amount);
    } catch (e) {
      throw new Error(`Invalid currency amount (${amount}): ${e}`);
    }
  }

  ////////////////////////////////////////
  // Getters

  // Returns a decimal string
  get amount() {
    return this.fromWad(this.wad);
  }

  get currency() {
    return {
      amount: this.amount,
      type: this.type
    };
  }

  get symbol() {
    return this.typeToSymbol[this.type];
  }

  get floor() {
    return this._floor(this.amount);
  }

  ////////////////////////////////////////
  // Public Methods

  public toString() {
    return this.amount.slice(0, this.amount.indexOf("."));
  }

  public isEthType(type?: any) {
    return ["ETH", "FIN", "WEI"].includes(type || this.type);
  }

  public isTokenType(type?: any) {
    return ["DAI", "DEI"].includes(type || this.type);
  }

  public toBN() {
    return toBN(this._round(this.amount));
  }

  public format(_options: any) {
    const amt = this.amount;
    const options = {
      ...this.defaultOptions[this.type],
      ...(_options || {})
    };
    const symbol = options.symbol ? `${this.symbol}` : ``;
    const nDecimals = amt.length - amt.indexOf(".") - 1;
    const amount = options.round
      ? this.round(options.decimals)
      : options.decimals > nDecimals
      ? amt + "0".repeat(options.decimals - nDecimals)
      : options.decimals < nDecimals
      ? amt.substring(0, amt.indexOf(".") + options.decimals + 1)
      : amt;
    return `${symbol}${options.commas ? commify(amount) : amount}`;
  }

  public round(decimals: any) {
    const amt = this.amount;
    const nDecimals = amt.length - amt.indexOf(".") - 1;
    // rounding to more decimals than are available: pad with zeros
    if (typeof decimals === "number" && decimals > nDecimals) {
      return amt + "0".repeat(decimals - nDecimals);
    }
    // rounding to fewer decimals than are available: round
    // Note: rounding n=1099.9 to nearest int is same as floor(n + 0.5)
    // roundUp plays same role as 0.5 in above example
    if (typeof decimals === "number" && decimals < nDecimals) {
      const roundUp = toBN(`5${"0".repeat(18 - decimals - 1)}`);
      const rounded = this.fromWad(this.wad.add(roundUp));
      return rounded
        .slice(0, amt.length - (nDecimals - decimals))
        .replace(/\.$/, "");
    }
    // rounding to same decimals as are available: return amount w no changes
    return this.amount;
  }

  // In units of ray aka append an extra 36 units of precision
  // eg ETH:WEI rate is 1e18 ray aka 1e54
  public getRate = (currency: any) => {
    const exchangeRates = {
      DAI: this.toRay(this.daiRate),
      DEI: this.toRay(parseUnits(this.daiRate, 18).toString()),
      ETH: this.toRay("1"),
      FIN: this.toRay(parseUnits("1", 3).toString()),
      WEI: this.toRay(parseUnits("1", 18).toString())
    };
    if (
      (this.isEthType() && this.isEthType(currency)) ||
      (this.isTokenType() && this.isTokenType(currency))
    ) {
      return exchangeRates[currency];
    }
    if (!this.daiRateGiven) {
      // tslint:disable-next-line
      console.warn(
        `Provide DAI:ETH rate for accurate ${this.type} -> ${currency} conversions`
      );
      // tslint:disable-next-line
      console.warn(
        `Using default eth price of $${this.daiRate} (amount: ${this.amount})`
      );
    }
    return exchangeRates[currency];
  };

  public toDAI = (daiRate: any) => this._convert("DAI", daiRate);
  public toDEI = (daiRate: any) => this._convert("DEI", daiRate);
  public toETH = (daiRate: any) => this._convert("ETH", daiRate);
  public toFIN = (daiRate: any) => this._convert("FIN", daiRate);
  public toWEI = (daiRate: any) => this._convert("WEI", daiRate);

  ////////////////////////////////////////
  // Private Methods

  public _convert = (targetType: any, daiRate?: any) => {
    if (daiRate) {
      this.daiRate = daiRate;
      this.daiRateGiven = true;
    }
    const thisToTargetRate = this.toRay(this.getRate(targetType)).div(
      this.getRate(this.type)
    );
    const targetAmount = this.fromRay(
      this.fromRoundRay(this.ray.mul(thisToTargetRate))
    );
    // console.debug(`Converted: ${this.amount} ${this.type} => ${targetAmount} ${targetType}`)
    return new Currency(
      targetType,
      targetAmount.toString(),
      this.daiRateGiven ? this.daiRate : undefined
    );
  };

  // convert to wad, add 0.5 wad, convert back to dec string, then truncate decimal
  public _round = (decStr: any) =>
    this._floor(
      this.fromWad(this.toWad(decStr).add(this.toWad("0.5"))).toString()
    );

  public _floor = (decStr: any) => decStr.substring(0, decStr.indexOf("."));

  public toWad = (n: any) => parseUnits(n.toString(), 18);

  public toRay = (n: any) => this.toWad(this.toWad(n.toString()));

  public fromWad = (n: any) => formatUnits(n.toString(), 18);

  public fromRoundRay = (n: any) => this._round(this.fromRay(n));

  public fromRay = (n: any) =>
    this.fromWad(this._round(this.fromWad(n.toString())));
}
