import { useMutation } from '@apollo/client';
import { update } from 'lodash';
import moment from 'moment';
import {memo, useCallback} from 'react';
import { PostComment } from '../../../types/postTypes';
import { useDispatch } from "../../../store/store";
import { DISLIKE_COMMENT_MUTATION, LIKE_COMMENT_MUTATION } from '../../../graphql/mutations';

interface Props {
    comment: PostComment;
    postId: string | number;
}
const CommentCard:React.FC<Props> = ({
    comment,
    postId,
}) => {

    // INIT DISPATCH
    const dispatch = useDispatch();

    console.log('Comment: ', comment);

    // LIKE MUTATION
    const [onLikeComment, {loading}] = useMutation(LIKE_COMMENT_MUTATION,{
            update(proxy, result) {

            console.log("LikeComment: ", result);

        },
        onError(err) {
            console.log("Error while liking comment:", err);
        },
        variables: {
            postId,
            commentId: comment.id,
        },
    }); 

    // DISLIKE MUTATION
    const [onDislikeComment, _] = useMutation(DISLIKE_COMMENT_MUTATION, {
        update(proxy, result) {
            // LOG RESULT 
            console.log("DislikeComment: ", result);

        },
        onError(err) {
            console.log("Error while disliking comment: ", err);
        },
        variables: {
            postId,
            commentId: comment.id,
        },
    })
    
    // HANDLE VOTE CLICK
    const handleVoteClick = useCallback(async (isLiking:boolean) => {

        if(isLiking) await onLikeComment();
        else await onDislikeComment();

    }, []);

    return (
        <div
            className="w-full border shadow-lg flex flex-row p-2 mt-5 rounded-lg"
        >
            {/* LEFT CONTAINER */}
            <div className='flex flex-col flex-1'>
                 {/* USERNAME */}
                 <span className="font-bold text-xl">{comment.username}</span>

                    {/* DATE  */}
                    <span className="text-gray-400 text-sm transition">
                    {moment(comment.createdAt).fromNow(true)}
                    </span>

                    {/* CONTENT */}
                    <span className="truncate my-2 max-h-[25%] md:max-w-[300px] max-w-[150px] lg:max-w-[500px] xl:max-w-[800px] 2xl:max-w-[1000px]">
                    {comment.body}
                    </span>

                    {/* BTN CONTAINER */}
            </div>

            {/* RIGHT CONTAINER (VOTING)*/}
            <div className='flex flex-col justify-center items-center h-full'>

                {/* LIKE BTN */}
                <div  
                    onClick={(e) => handleVoteClick(true)}
                    className='material-icons transition hover:text-red-500 cursor-pointer'
                >
                    arrow_upward
                </div>

                {/* VOTES COUNT */}
                <span>{comment.voteCount}</span>

                <div 
                    onClick={(e) => handleVoteClick(false)}
                    className='material-icons transition hover:text-blue-400 cursor-pointer'>
                    arrow_downward
                </div>
            </div>

        </div>
    );
};

export default memo(CommentCard);