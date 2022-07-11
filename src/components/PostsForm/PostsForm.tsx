import { useMutation } from '@apollo/client';
import {memo} from 'react';
import { CREATE_POST } from '../../../graphql/mutations';
import { useForm } from '../../../util/hooks';
import Button from '../Customs/Button';


interface stateType {
    body: string;
}

// INITIAL STATE
const initialState = {
    body: '',
}


const PostsForm = ({

}) => {

    // CUSTOM USE FORM HOOK :)
    const {onChange, onSubmit, values} = useForm(createPostCallback, initialState);

    
    const [createPost, { error, loading }] = useMutation(CREATE_POST, {
        variables: values,
        update: (proxy, result) => {
            console.log(result);
        }
    })


    // CREATE POST CALLBACK
    async function createPostCallback() {
        await createPost();
    }

    
    return (
        <div className='fit-content flex flex-col justify-center p-5 items-center mt-5 w-[40%] min-w-[250px]'>
            
            {/* TITLE */}
            <h2 className='text-2xl font-medium mb-3'>Create Post</h2>

            <div className='flex flex-row justify-start items-center mt-3 w-full relative'>

                {/* INPUT */}
                <input placeholder='Enter text...' className='flex-1 border-[2px] border-[#3492eb] rounded-md py-2 px-2 mr-3 shadow-md transition-all outline-none focus:outline-none focus:border-[#66b5ff]' name="body" onChange={onChange}/>

                {/* BTN */}
                {
                    (values as stateType).body.length > 0 &&
                    
                    <Button 
                        onClick={onSubmit}
                        icon="check"
                        btnCss='opacityInAnimation absolute right-5 hover:bg-[#3492eb] hover:text-white transition rounded-sm p-1'
                    />
                }
                
            
            </div>
            
        </div>
    );
}

export default memo(PostsForm);