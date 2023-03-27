import { RoundToNearestHalf, TwoDecimals } from "./NumberUtitlity";
import { ICalculateSavings } from "./UtilityTypes";

export const calculateItemDiscount = ({ subTotal, rebatePercentage }: ICalculateSavings) => {
  if(subTotal < 0) return 0
  return TwoDecimals(subTotal - (subTotal * (1 - (rebatePercentage/100))))
};
