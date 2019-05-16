import variable from "./../variables/platform";

export default (variables = variable) => {
  const h3Theme = {
    color: variables.textColorH3,
    fontSize: variables.fontSizeH3,
    lineHeight: variables.lineHeightH3,
    fontWeight: variables.fontWeightH3,
    flex: variables.flexH3
  };

  return h3Theme;
};
