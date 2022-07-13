import moment from 'moment';
import {memo} from 'react';
import { UserState } from '../../../store/reducers/usersReducer';
import { PostType } from '../../../types/postTypes';
import Button from '../Customs/Button';

interface Props {
    user: UserState;
    postData: PostType;
    handleLikeBtnClick: Function;
    statePost: PostType;
    handleDeleteBtnClicked: Function;
    isPostLiked: boolean;
}

const PostDetailedBox:React.FC<Props> = ({
    user,
    postData,
    handleLikeBtnClick,
    statePost,
    handleDeleteBtnClicked,
    isPostLiked,
}) => {

    return (
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
              <span className="truncate my-2 max-h-[25%] md:max-w-[300px] max-w-[150px] lg:max-w-[500px] xl:max-w-[800px] 2xl:max-w-[1000px]">
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
              <div className="flex justify-center items-center">
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
                    {statePost.likesCount}
                  </span>
                </div>

                {/* COMMENTS */}
                <div className="flex justify-center align-center transition-all  ml-2">
                  <Button
                    onClick={() => {}}
                    icon="forum"
                    btnCss="p-1 px-3 border-[#3492eb] border rounded-l-lg rounded-r-lg xl:rounded-r-none cursor-default"
                    iconCss="text-[20px] text-[#3492eb]"
                  />

                  <span className="hidden xl:block h-full text-center p-1 px-2 pr-3 border-t border-r border-b border-t-[#66b5ff] border-r-[#66b5ff] border-b-[#66b5ff] rounded-r-lg">
                    {statePost.commentsCount}
                  </span>
                </div>
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
    );
};

export default memo(PostDetailedBox);
