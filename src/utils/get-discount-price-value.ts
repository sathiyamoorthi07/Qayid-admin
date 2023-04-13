export function getDiscountPriceValue(salesPrice: number, offerPrice: number) {
  return (salesPrice - offerPrice).toFixed(0);
}
