import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { basketSlice } from "./basket/basketReducer";
import { mealsSlice } from "./meals/MealsReducer";
import { uiSlice } from "./UI/UISlice";

const rootReducer = combineReducers({
  [mealsSlice.name]: mealsSlice.reducer,
  [basketSlice.name]: basketSlice.reducer,
  [uiSlice.name]: uiSlice.reducer,
});
export const store = createStore(rootReducer, applyMiddleware(thunk));
