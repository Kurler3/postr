import moment from 'moment';
import {memo} from 'react';
import { PostComment } from '../../../types/postTypes';

interface Props {
    comment: PostComment;
}
const CommentCard:React.FC<Props> = ({
    comment,
}) => {

    return (
        <div
            className="w-full border shadow-lg flex flex-col p-2 mt-5 rounded-lg"
        >
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
    );
};

export default memo(CommentCard);