import { RoundToNearestHalf } from "./NumberUtitlity";
import { ICalculateSavings } from "./UtilityTypes";

export const calculateItemDiscount = ({ subTotal, rebatePercentage }: ICalculateSavings) => {
  if(subTotal < 0) return 0

  return (subTotal - RoundToNearestHalf(subTotal * (1 - rebatePercentage)))
};
