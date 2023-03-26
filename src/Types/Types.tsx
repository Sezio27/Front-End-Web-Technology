export type Product = {
  id: string;
  name: string;
  price: number;
  currency: string;
  rebateQuantity: number | null;
  rebatePercent: number | null;
  upsellProductId: string | null;
  imageUrl: string | undefined
};

export type Item = {
  product: Product
  quantity: number;
};

export type BasketTotals = {
  totalQuantity: number;
  totalPrice: number;
  totalSavings: number
  totalDiscountActive: boolean
};

export type QuantityPickerProps = {
  productId: string
  quantity: number;
};



export enum SavingsActionKind {
    INCREASE = "INCREASE",
    DECREASE = "DECREASE",
} 

export type SavingsAction = {
    type: SavingsActionKind
    payload: number
} 

export type SavingsState = {
    value: number
}
