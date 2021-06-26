// Action Type
const SET_USER = "SET_USER";
const CLEAR_USER = "CLEAR_USER";

// Action Creator
export const setUser = (user) => ({
  type: SET_USER,
  payload: {
    currentUser: user,
  },
});

export const clearUser = () => ({
  type: CLEAR_USER,
});

// Intial State
const initialState = {
  currentUser: null,
  isLoading: true,
};

// reducer
export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        currentUser: action.payload.currentUser,
        isLoading: false,
      };
    case CLEAR_USER:
      return {
        ...initialState,
        isLoading: false,
      };
    default:
      return state;
  }
};
