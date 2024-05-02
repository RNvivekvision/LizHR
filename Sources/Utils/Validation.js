const isUsernameValid = username => {
  return username.length > 2;
};

const isEmailValid = Email => {
  const regEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
  return regEx.test(Email) && Email.length > 0;
};

const isMobileNumberValid = MobileNumber => {
  const regEx = /^([0|\+[0-9]{1,5})?([5-9][0-9]{9})$/;
  return regEx.test(MobileNumber) && MobileNumber.length > 9;
};

const isPasswordValid = Password => Password.length > 4;

const isSamePasswords = (Password, ConfirmPassword) =>
  Password === ConfirmPassword;

const isPINValid = PIN => PIN.length === 4;

const isSamePIN = (PIN, ConfirmPIN) =>
  PIN.length === 4 && ConfirmPIN.length === 4 && PIN === ConfirmPIN;

const Validation = {
  isUsernameValid,
  isEmailValid,
  isMobileNumberValid,
  isPasswordValid,
  isSamePasswords,
  isPINValid,
  isSamePIN,
};

export default Validation;
