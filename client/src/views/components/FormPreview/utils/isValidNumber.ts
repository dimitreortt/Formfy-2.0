const isValidPhoneNumber = (phoneNumber: string) => {
  return isValidUSNumber(phoneNumber) || isValidBRNumber(phoneNumber);
};
