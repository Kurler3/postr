import React, {
  memo,
  SyntheticEvent,
  useCallback,
  useMemo,
  useState,
} from "react";

// ROUTER
import { useRouter } from "next/router";
import { PostType } from "../../types/postTypes";
import { GET_RANDOM_ITEM } from "../../util/functions";
import { USER_AVATAR_URLS } from "../../util/constants";
import moment from "moment";
import { useSelector } from "../../store/store";
import { getUserState } from "../../store/reducers/usersReducer";
import Button from "../../src/components/Customs/Button";
import { useMutation } from "@apollo/client";
import {
  CREATE_COMMENT,
  DELETE_POST,
  LIKE_POST,
} from "../../graphql/mutations";
import { useDispatch } from "../../store/store";
import {
  likeUnlikePost as likeAction,
  deletePost as deletePostAction,
} from "../../store/reducers/postsReducer";
import DeletePostModal from "../../src/components/Modal/DeletePostModal";
import { useForm } from "../../util/hooks";

// UPDATE POST ACTION FROM POSTS REDUCER
import { updatePost as updatedPostAction } from "../../store/reducers/postsReducer";
import CommentCard from "../../src/components/Comment/CommentCard";
import PostDetailedBox from "../../src/components/PostPage/PostDetailedBox";
import PostCommentsContainer from "../../src/components/PostPage/PostCommentsContainer";

// INITIAL STATE FOR THE COMMENT INPUT
const initialState = {
  body: "",
};

//////////////////////////////////////
// SINGLE PAGE PAGE //////////////////
//////////////////////////////////////

const PostPage = () => {
  /////////////////////////////////////
  /// INIT ////////////////////////////
  /////////////////////////////////////

  // GET USER
  const user = useSelector(getUserState);

  // ROUTER
  const router = useRouter();

  // DISPATCH
  const dispatch = useDispatch();

  /////////////////////////////////////
  /// MEMO ////////////////////////////
  /////////////////////////////////////

  // POST DATA FROM ROUTER QUERY :)
  const postData: PostType = useMemo(() => {
    return JSON.parse(router.query.post as string) as PostType;
  }, []);

  ///////////////////////////////////////
  /// STATE ////////////////////////////
  //////////////////////////////////////

  // FOR COMMENT INPUT
  const { onChange, onSubmit, values } = useForm(
    createCommentCallback,
    initialState
  );

  const [state, setState] = useState({
    post: postData,
    isShowDeleteModal: false,
  });

  // RETURNS TRUE IF THE POST IS LIKED BY THE USER LOGGED IN (IF ANY)
  const isPostLiked = useMemo(() => {
    return user.id
      ? state.post.likes.findIndex(
          (like) => like.username === user.username
        ) !== -1
      : false;
  }, [state.post.likes.length]);

  // USER PIC URL
  const userPicUrl = useMemo(() => GET_RANDOM_ITEM(USER_AVATAR_URLS), []);

  //////////////////////////////////////////
  /// MUTATIONS ////////////////////////////
  //////////////////////////////////////////

  // LIKE/UNLIKE MUTATION
  const [likeUnlikePost, { loading }] = useMutation(LIKE_POST, {
    update(proxy, result) {
      // DISPATCH ACTION
      dispatch(likeAction(result.data.likePost));

      // SET NEW POST STATE
      setState((prevState) => {
        return {
          ...prevState,
          post: result.data.likePost,
        };
      });
    },
    onError(err) {
      console.log(`Error while liking/disliking: ${err}`);
    },
    variables: {
      postId: postData.id,
    },
  });

  // DELETE MUTATION
  const [deletePost, {}] = useMutation(DELETE_POST, {
    update(proxy, result) {
      // DISPATCH DELETE POST ACTION
      dispatch(deletePostAction(result.data.deletePost.id));

      // FORCE USER TO BACK TO '/'
      router.push("/");
    },
    onError(err) {
      console.log(`Error while deleting post: ${err}`);
    },
    variables: {
      postId: postData.id,
    },
  });

  // CREATE COMMENT MUTATION
  const [createComment, {}] = useMutation(CREATE_COMMENT, {
    update(proxy, result) {
      dispatch(updatedPostAction(result.data.createComment));

      setState((prevState) => {
        return {
          ...prevState,
          post: result.data.createComment,
        };
      });
    },
    onError(err) {
      console.log(`Error while creating comment ${err}`);
    },
    variables: {
      ...values,
      postId: postData.id,
    },
  });

  //////////////////////////////////////////
  /// FUNCTIONS ////////////////////////////
  //////////////////////////////////////////

  // HANDLES CLICK IN LIKE BTN FOR THE POST
  const handleLikeBtnClick = useCallback(async () => {
    likeUnlikePost();
  }, []);

  // HANDLES CLICK IN THE DELETE BTN
  const handleDeleteBtnClicked = useCallback(() => {
    // SET THE MODAL
    setState((prevState) => {
      return {
        ...prevState,
        isShowDeleteModal: true,
      };
    });
  }, []);

  // HANDLE CONFIRM DELETE CLICK
  const handleConfirmDeleteClick = useCallback(async (e: SyntheticEvent) => {
    // CALL DELETE MUTATION FUNCTION
    deletePost();
  }, []);

  // HANDLE CANCEL DELETE CLICK
  const handleCancelDeleteClick = useCallback(() => {
    // HIDE THE DELETE MODAL
    setState((prevState) => {
      return {
        ...prevState,
        isShowDeleteModal: false,
      };
    });
  }, []);

  // CREATE COMMENT CALLBACK
  async function createCommentCallback() {
    await createComment();
  }

  /////////////////////////////////////////////////
  /// COMPONENT RENDER ////////////////////////////
  /////////////////////////////////////////////////

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-row justify-start w-[70%] m-auto mt-10 relative">
        {/* RANDOM AVATAR PIC */}
        <img
          src={userPicUrl}
          width="80px"
          height="70px"
          className="rounded-lg border mr-3 absolute left-[-90px]"
        />

        {/* CONTENT CONTAINER */}
        <div className="h-full flex-1 flex-col flex">
          {/* POST CONTENT BOX */}
          <PostDetailedBox 
            user={user}
            postData={postData}
            handleLikeBtnClick={handleLikeBtnClick}
            statePost={state.post}
            handleDeleteBtnClicked={handleDeleteBtnClicked}
            isPostLiked={isPostLiked}
          />

          {/* COMMENTS */}
          <PostCommentsContainer 
            user={user}
            onChange={onChange}
            values={values}
            initialState={initialState}
            onSubmit={onSubmit}
            statePost={state.post}
          />
          
        </div>
      </div>

      {/* DELETE MODAL */}
      {state.isShowDeleteModal === true ? (
        <DeletePostModal
          onCancelClick={handleCancelDeleteClick}
          onConfirmClick={handleConfirmDeleteClick}
        />
      ) : null}
    </div>
  );
};

export default memo(PostPage);
