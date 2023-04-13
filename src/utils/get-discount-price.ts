export function getDiscountPrice(salesPrice: number ,offerPrice: number) {
  
  return (((salesPrice - offerPrice) / salesPrice) * 100).toFixed(0);

}
