const isStringEmpty = string => {
  return !/\S/.test(string) || string === '';
};

export default isStringEmpty;
