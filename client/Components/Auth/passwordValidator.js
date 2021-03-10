export const passwordStrengthChecker = (password) => {
  const hasUppercase = /(?=.*[A-Z])/;
  const hasDigit = /(?=.*\d)/;
  const hasSymbol = /[-!$#!@%^&*()_+|~=`{}\[\]:";'<>?,.\/]/;
  const passwordLength = [7, 12];

  if (!password) {
    return "";
  }

  if (!hasUppercase.test(password)) {
    return { name: "weak", suggestion: "Needs at least one uppercase letter" };
  }

  if (password.length <= passwordLength[0]) {
    return { name: "weak", suggestion: "Needs at least 7 characters" };
  }

  if (
    password.length >= passwordLength[1] &&
    hasDigit.test(password) &&
    hasSymbol.test(password)
  ) {
    return { name: "strong", suggestion: "" };
  }

  if (
    password.length >= passwordLength[0] &&
    password.length <= passwordLength[1] &&
    hasDigit.test(password) &&
    hasSymbol.test(password)
  ) {
    return { name: "good", suggestion: "Get to at least 12 characters" };
  }

  if (
    (password.length >= passwordLength[0] ||
      password.length <= passwordLength[1]) &&
    hasDigit.test(password)
  ) {
    return { name: "good", suggestion: "Add at least one symbol" };
  }

  if (
    (password.length >= passwordLength[0] ||
      password.length <= passwordLength[1]) &&
    hasSymbol.test(password)
  ) {
    return { name: "good", suggestion: "Add at least one digit" };
  }

  if (password.length >= passwordLength[0]) {
    return { name: "fair", suggestion: "Add at least one digit or a symbol" };
  }

  // default case
  return { name: "weak", suggestion: "" };
};

export const strengthBar = (value) => {
  if (value === "fair") {
    return { color: "orange", width: "33%" };
  }
  if (value === "good") {
    return { color: "#0092ffc9", width: "66%" };
  }
  if (value === "strong") {
    return { color: "#34e034", width: "100%" };
  }

  //  if weak
  return { color: "", width: "0%" };
};
