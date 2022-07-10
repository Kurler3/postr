import { createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";
import { USER_TOKEN } from "../../util/constants";


export interface UserState {
    id: string | null;
    username: string|null;
    email: string|null;
    createdAt: string|null;
    token: string|null;
}

// DEFAULT STATE OBJECT
const initialState:UserState = {
    id: null,
    username: null,
    email: null,
    createdAt: null,
    token: null,
};

// CREATE A SLICE AS A REDUCER CONTAINING ACTIONS

export const userReducer = createSlice({
    name:'user',
    initialState,
    reducers: {

        // LOGIN
        login: (
            state: Draft<typeof initialState>,
            action: PayloadAction<typeof initialState>
        ) => {
            
            // SET TOKEN
            localStorage.setItem(USER_TOKEN, action.payload.token!);
            
            return {...action.payload};
        },
        // LOG OUT
        logout: (
            state: Draft<typeof initialState>,
        ) => {
            return initialState;
        },
    },
});

// SMALL HELPER FOR useSelector FUNCTION IN FRONT-END
export const getUserState = (state: {user: UserState}) => state.user;

// EXPORT ALL ACTIONS
export const {login, logout} = userReducer.actions;

// EXPORT REDUCER
export default userReducer.reducer;


