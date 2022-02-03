const isValidUSNumber = (phoneNumber: string) => {
  const usNumberRegex = /^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$/;
  return usNumberRegex.test(phoneNumber);
};

const isValidBRNumber = (phoneNumber: string) => {
  const brazilNumberRegex = /^[(]?[1-9]{2}[)]?[\s\.]?9[\s]?[0-9]{4}[-\s\.]?[0-9]{4}$/;
  return brazilNumberRegex.test(phoneNumber);
};

export const isValidPhoneNumber = (phoneNumber: string) => {
  return isValidUSNumber(phoneNumber) || isValidBRNumber(phoneNumber);
};
