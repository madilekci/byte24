const formatVatList = (total, vatPercentage, vatTotal) => {
  let vatIndex = total.vatList?.findIndex(
    (vatItem) => Number(vatItem?.vatPercentage) === Number(vatPercentage)
  );

  if (vatIndex >= 0) total.vatList[vatIndex].vatTotal += vatTotal;
  else total.vatList.push({ vatPercentage, vatTotal });
};

export default formatVatList;
