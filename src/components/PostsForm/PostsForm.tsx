import { useMutation } from '@apollo/client';
import {memo} from 'react';
import { CREATE_POST } from '../../../graphql/mutations';
import { useForm } from '../../../util/hooks';


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
        <div>
            POSTS FORM
        </div>
    );
}

export default memo(PostsForm);