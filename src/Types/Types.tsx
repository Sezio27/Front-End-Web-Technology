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
    rebateQuantity: number | null;
    rebatePercent: number | null;
    upsellProductId: string | null;
  }

export type BasketFunctions = {
    onQuantityChange: (id: string, quantity: number) => void
    removeFromCart: (id: string) => void
    changeToUpsell: (id: string) => void
    isProductInBasket: (id: string) => boolean
    getProductName: (id: string) => string | undefined
};

export type QuantityPickerProps = {
    quantity: number,
    onQuantityChange: (newQuantity: number) => void
};

export type BasketTotals = {
    totalQuantity: number,
    totalPrice: number
}