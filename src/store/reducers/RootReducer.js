import { combineReducers } from "redux";
import userReducer from "./UserReducer";

const rootReducer = combineReducers({
  // Define a top-level state field named `todos`, handled by `todosReducer`
  // identifier : Reducer,
  user: userReducer,
});

export default rootReducer;
