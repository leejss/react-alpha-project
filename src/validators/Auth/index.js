// Validation
// export const isObjEmpty = (state) => {
//   for (let key in state) {
//     if (!state[key]) {
//       return false;
//     }
//   }
// };

// export const isPasswordValid = ({ password, passwordConfirmation }) => {
//   if (password.length < 6 || passwordConfirmation.length < 6) {
//     return false;
//   } else if (password !== passwordConfirmation) {
//     return false;
//   }
//   return true;
// };

// export const isFormValid = (user) => {
//   let error;
//   if (isObjEmpty(user)) {
//     error = { message: "Fill in all fields" };
//     setErrors((prev) => prev.concat(error));
//     return false;
//   } else if (!isPasswordValid(user)) {
//     // throw Error
//     error = { message: "Password is invalid" };
//     setErrors((prev) => prev.concat(error));
//     return false;
//   } else {
//     return true;
//   }
// };
