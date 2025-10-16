interface Number {
  round(a: number): number;
  roundWithoutZeros(a: number, p: number): string;
  preciseRound(precision: number): number;
}

Number.prototype.round = function (p: any) {
  var factor = Math.pow(10, p);
  var n = p < 0 ? this : 0.01 / factor + this;
  return Math.round(n * factor) / factor;
};

Number.prototype.roundWithoutZeros = function (a, p: any) {
  return a.toFixed(p).replace(/\.0+$/, '');
};

// Precision round function
Number.prototype.preciseRound = function (precision) {
  var factor = Math.pow(10, precision);
  var n = precision < 0 ? this : 0.01 / factor + this;
  return Math.round(n * factor) / factor;
};
