export const emailValidator = {
  pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
  message: "Incorrect email format",
};

export const passwordValidator = {
  pattern:
    /^(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*?[#?!@$%^&*-]).{8,32}$/,
  message: "Incorrect password format",
};

export const passwordConfirmValidator = {
  pattern:
    /^(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*?[#?!@$%^&*-]).{8,32}$/,
  message: "Incorrect confirmation Password format",
};
