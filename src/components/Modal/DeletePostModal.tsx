import {memo, SyntheticEvent} from 'react';
import Button from '../Customs/Button';

interface Props {
    onConfirmClick: Function;
    onCancelClick: Function;
}

const DeletePostModal: React.FC<Props> = ({
    onConfirmClick,
    onCancelClick,
}) => {


    return (
        <div className="w-[100vw] h-[100vh] fixed top-0 left-0 z-[10000] bg-[rgba(0,0,0,0.3)] flex justify-center items-center min-w-[300px]"
            onClick={(e:SyntheticEvent) => onCancelClick()}
        >
            
            {/* INNER CONTAINER */}
            <div className='w-[30%] h-[300px] bg-white rounded-md shadow-lg flex flex-col justify-start slideFromBottomAnimation' onClick={(e) => e.stopPropagation()}>
                
                {/* HEADER */}
                <div className='border-b border-b-[#949494] p-2 rounded-t-md flex justify-between items-center'>
                    {/* TITLE */}
                    <span className='text-lg font-medium ml-2'>Confirm Delete</span>
                    {/* CLOSE BTN */}
                    <div className='transition hover:bg-red-600 material-icons cursor-pointer hover:text-white rounded-[3px] hover:shadow-lg hover:scale-[1.1]'
                        onClick={(e:SyntheticEvent) => {
                            e.stopPropagation();
                            onCancelClick();
                        }}
                    >
                        close
                    </div>
                </div>

                {/* MESSAGE */}
                <div className='flex-1 w-full flex justify-center items-center' >
                    <span className='text-lg font-bold'>
                        Are you sure you want to delete this post?
                    </span>
                </div>
                

                {/* BTNS */}
                <div className='flex justify-end items-center border-t-[#949494] border-t'>

                    {/* CONFIRM DELETE BTN */}
                    <Button 
                        onClick={(e:SyntheticEvent) => {
                            e.stopPropagation();
                            onConfirmClick();
                        }}
                        txt="Confirm"
                        btnCss="bg-[#4dff6a] transition font-semibold text-white py-2 px-5 m-3 rounded-lg hover:bg-[#19fa3e] shadow-lg hover:scale-[1.1]"
                    />


                    {/* CANCEL BTN */}
                    <Button 
                        onClick={(e:SyntheticEvent) => {
                            e.stopPropagation();
                            onCancelClick();
                        }}
                        txt="Cancel"
                        btnCss='bg-gray-300 m-3 py-2 transition px-5 rounded-lg shadow-lg hover:scale-[1.1]'
                    />

                </div>

            </div>

        </div>
    );
}


export default memo(DeletePostModal);