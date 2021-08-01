export const appContants = {
  visaCardRegex: /^4[0-9]{12}(?:[0-9]{3}){0,2}$/,
  masterCardRegex: /^5[1-5][0-9]{14}$/,
  masterCardRegex2: /^2[2-7][0-9]{14}$/,
  amexCardRegex: /^3[47][0-9]{13}$/,
  cvvRegex: /^[0-9]{3,4}$/,
  spaceAfterFourthCharRegex: /(.{4})/g,
  avoidAlphabet: /[^\dA-Z]/,
  spninnerDiameter: '40'
};
