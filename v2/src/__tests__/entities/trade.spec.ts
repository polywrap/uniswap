import { Box, BigInt } from "@polywrap/wasm-as";
import { Module } from "../../index";
import { ChainId, Pair, Token, TradeType } from "../../wrap";

const module: Module = new Module();

const token0: Token = {
  chainId: ChainId.MAINNET,
  address: "0x0000000000000000000000000000000000000001",
  currency: {
    decimals: 18,
    symbol: "t0",
    name: null,
  }
}
const token1: Token = {
  chainId: ChainId.MAINNET,
  address: "0x0000000000000000000000000000000000000002",
  currency: {
    decimals: 18,
    symbol: "t1",
    name: null,
  }
}
const token2: Token = {
  chainId: ChainId.MAINNET,
  address: "0x0000000000000000000000000000000000000003",
  currency: {
    decimals: 18,
    symbol: "t2",
    name: null,
  }
}
const token3: Token = {
  chainId: ChainId.MAINNET,
  address: "0x0000000000000000000000000000000000000004",
  currency: {
    decimals: 18,
    symbol: "t3",
    name: null,
  }
}

// const tokenEth: Token = {
//   chainId: ChainId.MAINNET,
//   address: "",
//   currency: ETHER
// }
//
// const tokenWeth: Token = getWETH9(ChainId.MAINNET);

const pair_0_1: Pair = {
  tokenAmount0: {
    amount: BigInt.fromString("1000"),
    token: token0
  },
  tokenAmount1: {
    amount: BigInt.fromString("1000"),
    token: token1
  }
}
const pair_0_2: Pair = {
  tokenAmount0: {
    amount: BigInt.fromString("1000"),
    token: token0
  },
  tokenAmount1: {
    amount: BigInt.fromString("1100"),
    token: token2
  }
}
const pair_0_3: Pair = {
  tokenAmount0: {
    amount: BigInt.fromString("1000"),
    token: token0
  },
  tokenAmount1: {
    amount: BigInt.fromString("900"),
    token: token3
  }
}
const pair_1_2: Pair = {
  tokenAmount0: {
    amount: BigInt.fromString("1200"),
    token: token1
  },
  tokenAmount1: {
    amount: BigInt.fromString("1000"),
    token: token2
  }
}
const pair_1_3: Pair = {
  tokenAmount0: {
    amount: BigInt.fromString("1200"),
    token: token1
  },
  tokenAmount1: {
    amount: BigInt.fromString("1300"),
    token: token3
  }
}

const empty_pair_0_1: Pair = {
  tokenAmount0: {
    amount: BigInt.ZERO,
    token: token0
  },
  tokenAmount1: {
    amount: BigInt.ZERO,
    token: token1
  }
}

// const pair_weth_1: Pair = {
//   tokenAmount0: {
//     amount: "1000",
//     token: tokenWeth
//   },
//   tokenAmount1: {
//     amount: "1000",
//     token: token1
//   }
// }

const exactIn = module.createTrade({
  route: module.createRoute({
    pairs: [pair_0_1, pair_1_2],
    input: token0,
    output: null,
  }),
  amount: {
    token: token0,
    amount: BigInt.fromString("100")
  },
  tradeType: TradeType.EXACT_INPUT
})
const exactOut = module.createTrade({
  route: module.createRoute({
    pairs: [pair_0_1, pair_1_2],
    input: token0,
    output: null,
  }),
  amount: {
    token: token2,
    amount: BigInt.fromString("100")
  },
  tradeType: TradeType.EXACT_OUTPUT
})

describe("Trade", () => {

  describe("bestTradeExactIn", () => {
    test("throws with empty pairs", () => {
      expect(() => {
        module.bestTradeExactIn({
          pairs: [],
          amountIn: {
            token: token0,
            amount: BigInt.fromString("100")
          },
          tokenOut: token2,
          options: null,
        })
      }).toThrow();
    })

    test("throws with max hops of 0", () => {
      expect(() => {
        module.bestTradeExactIn({
          pairs: [pair_0_2],
          amountIn: {
            token: token0,
            amount: BigInt.fromString("100")
          },
          tokenOut: token2,
          options: {
            maxHops: Box.from<u32>(0),
            maxNumResults: null,
          },
        })
      }).toThrow();
    })

    test("provides best route", () => {
      const result = module.bestTradeExactIn({
        pairs: [
          pair_0_1, pair_0_2, pair_1_2
        ],
        amountIn: {
          token: token0,
          amount: BigInt.fromString("100")
        },
        tokenOut: token2,
        options: null,
      });

      expect(result.length).toStrictEqual(2);
      expect(result[0].route.pairs.length).toStrictEqual(1)
      expect(result[0].route.path).toStrictEqual([token0, token2]);
      expect(result[0].inputAmount).toStrictEqual({
        token: token0,
        amount: BigInt.fromString("100")
      })
      expect(result[1].route.pairs.length).toStrictEqual(2);
      expect(result[1].route.path).toStrictEqual([token0, token1, token2]);
      expect(result[1].inputAmount).toStrictEqual({
        token: token0,
        amount: BigInt.fromString("100")
      })
    });

    test("doesn't throw for zero liquidity pairs", () => {
      const result =  module.bestTradeExactIn({
        pairs: [empty_pair_0_1],
        amountIn: {
          token: token0,
          amount: BigInt.fromString("100")
        },
        tokenOut: token1,
        options: null
      });
      expect(result.length).toStrictEqual(0);
    });

    test("respects maxHops", () => {
      const result =  module.bestTradeExactIn({
        pairs: [pair_0_1, pair_0_2, pair_1_2],
        amountIn: {
          token: token0,
          amount: BigInt.fromString("10")
        },
        tokenOut: token2,
        options: {
          maxHops: Box.from<u32>(1),
          maxNumResults: null,
        }
      });

      expect(result.length).toStrictEqual(1);
      expect(result[0].route.pairs.length).toStrictEqual(1);
      expect(result[0].route.path).toStrictEqual([token0, token2]);
    });

    test("insufficient input for one pair", () => {
      const result =  module.bestTradeExactIn({
        pairs: [pair_0_1, pair_0_2, pair_1_2],
        amountIn: {
          token: token0,
          amount: BigInt.fromString("1")
        },
        tokenOut: token2,
        options: {
          maxHops: Box.from<u32>(1),
          maxNumResults: null,
        }
      });

      expect(result.length).toStrictEqual(1);
      expect(result[0].route.pairs.length).toStrictEqual(1);
      expect(result[0].route.path).toStrictEqual([token0, token2]);
      expect(result[0].outputAmount).toStrictEqual({
        token: token2,
        amount: BigInt.fromString("1")
      })
    });


    test("respects n", () => {
      const result =  module.bestTradeExactIn({
        pairs: [pair_0_1, pair_0_2, pair_1_2],
        amountIn: {
          token: token0,
          amount: BigInt.fromString("10")
        },
        tokenOut: token2,
        options: {
          maxHops: null,
          maxNumResults: Box.from<u32>(1),
        }
      });

      // TODO: respect maxNumResults param
      expect(result.length).toStrictEqual(1);
    });

    test("no path", () => {
      const result =  module.bestTradeExactIn({
        pairs: [pair_0_1, pair_0_3, pair_1_3],
        amountIn: {
          token: token0,
          amount: BigInt.fromString("10")
        },
        tokenOut: token2,
        options: null
      });

      expect(result.length).toStrictEqual(0);
    });

    // TODO: WETH bestTrade as-pect unit tests are not compiling correctly (e.g. the expected token is changing values without being modified and more)
    // test("exactIn accepts Eth input", () => {
    //   const result =  module.bestTradeExactIn({
    //     pairs: [pair_weth_1, pair_0_1, pair_0_3, pair_1_3],
    //     amountIn: {
    //       token: tokenEth,
    //       amount: "10"
    //     },
    //     tokenOut: token1,
    //     options: null
    //   });
    //   expect(result.length).toStrictEqual(1);
    //   expect(result[0].route.pairs.length).toStrictEqual(1);
    //   expect(result[0].route.path).toStrictEqual([tokenWeth, token1]);
    //   expect(result[0].inputAmount).toStrictEqual({
    //     token: tokenEth,
    //     amount: "10"
    //   });
    // });
    //
    // test("exactIn accepts Eth output", () => {
    //   const result =  module.bestTradeExactIn({
    //     pairs: [pair_weth_1, pair_0_1, pair_0_3, pair_1_3],
    //     amountIn: {
    //       token: token1,
    //       amount: "10"
    //     },
    //     tokenOut: tokenEth,
    //     options: null
    //   });
    //   expect(result.length).toStrictEqual(1);
    //   expect(result[0].route.pairs.length).toStrictEqual(1);
    //   expect(result[0].route.path).toStrictEqual([token1, tokenWeth]);
    //   expect(result[0].outputAmount.token).toStrictEqual(tokenEth);
    // });
    //
    // test("exactOut accepts Eth input", () => {
    //   const result =  module.bestTradeExactOut({
    //     pairs: [pair_weth_1, pair_0_1, pair_0_3, pair_1_3],
    //     amountOut: {
    //       token: token1,
    //       amount: "10"
    //     },
    //     tokenIn: tokenEth,
    //     options: null
    //   });
    //   expect(result.length).toStrictEqual(1);
    //   expect(result[0].route.pairs.length).toStrictEqual(1);
    //   expect(result[0].route.path).toStrictEqual([tokenWeth, token1]);
    //   expect(result[0].inputAmount.token).toStrictEqual(tokenEth);
    // });
    //
    // test("exactOut accepts Eth output", () => {
    //   const result =  module.bestTradeExactOut({
    //     pairs: [pair_weth_1, pair_0_1, pair_0_3, pair_1_3],
    //     amountOut: {
    //       token: tokenEth,
    //       amount: "10"
    //     },
    //     tokenIn: token1,
    //     options: null
    //   });
    //   expect(result.length).toStrictEqual(1);
    //   expect(result[0].route.pairs.length).toStrictEqual(1);
    //   expect(result[0].route.path).toStrictEqual([token1, tokenWeth]);
    //   expect(result[0].outputAmount).toStrictEqual({
    //     token: tokenEth,
    //     amount: "10"
    //   });
    // });

  });

  describe("bestTradeExactOut", () => {
    test("throws with empty pairs", () => {
      expect(() => {
        module.bestTradeExactOut({
          pairs: [],
          amountOut: {
            token: token2,
            amount: BigInt.fromString("100")
          },
          tokenIn: token0,
          options: null,
        })
      }).toThrow();
    })

    test("throws with max hops of 0", () => {
      expect(() => {
        module.bestTradeExactOut({
          pairs: [pair_0_2],
          amountOut: {
            token: token2,
            amount: BigInt.fromString("100")
          },
          tokenIn: token0,
          options: {
            maxHops: Box.from<u32>(0),
            maxNumResults: null,
          },
        })
      }).toThrow();
    })

    test("provides best route", () => {
      const result = module.bestTradeExactOut({
        pairs: [
          pair_0_1, pair_0_2, pair_1_2
        ],
        amountOut: {
          token: token2,
          amount: BigInt.fromString("100")
        },
        tokenIn: token0,
        options: null,
      });

      expect(result.length).toStrictEqual(2);
      expect(result[0].route.pairs.length).toStrictEqual(1)
      expect(result[0].route.path).toStrictEqual([token0, token2]);
      expect(result[0].inputAmount).toStrictEqual({
        token: token0,
        amount: BigInt.fromString("101")
      })
      expect(result[0].outputAmount).toStrictEqual({
        token: token2,
        amount: BigInt.fromString("100")
      })
      expect(result[1].route.pairs.length).toStrictEqual(2);
      expect(result[1].route.path).toStrictEqual([token0, token1, token2]);
      expect(result[1].inputAmount).toStrictEqual({
        token: token0,
        amount: BigInt.fromString("156")
      })
      expect(result[0].outputAmount).toStrictEqual({
        token: token2,
        amount: BigInt.fromString("100")
      })
    });

    test("doesn't throw for zero liquidity pairs", () => {
      const result =  module.bestTradeExactOut({
        pairs: [empty_pair_0_1],
        amountOut: {
          token: token1,
          amount: BigInt.fromString("100")
        },
        tokenIn: token1,
        options: null
      });
      expect(result.length).toStrictEqual(0);
    });

    test("respects maxHops", () => {
      const result =  module.bestTradeExactOut({
        pairs: [pair_0_1, pair_0_2, pair_1_2],
        amountOut: {
          token: token2,
          amount: BigInt.fromString("10")
        },
        tokenIn: token0,
        options: {
          maxHops: Box.from<u32>(1),
          maxNumResults: null,
        }
      });

      expect(result.length).toStrictEqual(1);
      expect(result[0].route.pairs.length).toStrictEqual(1);
      expect(result[0].route.path).toStrictEqual([token0, token2]);
    });

    test("insufficient liquidity", () => {
      const result =  module.bestTradeExactOut({
        pairs: [pair_0_1, pair_0_2, pair_1_2],
        amountOut: {
          token: token2,
          amount: BigInt.fromString("1200")
        },
        tokenIn: token0,
        options: null
      });

      expect(result.length).toStrictEqual(0);
    });

    test("insufficient liquidity in one pair but not the other", () => {
      const result =  module.bestTradeExactOut({
        pairs: [pair_0_1, pair_0_2, pair_1_2],
        amountOut: {
          token: token2,
          amount: BigInt.fromString("1050")
        },
        tokenIn: token0,
        options: null
      });

      expect(result.length).toStrictEqual(1);
    });

    test("respects n", () => {
      const result =  module.bestTradeExactOut({
        pairs: [pair_0_1, pair_0_2, pair_1_2],
        amountOut: {
          token: token2,
          amount: BigInt.fromString("10")
        },
        tokenIn: token0,
        options: {
          maxHops: null,
          maxNumResults: Box.from<u32>(1),
        }
      });

      // TODO: respect maxNumResults param
      expect(result.length).toStrictEqual(1);
    });

    test("no path", () => {
      const result =  module.bestTradeExactOut({
        pairs: [pair_0_1, pair_0_3, pair_1_3],
        amountOut: {
          token: token2,
          amount: BigInt.fromString("10")
        },
        tokenIn: token0,
        options: null
      });

      expect(result.length).toStrictEqual(0);
    });

    // TODO: WETH implementation and tests
  });

  describe("tradeMinimumAmountOut", () => {

    describe("tradeType = EXACT_INPUT", () => {
      test("throws if less than 0", () => {
        expect(() => {
          module.tradeMinimumAmountOut({
          trade: exactIn,
          slippageTolerance: "-1"
        })}).toThrow()
      })

      test("returns  exact if nonzero", () => {
        expect(module.tradeMinimumAmountOut({
          trade: exactIn,
          slippageTolerance: "2"
        })).toStrictEqual({
          token: token2,
          amount: BigInt.fromString("23")
        })

        expect(module.tradeMinimumAmountOut({
          trade: exactIn,
          slippageTolerance: "0.05"
        })).toStrictEqual({
          token: token2,
          amount: BigInt.fromString("65")
        })

        expect(module.tradeMinimumAmountOut({
          trade: exactIn,
          slippageTolerance: "0"
        })).toStrictEqual({
          token: token2,
          amount: BigInt.fromString("69")
        })
      })
    });

    describe("tradeType = EXACT_OUTPUT", () => {
      test("throws if less than 0", () => {
        expect(() => {
          module.tradeMinimumAmountOut({
          trade: exactOut,
          slippageTolerance: "-1"
        })}).toThrow()
      })

      test("returns exact if nonzero", () => {
        expect(module.tradeMinimumAmountOut({
          trade: exactOut,
          slippageTolerance: "2"
        })).toStrictEqual({
          token: token2,
          amount: BigInt.fromString("100")
        })

        expect(module.tradeMinimumAmountOut({
          trade: exactOut,
          slippageTolerance: "0.05"
        })).toStrictEqual({
          token: token2,
          amount: BigInt.fromString("100")
        })

        expect(module.tradeMinimumAmountOut({
          trade: exactOut,
          slippageTolerance: "0"
        })).toStrictEqual({
          token: token2,
          amount: BigInt.fromString("100")
        })
      })
    });
  });

  describe("tradeMaximumAmountIn", () => {

    describe("tradeType = EXACT_INPUT", () => {
      test("throws if less than 0", () => {
        expect(() => {
          module.tradeMaximumAmountIn({
          trade: exactIn,
          slippageTolerance: "-1"
        })}).toThrow()
      })

      test("returns  exact if nonzero", () => {
        expect(module.tradeMaximumAmountIn({
          trade: exactIn,
          slippageTolerance: "2"
        })).toStrictEqual({
          token: token0,
          amount: BigInt.fromString("100")
        })

        expect(module.tradeMaximumAmountIn({
          trade: exactIn,
          slippageTolerance: "0.05"
        })).toStrictEqual({
          token: token0,
          amount: BigInt.fromString("100")
        })

        expect(module.tradeMaximumAmountIn({
          trade: exactIn,
          slippageTolerance: "0"
        })).toStrictEqual({
          token: token0,
          amount: BigInt.fromString("100")
        })
      })
    });

    describe("tradeType = EXACT_OUTPUT", () => {
      test("throws if less than 0", () => {
        expect(() => {
          module.tradeMaximumAmountIn({
          trade: exactOut,
          slippageTolerance: "-1"
        })}).toThrow()
      })

      test("returns  exact if nonzero", () => {
        expect(module.tradeMaximumAmountIn({
          trade: exactOut,
          slippageTolerance: "2"
        })).toStrictEqual({
          token: token0,
          amount: BigInt.fromString("468")
        })

        expect(module.tradeMaximumAmountIn({
          trade: exactOut,
          slippageTolerance: "0.05"
        })).toStrictEqual({
          token: token0,
          amount: BigInt.fromString("163")
        })

        expect(module.tradeMaximumAmountIn({
          trade: exactOut,
          slippageTolerance: "0"
        })).toStrictEqual({
          token: token0,
          amount: BigInt.fromString("156")
        })
      })
    });
  });
})
