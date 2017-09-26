import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import authReducer from "./authReducer";
import venuesReducer from "./venuesReducer";
import eventsReducer from "./eventsReducer";

export default combineReducers({
  auth: authReducer,
  form: formReducer,
  venues: venuesReducer,
  events: eventsReducer
});
