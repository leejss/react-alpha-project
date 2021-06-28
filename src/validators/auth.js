/*
    type result = {
        error: boolean,
        message: string
    }
*/

export const isEmpty = (state) => {
  for (let key in state) {
    if (!state[key]) {
      return {
        error: true,
        message: "There are missing fields",
      };
    }
  }
  return {
    error: false,
    message: "",
  };
};

export const isPasswordSame = (pwd, pwdConfirm) => {
  if (pwd !== pwdConfirm) {
    return {
      error: true,
      message: "Password is not matched with confirmation",
    };
  }
  return {
    error: false,
    message: "",
  };
};

export const isPasswordLong = (pwd) => {
  if (pwd.length < 6) {
    return {
      error: true,
      message: "Password is too short.",
    };
  }

  return {
    error: false,
    message: "",
  };
};
