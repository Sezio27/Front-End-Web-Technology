export type Product = {
    id: string;
    name: string;
    price: number;
    currency: string;
    rebateQuantity: number | null;
    rebatePercent: number | null;
    upsellProductId: string | null;
    
};

export type Item = {
    id: string;
    quantity: number;
    name: string;
    price: number;
    currency: string;
  }

export type BasketFunctions = {
    onQuantityChange: (id: string, quantity: number) => void
    removeFromCart: (id: string) => void
};

export type QuantityPickerProps = {
    quantity: number,
    onQuantityChange: (newQuantity: number) => void
};

export type BasketTotals = {
    totalQuantity: number,
    totalPrice: number
}