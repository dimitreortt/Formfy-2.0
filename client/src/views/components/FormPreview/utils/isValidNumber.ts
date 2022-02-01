const isValidUSNumber = (phoneNumber: string) => {
  const usNumberRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
  return usNumberRegex.test(phoneNumber);
};

const isValidPhoneNumber = (phoneNumber: string) => {
  return isValidUSNumber(phoneNumber) || isValidBRNumber(phoneNumber);
};
