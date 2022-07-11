import React, {memo} from 'react';
import { PostType } from '../../../types/postTypes';
import PostCard from './PostCard';

interface Props {
    posts: PostType[];
}


const PostsGrid:React.FC<Props> = ({
    posts
}) => {

    return posts.length > 0 ? (
        <div className='flex flex-col m-auto p-5 h-full w-[80%] md:grid-cols-2 md:grid lg:grid-cols-3 xl:grid-cols-4 my-5'>
            {
                posts.map((post) => {
                    return (
                        <PostCard 
                            post={post}
                            key={`posts_grid_item_${post.username}_${post.id}`}
                        />
                    )
                })
            }
        </div>  
    )
    :
    <h1>
        No posts :/
    </h1>;
}

export default memo(PostsGrid);