import Router from 'next/router';
import {SyntheticEvent, useCallback, useState} from 'react';

export const useForm = (callback:Function, initialState = {}) => {

    const [values, setValues] = useState(initialState);

    // ON CHANGE FUNCTION
    const onChange = useCallback((e:React.ChangeEvent<HTMLInputElement>) => {
        setValues((prevValues) => ({...prevValues, [e.target.name]:e.target.value}));
    }, []);

    // ON SUBMIT
    const onSubmit = useCallback(async (e:SyntheticEvent) => {
        e.preventDefault();

        // CALLBACK (addUser, loginUser)
        await callback();

        // PUSH TO '/' IF SUCCESS
        Router.push('/');
    } ,[]);

    return {
        onChange,
        onSubmit,
        values,
    }
} 