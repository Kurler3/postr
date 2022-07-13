import moment from 'moment';
import {memo, SyntheticEvent, useCallback, useState, useMemo} from 'react';
import { PostType } from '../../../types/postTypes';
import { USER_AVATAR_URLS } from '../../../util/constants';
import { GET_RANDOM_ITEM } from '../../../util/functions';
import Link from 'next/link';
import Button from '../Customs/Button';
import { useSelector } from '../../../store/store';
import { getUserState } from '../../../store/reducers/usersReducer';
import { useMutation } from '@apollo/client';
import { DELETE_POST, LIKE_POST } from '../../../graphql/mutations';
import {useDispatch} from '../../../store/store';
import DeletePostModal from '../Modal/DeletePostModal';
import {deletePost as deletePostAction, likeUnlikePost as likeAction} from '../../../store/reducers/postsReducer';



interface Props {
    post: PostType;
}

const PostCard:React.FC<Props> = ({
    post,
}) => {

    // STATE
    const [showModal, setShowModal] = useState(false);

    // DISPATCH
    const dispatch = useDispatch();

    // GET USER FROM REDUCER STORE
    const user = useSelector(getUserState);

    // DELETE MUTATION
    const [deletePost, {}] = useMutation(DELETE_POST, {
        update(proxy, result) {
            
            dispatch(deletePostAction(result.data.deletePost.id));

            setShowModal(() => false);
            
        },
        onError(err) {
            console.log("Something wrong happened :(");
        },
        variables: {
            postId: post.id
        }
    });

    // LIKE/UNLIKE POST MUTATION
    const [likeUnlikePost, {loading}] = useMutation(LIKE_POST, {
        update(proxy, result) {
            
            // DISPATCH DELETE POST ACTION 
            console.log("Result: ", result);
            
            dispatch(likeAction(result.data.likePost));
        },
        onError(err) {
            console.log("Something wrong happened :(");
        },
        variables: {
            postId: post.id
        }
    });


    /////////////////////////////////////
    /// MEMO ////////////////////////////
    /////////////////////////////////////

    // TRUE IF LIKES BY CURRENT USER, FALSE IF NOT
    const isPostLiked = useMemo(() => {
        return user.id ? post.likes.findIndex((like) => like.username === user.username) !== -1 : false;
    }, [post.likes.length]);
    
    /////////////////////////////////////
    /// FUNCTIONS ///////////////////////
    /////////////////////////////////////

    // HANDLES CLICK LIKE
    const handleLikeBtnClick = useCallback(async (e:SyntheticEvent) => {
        await likeUnlikePost();
    }, []);

    // HANDLE COMMENT CLICK
    const handleCommentBtnClick = useCallback((e:SyntheticEvent) => {
        
    
    } ,[]);


    // HANDLE DELETE CLICK
    const handleDeleteBtnClicked = useCallback((e: SyntheticEvent) => {

        // SET DISPLAY MODAL TO TRUE :)  (DISPATCH SET MODAL ACTION)
        setShowModal(() => true);

    }, []);

    // CONFIRM DELETE FUNC
    const confirmDelete = useCallback(async () => {
        // CALL DELETE POST FUNC
        await deletePost();
    }, []);
    
    // ON CANCEL CLICK
    const onCancelClick = useCallback(() => {
        setShowModal(() => false);
    }, []);

    console.log("PostLikes",  post.likes, post.likesCount, isPostLiked);
    

    return (
        <div className="rounded-lg shadow-lg border bg-gray-100 border-gray-500 md:w-40 lg:w-60 w-60 h-48 m-auto my-4 relative flex flex-col opacityInAnimation">
            
            {/* AVATAR */}
            <img 
                src={GET_RANDOM_ITEM(USER_AVATAR_URLS)}
                className="absolute rounded-lg top-2 right-2 border shadow-lg p-2"   
                width="50px"
                height="50px"
            />
            
            <div className="flex flex-col flex-1 w-full px-4 py-2">
                    {/* USERNAME */}
                    <span className="font-bold text-xl">
                        {post.username}
                    </span>

                    {/* CREATED AT */}
                    <Link href={{
                        pathname: `/posts/${post.id}`,
                        query: {post : JSON.stringify(post)},
                    }}>
                    
                        <span className="text-gray-400 text-sm hover:text-blue-400 cursor-pointer transition">
                            {moment(post.createdAt).fromNow(true)}
                        </span>
                    </Link>
                    {/* BODY */}
                    <Link href={{
                        pathname: `/posts/${post.id}`,
                        query: {post : JSON.stringify(post)},
                    }}>
                    
                        <span className='my-5 max-h-[30%] truncate max-w-full cursor-pointer'>
                            {post.body}
                        </span>

                    </Link>
                </div>
   
            {/* FOOTER (BTNS) */}
            <div className="flex p-3 justify-start align-center border-t-[1px] border-t-gray-400 w-full">
                
                {/* LIKE BTN */}
                <div className='flex justify-center align-center hover:shadow-lg hover:bg-gray-200 transition-all cursor-pointer'>

                    <Button 
                        onClick={user.id ? handleLikeBtnClick : () => {}}
                        icon="favorite"
                        btnCss={`p-1 transition px-3 border-[#66b5ff] border rounded-l-lg rounded-r-lg xl:rounded-r-none ${isPostLiked ? "bg-[#66b5ff]" : ""}`} 
                        iconCss={`text-[20px]  transition text-[#66b5ff] ${isPostLiked ? "text-red-400" : ""}`}
                    />

                    <span className='hidden xl:block h-full text-center p-1 px-2 pr-3 border-t border-r border-b border-t-[#66b5ff] border-r-[#66b5ff] border-b-[#66b5ff] rounded-r-lg' >
                        {post.likesCount}
                    </span>
                </div>
               

                {/* COMMENT BTN */}
                <div className='flex justify-center align-center hover:shadow-lg hover:bg-gray-200 transition-all cursor-pointer ml-2'>

                    <Button 
                        onClick={handleCommentBtnClick}
                        icon="forum"
                        btnCss="p-1 px-3 border-[#3492eb] border rounded-l-lg rounded-r-lg xl:rounded-r-none"  
                        iconCss="text-[20px] text-[#3492eb]"
                    />

                    <span className='hidden xl:block h-full text-center p-1 px-2 pr-3 border-t border-r border-b border-t-[#66b5ff] border-r-[#66b5ff] border-b-[#66b5ff] rounded-r-lg' >
                        {post.commentsCount}
                    </span>
                </div>


                {/* DELETE (IF OWNER) */}
                {
                    user.id && post.username === user.username ?

                    <Button 
                        onClick={handleDeleteBtnClicked}
                        icon="delete"
                        btnCss="py-1 px-2 bg-red-600 group border ml-2 transition rounded-lg hover:bg-white hover:border-red-600 hover:shadow-lg hover:scale-[1.1]"  
                        iconCss="text-[20px] text-white group-hover:text-red-600"
                    />
                :null}

            </div>
            


            {/* CONFIRM DELETE MODAL */}
            {
                showModal === true ?
                
                <DeletePostModal 
                    onCancelClick={onCancelClick}
                    onConfirmClick={confirmDelete}
                />

            :null}
        </div>
    )
};

export default memo(PostCard);