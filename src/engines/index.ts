import { IRpcEngine } from "../helpers/types";
import { IAppState } from "../App";
import ethereum from "./ethereum";
import starkware from "./starkware";

class RpcEngine implements IRpcEngine {
  public engines: IRpcEngine[];
  constructor(engines: IRpcEngine[]) {
    this.engines = engines;
  }

  public filter(payload: any) {
    console.log("[filter]", "payload.method", payload.method);
    const engine = this.getEngine(payload);
    console.log("[filter]", "engine", engine);
    return engine.filter(payload);
  }

  public router(payload: any, state: IAppState, setState: any) {
    console.log("[router]", "payload.method", payload.method);
    const engine = this.getEngine(payload);
    console.log("[router]", "engine", engine);
    return engine.router(payload, state, setState);
  }

  public render(payload: any) {
    console.log("[render]", "payload.method", payload.method);
    const engine = this.getEngine(payload);
    console.log("[render]", "engine", engine);
    return engine.render(payload);
  }

  public signer(payload: any, state: IAppState, setState: any) {
    console.log("[signer]", "payload.method", payload.method);
    const engine = this.getEngine(payload);
    console.log("[signer]", "engine", engine);
    return engine.signer(payload, state, setState);
  }

  private getEngine(payload: any) {
    const match = this.engines.filter(engine => engine.filter(payload));
    if (!match || !match.length) {
      throw new Error(`No RPC Engine found to handle payload with method ${payload.method}`);
    }
    return match[0];
  }
}

export function getRpcEngine() {
  return new RpcEngine([ethereum, starkware]);
}
