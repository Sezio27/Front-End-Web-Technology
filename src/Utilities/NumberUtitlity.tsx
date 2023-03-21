export const RoundToNearestHalf = (numb: number) => {
   return (Math.round(numb * 2) / 2)
}

export const CutToTwoDecimals = (numb: number):number => {
   return (Number.parseInt(numb.toFixed(2)))
}