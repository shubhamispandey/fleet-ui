import { combineReducers } from "redux";
import authSlice from "./slices/authSlice";
import meetSlice from "./slices/meetSlice";
import usersSlice from "./slices/usersSlice";
import socketSlice from "./slices/socketSlice";

const rootReducer = combineReducers({
  auth: authSlice,
  meet: meetSlice,
  users: usersSlice,
  socket: socketSlice,
});
export default rootReducer;
