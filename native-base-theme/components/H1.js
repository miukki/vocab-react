import variable from "./../variables/platform";

export default (variables = variable) => {
  const h1Theme = {
    color: variables.textColorH1,
    fontSize: variables.fontSizeH1,
    lineHeight: variables.lineHeightH1,
    fontWeight: variables.fontWeightH1
  };

  return h1Theme;
};
