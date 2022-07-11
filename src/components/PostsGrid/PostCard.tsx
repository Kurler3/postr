import moment from 'moment';
import {memo, SyntheticEvent, useCallback} from 'react';
import { PostType } from '../../../types/postTypes';
import { USER_AVATAR_URLS } from '../../../util/constants';
import { GET_RANDOM_ITEM } from '../../../util/functions';
import Link from 'next/link';
import Button from '../Customs/Button';
import { useSelector } from '../../../store/store';
import { getUserState } from '../../../store/reducers/usersReducer';
import { useMutation } from '@apollo/client';
import { DELETE_POST } from '../../../graphql/mutations';
import {useDispatch} from '../../../store/store';


interface Props {
    post: PostType;
}

const PostCard:React.FC<Props> = ({
    post,
}) => {

    // DISPATCH
    const dispatch = useDispatch();

    // GET USER FROM REDUCER STORE
    const user = useSelector(getUserState);

    // DELETE MUTATION
    const [deletePost, {loading}] = useMutation(DELETE_POST, {
        update(proxy, result) {
            
            // DISPATCH DELETE POST ACTION 
            
        },
        onError(err) {
            console.log("Something wrong happened :(");
        }
    });

    /////////////////////////////////////
    /// FUNCTIONS ///////////////////////
    /////////////////////////////////////

    // HANDLES CLICK LIKE
    const handleLikeBtnClick = useCallback((e:SyntheticEvent) => {
        
    }, []);

    // HANDLE COMMENT CLICK
    const handleCommentBtnClick = useCallback((e:SyntheticEvent) => {
        
       
        
    } ,[]);


    // HANDLE DELETE CLICK
    const handleDeleteBtnClicked = useCallback((e: SyntheticEvent) => {

        // SET DISPLAY MODAL TO TRUE :)

        // CALL BACK-END MUTATION   

        // DISPATCH ACTION!

    }, []);

    // CONFIRM DELETE FUNC
    const confirmDelete = useCallback(async () => {
        // CALL DELETE POST FUNC
        deletePost();
    }, []);

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
                    <Link href={`/posts/${post.id}`}>
                    
                        <span className="text-gray-400 text-sm hover:text-blue-400 cursor-pointer transition">
                            {moment(post.createdAt).fromNow(true)}
                        </span>
                    </Link>
                    {/* BODY */}
                    <Link href={`/posts/${post.id}`}>
                    
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
                        onClick={handleLikeBtnClick}
                        icon="favorite"
                        btnCss="p-1 px-3 border-[#66b5ff] border rounded-l-lg rounded-r-lg xl:rounded-r-none" 
                        iconCss="text-[20px] text-[#66b5ff]"
                    />

                    <span className='hidden xl:block h-full text-center p-1 px-2 pr-3 border-t border-r border-b border-t-[#66b5ff] border-r-[#66b5ff] border-b-[#66b5ff] rounded-r-lg' >
                        {post.likesCount}
                    </span>
                </div>
               

                {/* COMMENT BTN */}
                <div className='flex justify-center align-center hover:shadow-lg hover:bg-gray-200 transition-all cursor-pointer ml-2'>

                    <Button 
                        onClick={handleLikeBtnClick}
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

        </div>
    )
};

export default memo(PostCard);