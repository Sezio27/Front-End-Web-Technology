export const RoundToNearestHalf = (numb: number) => {
   return (Math.round(numb * 2) / 2)
}

export const TwoDecimals = (numb: number):number => {
   return Number(numb.toFixed(2))
}