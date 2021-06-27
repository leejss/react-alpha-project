const SET_CURRENT_CHANNEL = "SET_CURRENT_CHANNEL";

export const setCurrentChannel = (channel) => ({
  type: SET_CURRENT_CHANNEL,
  payload: channel,
});

const initialState = {
  currentChannel: null,
};

const channelReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_CHANNEL:
      return {
        ...state,
        currentChannel: action.payload,
      };

    default:
      return state;
  }
};

export default channelReducer;
