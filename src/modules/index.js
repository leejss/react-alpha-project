import { combineReducers } from "redux";
import channelReducer from "./channel";
import { userReducer } from "./user";

const rootReducer = combineReducers({
  user: userReducer,
  channel: channelReducer,
});

export default rootReducer;
