import { getFeeAmountEnum } from "../../../utils";
import { FeeAmount, PermitV } from "../../../wrap";
import { Module } from "../../..";

const module: Module = new Module();

describe('Enum utils', () => {

  it('getFeeAmount', () => {
    expect(module.getFeeAmount({ feeAmount: FeeAmount.LOWEST })).toStrictEqual(100);
    expect(module.getFeeAmount({ feeAmount: FeeAmount.LOW })).toStrictEqual(500);
    expect(module.getFeeAmount({ feeAmount: FeeAmount.MEDIUM })).toStrictEqual(3000);
    expect(module.getFeeAmount({ feeAmount: FeeAmount.HIGH })).toStrictEqual(10000);

    const error = (): void => { module.getFeeAmount({ feeAmount: 7 }) };
    expect(error).toThrow();
  });

  it('getFeeAmountEnum', () => {
    expect(getFeeAmountEnum(100)).toStrictEqual(FeeAmount.LOWEST);
    expect(getFeeAmountEnum(500)).toStrictEqual(FeeAmount.LOW);
    expect(getFeeAmountEnum(3000)).toStrictEqual(FeeAmount.MEDIUM);
    expect(getFeeAmountEnum(10000)).toStrictEqual(FeeAmount.HIGH);
    const error = (): void => { getFeeAmountEnum(7) };
    expect(error).toThrow();
  });

  it('getTickSpacings', () => {
    expect(module.feeAmountToTickSpacing({ feeAmount: FeeAmount.LOWEST})).toStrictEqual(1);
    expect(module.feeAmountToTickSpacing({ feeAmount: FeeAmount.LOW})).toStrictEqual(10);
    expect(module.feeAmountToTickSpacing({ feeAmount: FeeAmount.MEDIUM})).toStrictEqual(60);
    expect(module.feeAmountToTickSpacing({ feeAmount: FeeAmount.HIGH})).toStrictEqual(200);

    const error = (): void => { module.feeAmountToTickSpacing({ feeAmount: 7 }) };
    expect(error).toThrow();
  });

  it('getPermitV', () => {
    expect(module.getPermitV({ permitV: PermitV.v_0 })).toStrictEqual(0);
    expect(module.getPermitV({ permitV: PermitV.v_1 })).toStrictEqual(1);
    expect(module.getPermitV({ permitV: PermitV.v_27 })).toStrictEqual(27);
    expect(module.getPermitV({ permitV: PermitV.v_28 })).toStrictEqual(28);

    const error = (): void => { module.getPermitV({ permitV: 7 }) };
    expect(error).toThrow();
  });
});