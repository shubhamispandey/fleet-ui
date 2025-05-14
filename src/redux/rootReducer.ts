import { combineReducers } from "redux";
import authSlice from "./slices/authSlice";
import meetSlice from "./slices/meetSlice";

const rootReducer = combineReducers({
  auth: authSlice,
  meet: meetSlice,
});
export default rootReducer;
