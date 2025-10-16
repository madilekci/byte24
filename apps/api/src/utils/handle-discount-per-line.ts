export function handleDiscountPerLine(
  discount: number,
  totalPrice: number
): {
  discount: number;
  discountedTotalPrice: number;
  discountPrice: number;
} {
  let discountPrice = 0;
  if (discount && totalPrice >= discount) {
    discountPrice += discount;
    totalPrice -= discount;
    discount = 0;
  } else if (discount && totalPrice < discount) {
    discount -= totalPrice;
    discountPrice += totalPrice;
    totalPrice = 0;
  }

  return {
    discount,
    discountedTotalPrice: totalPrice,
    discountPrice,
  };
}
