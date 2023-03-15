import { Module } from "../../..";
import { MAX_UINT_256 } from "../../../utils";
import { BigInt } from "@polywrap/wasm-as";

const module: Module = new Module();

describe('mostSignificantBit', () => {

  it('throws for zero', () => {
    const throwsZero = (): void => {
      const x: BigInt = BigInt.ZERO;
      module.mostSignificantBit({ x });
    };
    expect(throwsZero).toThrow('ZERO');
  });

  it('correct value for every power of 2', () => {
    for (let i = 1; i < 256; i++) {
      const x: BigInt = BigInt.ONE.leftShift(i);
      expect(module.mostSignificantBit({ x })).toStrictEqual(i);
    }
  });

  it('correct value for every power of 2 - 1', () => {
    for (let i = 2; i < 256; i++) {
      const x: BigInt = BigInt.ONE.leftShift(i).subInt(1);
      expect(module.mostSignificantBit({ x })).toStrictEqual(i - 1);
    }
  });

  it('succeeds for MaxUint256', () => {
    expect(module.mostSignificantBit({ x: MAX_UINT_256 })).toStrictEqual(255);
  });
})