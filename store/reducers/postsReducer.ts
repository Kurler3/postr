import { createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";
import { PostType } from "../../types/postTypes";
// import _ from 'lodash';

// INITIAL STATE
const initialState:[] = [];

// CREATE SLICE
export const postsReducer = createSlice({
    // NAME
    name: 'posts',

    // INITIAL STATE
    initialState,

    // REDUCERS
    reducers: {
        // SET POSTS
        setPosts: (
            state: Draft<typeof initialState>,
            action: PayloadAction<typeof initialState>,
        ) => {
            // ARRAY OF POSTS.
            return action.payload;
        },

        // ADD POST
        addPosts: (
            state: Draft<typeof initialState>,
            action: PayloadAction<typeof initialState>,
        ) => {

            // let newState = _.cloneDeep(state);

            // return newState;
        }

        // DELETE POST
    }
})