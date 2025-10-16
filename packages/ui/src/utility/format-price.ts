interface IFormatPrice {
  price: any;
  includePrefix?: boolean;
  language?: 'nl' | 'en';
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
  dashFractionDigits?: boolean;
}

const defaultOptions = {
  includePrefix: true,
  language: 'nl',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
  dashFractionDigits: false,
};

export const formatPrice = (options: IFormatPrice) => {
  const {
    price,
    language,
    includePrefix,
    minimumFractionDigits,
    maximumFractionDigits,
    dashFractionDigits,
  } = { ...defaultOptions, ...options };

  let lng = language === 'nl' ? 'nl-NL' : 'en-US';
  const currencyPrefix = '€ ';

  let fractionDigits = minimumFractionDigits;
  if (price && parseFloat(price) % 1 !== 0) {
    fractionDigits = maximumFractionDigits;
  }

  const convertedPrice = price
    ? parseFloat(price).toLocaleString(lng, {
        minimumFractionDigits: fractionDigits,
        maximumFractionDigits: fractionDigits,
      })
    : '-';

  const dash = fractionDigits === 0 && dashFractionDigits ? ',-' : '';
  return `${includePrefix ? currencyPrefix : ''}${convertedPrice}${dash}`;
};
export default formatPrice;
