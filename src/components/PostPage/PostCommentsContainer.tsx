import {memo} from 'react';
import { UserState } from '../../../store/reducers/usersReducer';
import { PostType } from '../../../types/postTypes';
import CommentCard from '../Comment/CommentCard';
import Button from '../Customs/Button';

// PROPS
interface Props {
    user: UserState;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    values: {};
    initialState: {
        body: string;
    };
    onSubmit: Function;
    statePost: PostType;
}

const PostCommentsContainer:React.FC<Props> = ({
    user,
    onChange,
    values,
    initialState,
    onSubmit,
    statePost,
}) => {

    return (
        <div className="w-full h-[100px] mt-5 flex flex-col">
            {/* INPUT (IF LOGGED IN) */}
            {user.id ? (
              <div className="relative flex flex-row justify-start border p-3 rounded-lg shadow-lg transition">
                {/* INPUT */}
                <input
                  placeholder="Add a comment..."
                  onChange={onChange}
                  className="flex-1 outline-none"
                  name="body"
                />

                {/* CONFIRM  */}
                {(values as typeof initialState).body.length > 0 ? (
                  <Button
                    onClick={onSubmit}
                    icon="check"
                    btnCss="opacityInAnimation hover:shadow-lg hover:scale-[1.1] hover:bg-[#3492eb] hover:text-white transition rounded-md p-1"
                  />
                ) : null}
              </div>
            ) : null}

            {/* DIVIDER */}
            <div className="w-full h-[1px] bg-gray-300 mt-5">
              <span className="opacity-0">w</span>
            </div>

            {/* LIST OF COMMENTS */}
            {statePost.comments.map((comment) => {
              return (
                <CommentCard
                    comment={comment}
                    key={`post_comment_${statePost.id}_${comment.id}`}
                    postId={statePost.id}
                />
              );
            })}
          </div>
    );
}

export default memo(PostCommentsContainer);