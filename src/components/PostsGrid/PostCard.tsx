import moment from 'moment';
import {memo} from 'react';
import { PostType } from '../../../types/postTypes';
import { USER_AVATAR_URLS } from '../../../util/constants';
import { GET_RANDOM_ITEM } from '../../../util/functions';

interface Props {
    post: PostType;
}

const PostCard:React.FC<Props> = ({
    post,
}) => {

    return (
        <div className="rounded-lg shadow-lg border bg-gray-100 border-gray-500 md:w-40 lg:w-60 w-60 h-48 m-auto my-4 relative flex flex-col">
            
            {/* AVATAR */}
            <img 
                src={GET_RANDOM_ITEM(USER_AVATAR_URLS)}
                className="absolute rounded-lg top-2 right-2 border shadow-lg p-2"   
                width="50px"
                height="50px"
            />

            <div className="flex flex-col flex-1 w-full px-4 py-2 overflow-clip">
                {/* USERNAME */}
                <span className="font-bold text-xl">
                    {post.username}
                </span>

                {/* CREATED AT */}
                <span className="text-gray-400 text-sm">
                    {moment(post.createdAt).fromNow()}
                </span>

                {/* BODY */}
                <span className='my-2 max-h-[30%] text-ellipsis max-w-full whitespace-normal'>
                    {post.body}
                </span>
            </div>

            {/* FOOTER (BTNS) */}
            <div className="border-t-[1px] border-t-gray-400 w-full py-2">
                


            </div>

        </div>
    )
};

export default memo(PostCard);