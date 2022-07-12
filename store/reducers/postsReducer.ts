import { createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";
import { PostType } from "../../types/postTypes";
// import _ from 'lodash';

// INITIAL STATE
const initialState:PostType[] = [];

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
        addPost: (
            state: Draft<typeof initialState>,
            action: PayloadAction<PostType>,
        ) => {

            let newState = state ?? [];

            // ADD TO TOP
            return [
                action.payload,
                ...newState,
            ];
        },
        // DELETE POST
        deletePost: (
            state: Draft<typeof initialState>,
            action: PayloadAction<string|number>,
        ) => {

            // FILTER POST WITH GIVEN ID
            return (state! as PostType[]).filter((post: PostType) => post.id !== action.payload);
        }
    }
});

// HELPER FOR USE SELECTOR.
export const getPostsState = (state: {posts: PostType[]}) => state.posts;

// EXPORT ALL ACTIONS
export const {setPosts, addPost, deletePost} = postsReducer.actions;

// EXPORT REDUCER
export default postsReducer.reducer;