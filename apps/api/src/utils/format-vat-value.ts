const formatVatValue = (value: number, applyReverseVat: boolean) => {
  return applyReverseVat ? 0 : value;
};
export default formatVatValue;
