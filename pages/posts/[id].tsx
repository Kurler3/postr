import { memo, SyntheticEvent, useCallback, useMemo, useState } from "react";

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
import { DELETE_POST, LIKE_POST } from "../../graphql/mutations";
import { useDispatch } from "../../store/store";
import { likeUnlikePost as likeAction, deletePost as deletePostAction } from "../../store/reducers/postsReducer";
import DeletePostModal from "../../src/components/Modal/DeletePostModal";

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
    }
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
        }
    });
  }, []);

  // HANDLE CONFIRM DELETE CLICK
  const handleConfirmDeleteClick = useCallback( async(e:SyntheticEvent) => {
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
        }
    });
  }, []);



  /////////////////////////////////////////////////
  /// COMPONENT RENDER ////////////////////////////
  /////////////////////////////////////////////////

  return (
    <div className="flex flex-col w-full">

      <div className="flex flex-row justify-start w-[70%] m-auto mt-10 relative">
        {/* RANDOM AVATAR PIC */}
        <img
          src={GET_RANDOM_ITEM(USER_AVATAR_URLS)}
          width="80px"
          height="70px"
          className="rounded-lg border mr-3 absolute left-[-90px]"
        />

        {/* CONTENT CONTAINER */}
        <div className="h-full flex-1 flex-col flex">

            {/* POST CONTENT BOX */}
            <div className="border flex-col shadow-lg rounded-md p-3"> 

                {/* USERNAME + DATE + BODY */}
                <div className="flex flex-col flex-1">
                    {/* USERNAME */}
                    <span className="font-bold text-xl">{postData.username}</span>

                    {/* DATE  */}
                    <span className="text-gray-400 text-sm transition">
                    {moment(postData.createdAt).fromNow(true)}
                    </span>

                    {/* CONTENT */}
                    <span className='truncate my-2 max-h-[25%] md:max-w-[300px] max-w-[150px] lg:max-w-[500px] xl:max-w-[800px] 2xl:max-w-[1000px]'>
                    {postData.body}
                    </span>
                </div>

                {/* LIKE BTN + COMMENTS BTN + DELETE BTN */}
                <div
                    className={`flex flex-row items-center ${
                    user.username === postData.username
                        ? "justify-between"
                        : "justify-start"
                    }`}
                >
                    {/* LIKE BTN */}
                    <div className="flex justify-center align-center hover:shadow-lg hover:bg-gray-200 transition-all cursor-pointer">
                    <Button
                        onClick={user.id ? handleLikeBtnClick : () => {}}
                        icon="favorite"
                        btnCss={`p-1 transition px-3 border-[#66b5ff] border rounded-l-lg rounded-r-lg xl:rounded-r-none ${
                        isPostLiked ? "bg-[#66b5ff]" : ""
                        }`}
                        iconCss={`text-[20px]  transition text-[#66b5ff] ${
                        isPostLiked ? "text-red-400" : ""
                        }`}
                    />

                    <span className="hidden xl:block h-full text-center p-1 px-2 pr-3 border-t border-r border-b border-t-[#66b5ff] border-r-[#66b5ff] border-b-[#66b5ff] rounded-r-lg">
                        {state.post.likesCount}
                    </span>
                    </div>

                    {/* DELETE BTN */}
                    {user.id && user.username === postData.username ? (
                    <Button
                        onClick={handleDeleteBtnClicked}
                        icon="delete"
                        btnCss="py-1 px-2 bg-red-600 group border ml-2 transition rounded-lg hover:bg-white hover:border-red-600 hover:shadow-lg hover:scale-[1.1]"
                        iconCss="text-[20px] text-white group-hover:text-red-600"
                    />
                    ) : null}
                </div>
            
            </div>

            
            {/* COMMENTS */}
            <div className="w-full h-[100px] mt-5 flex flex-col">
                        
                {/* INPUT (IF LOGGED IN) */}
                {
                    user.id ?

                    <div className="flex flex-row justify-start">

                        {/* INPUT */}   
                        <input 
                            placeholder="Add a comment..."
                            // onChange={}
                            className="flex-1" 
                        />

                        {/* CONFIRM  */}
                    </div>  

                :null}

                {/* LIST OF COMMENTS */}
                {
                    state.post.comments.map((comment) => {

                        return (
                            <div
                                key={`post_comment_${state.post.id}_${comment.id}`}
                                className="w-full border shadow-lg flex flex-col p-2"
                            >

                                {comment.body}

                            </div>
                        )
                    })
                }


            </div>            
        </div>
      </div>



      {/* DELETE MODAL */}
      {
        state.isShowDeleteModal === true ?

        <DeletePostModal 
            onCancelClick={handleCancelDeleteClick}
            onConfirmClick={handleConfirmDeleteClick}
        />
      :null}
    </div>
  );
};

export default memo(PostPage);
