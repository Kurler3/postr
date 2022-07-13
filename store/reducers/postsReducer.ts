import { createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { PostType } from "../../types/postTypes";
import { displaySuccessToast } from "../../util/functions";
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

            // SHOW TOAST 
            displaySuccessToast("Post created successfully :)");

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

            // DISPLAY TOAST MESSAGE
            displaySuccessToast('Post deleted :))');

            // FILTER POST WITH GIVEN ID
            return (state! as PostType[]).filter((post: PostType) => post.id !== action.payload);
        },

        // LIKE/UNLIKE POST
        likeUnlikePost: (
            state: Draft<typeof initialState>,
            action: PayloadAction<PostType>,
        ) => {
            
            // COPY STATE
            let newState = state;

            // FIND INDEX
            let postIndex = newState.findIndex((post) => post.id === action.payload.id);

            // SUBSTITUTE NOW
            newState[postIndex] = action.payload;

            return newState;
        },

        // UPDATE POST
        updatePost: (
            state: Draft<typeof initialState>,
            action: PayloadAction<PostType>,
        ) => {

            // COPY STATE
            let newState = state;

            // FIND INDEX OF POST TO UPDATE
            let indexPost = newState.findIndex((post) => post.id === action.payload.id);

            newState[indexPost] = action.payload;

            return newState;

        }
    }
});

// HELPER FOR USE SELECTOR.
export const getPostsState = (state: {posts: PostType[]}) => state.posts;

// EXPORT ALL ACTIONS
export const {setPosts, addPost, deletePost, likeUnlikePost, updatePost} = postsReducer.actions;

// EXPORT REDUCER
export default postsReducer.reducer;