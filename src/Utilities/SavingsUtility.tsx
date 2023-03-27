import { RoundToNearestHalf, CutToTwoDecimals } from "./NumberUtitlity";
import { ICalculateSavings } from "./UtilityTypes";

export const calculateItemDiscount = ({ subTotal, rebatePercentage }: ICalculateSavings) => {
  if(subTotal < 0) return 0

  return Number((subTotal - (subTotal * (1 - rebatePercentage))).toFixed(2))
};
