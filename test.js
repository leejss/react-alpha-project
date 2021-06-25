const isFormEmpty = (state) => {
  for (let key in state) {
    if (!state[key]) {
      return false;
    }
  }
  return true;
};

const state = {
  usename: "test",
  email: "asd",
  password: "asd",
};

console.log(isFormEmpty(state));
