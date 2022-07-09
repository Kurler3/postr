// import { applyMiddleware } from "redux";
// import thunk from "redux-thunk";
// import { composeWithDevTools } from "redux-devtools-extension";
// import { createWrapper } from "next-redux-wrapper";

import {
    useDispatch as useDispatchBase,
    useSelector as useSelectorBase,
} from 'react-redux';

import {configureStore} from '@reduxjs/toolkit';

// GET USER REDUCER
import usersReducer from "./reducers/usersReducer";


// creating store
export const store = configureStore({
  reducer: {
    // WHERE ALL REDUCERS GO
    user: usersReducer,
  },
});

// INFER THE ROOT STATE AND APP DISPATCH TYPES FROM THE STORE
export type RootState = ReturnType<typeof store.getState>;

// INFERRED TYPE: {user: UserState}
type AppDispatch = typeof store.dispatch;

// UTILIZE useDispatch
export const useDispatch = () => useDispatchBase<AppDispatch>();

// UTILIZE useSelector

export const useSelector = <TSelected = unknown>(
    selector: (state: RootState) => TSelected
): TSelected => useSelectorBase<RootState, TSelected>(selector);
