import { BestTradeOptions } from "../wrap";

import { Box } from "@polywrap/wasm-as";

export class TradeOptions {
  maxNumResults: u32;
  maxHops: u32;

  constructor(options: BestTradeOptions | null) {
    if (options == null) {
      this.maxNumResults = 3;
      this.maxHops = 3;
    } else {
      this.maxNumResults = options.maxNumResults === null
        ? 3
        : (options.maxNumResults as Box<u32>).unwrap();
      this.maxHops = options.maxHops === null ? 3 : (options.maxHops as Box<u32>).unwrap();
    }
  }
}
