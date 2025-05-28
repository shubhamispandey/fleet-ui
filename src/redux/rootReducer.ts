import { combineReducers } from "redux";
import authSlice from "./slices/authSlice";
import meetSlice from "./slices/meetSlice";
import usersSlice from "./slices/usersSlice";

const rootReducer = combineReducers({
  auth: authSlice,
  meet: meetSlice,
  users: usersSlice,
});
export default rootReducer;
