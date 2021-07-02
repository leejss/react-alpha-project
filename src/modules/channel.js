const SET_CURRENT_CHANNEL = "SET_CURRENT_CHANNEL";
const SET_PRIVATE_CHANNEL = "SET_PRIVATE_CHANNEL";
const SET_USER_POSTS = "SET_USER_POSTS";

export const setCurrentChannel = (channel) => ({
  type: SET_CURRENT_CHANNEL,
  payload: channel,
});
export const setPrivateChannel = (bool) => ({
  type: SET_PRIVATE_CHANNEL,
  payload: bool,
});
export const setUserPosts = (posts) => ({
  type: SET_USER_POSTS,
  payload: posts,
});

const initialState = {
  currentChannel: null,
  isPrivateChannel: false,
  usersPosts: [],
};

const channelReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_CHANNEL:
      return {
        ...state,
        currentChannel: action.payload,
      };
    case SET_PRIVATE_CHANNEL:
      return {
        ...state,
        isPrivateChannel: action.payload,
      };

    case SET_USER_POSTS:
      return {
        ...state,
        usersPosts: action.payload,
      };

    default:
      return state;
  }
};

export default channelReducer;
