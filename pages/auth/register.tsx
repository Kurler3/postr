// REACT
import React, { memo, useCallback, useState } from 'react';

// APOLLO HOOKS
import {useMutation} from '@apollo/client';
// MUTATION
import { REGISTER_USER } from '../../graphql/mutations';

// CUSTOM COMPONENTS
import Button from '../../src/components/Customs/Button';

// LOADER
import { Circles } from 'react-loader-spinner';
import { RegisterState } from '../../types/authTypes';
import Router from 'next/router';

// CUSTOM HOOK
import { useForm } from '../../util/hooks';

// GET CUSTOM DISPATCH HOOK
import { useDispatch } from '../../store/store';

// GET LOGIN FUNCTION 
import {login as loginAction} from '../../store/reducers/usersReducer';

const initialState = {
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
}

const RegisterPage = () => {

  // INIT DISPATCH
  const dispatch = useDispatch();

  //////////////////////////
  // STATE //////////////
  //////////////////////////

  const [errors, setErrors] = useState<RegisterState>({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  
  // const [state, setState] = useState<RegisterState>({
  //   username: '',
  //   email: '',
  //   password: '',
  //   confirmPassword: '',
  // });

  const {onChange, onSubmit, values} = useForm(registerUser, initialState);

  //////////////////////////
  // MUTATION //////////////
  //////////////////////////

  // ADD USER FUNCTION AND LOADING 
  // UPDATE WILL BE TRIGGERED IF THE USER IS SUCCESSFULLY REGISTERED (SET LOCAL STORAGE TOKEN HERE)
  const [addUser, {loading}] = useMutation(REGISTER_USER, {
    update(proxy, result) {
      Router.push('/');
      

      // SET USER DATA IN REDUX STORE
      dispatch(loginAction(result.data.register));
    },
    onError(err) {

      
      // IN THE BACK-END WE SEND ONE ERROR AND INSIDE ALL ERRORS IN AN ARRAY
      setErrors((prevErrors) => {
        return {
          ...prevErrors,
          ...err.graphQLErrors[0].extensions.errors as RegisterState,
        };
      });
    },
    // VARIABLES FOR THE MUTATION
    variables: {
      ...values,
    }
  });


  // WORK AROUND FOR addUser function 
  function registerUser () {
    addUser();
  }



  //////////////////////////
  // FUNCTIONS //////////////
  //////////////////////////

  // // HANDLE INPUT CHANGE
  // const handleInputChange = useCallback((e:React.ChangeEvent<HTMLInputElement>) => {

  //   let key = e.target.name;
  //   let value = e.target.value;

  //   // IF STATE KEY DIFFERENT THAN THE NEW INPUT, THEN CHANGE
  //   if(state[key as keyof typeof RegisterPage] !== value) {
  //     setState((prevState) => {
  //       return {
  //         ...prevState,
  //         [key]: value,
  //       }
  //     });

  //     setErrors((prevState) => {
  //       return {
  //         ...prevState,
  //         [key]: "",
  //       }
  //     });
  //   }

  // }, []);

  // // HANDLE SUBMIT
  // const handleSubmit = useCallback(async () => {
  //   // CALL ADD USER MUTATION FUNCTION
  //   await addUser();

  //   // IF REGISTERED SUCCESSFULLY, THEN REDIRECT TO HOME PAGE "/"
  //   Router.push('/');
  // }, []);


  return (  
    <div className='m-auto w-[40%] flex flex-col justify-start align-middle mt-8 relative transition'
    >

      {/* IF LOADING */}
      {
        loading &&
        <div className="top-0 left-0 fixed backdrop-blur-[2px] flex justify-center items-center w-[100vw] h-full">
            
              {/* SPINNER */}
              <Circles
                color="#00BFFF"
                height={200}
                width={200}
              />
            
        </div>
        
      }

      {/* REGISTER TITLE */}
      <span 
        className="w-full text-center font-semibold text-2xl text-gray-600"
      >
        Register
      </span>

      {/* REGISTER TABLE */}

      <div className="w-full border rounded-lg shadow-lg border-gray-300 mt-5 flex flex-col p-7">

        {/* LABEL FOR USERNAME */}
        <span className="text-[#66b5ff] ">Username</span>
        {/* USERNAME */}
        <input  type="text" placeholder="Enter username..." maxLength={50}
          className={`border-b-2 py-3 px-2  focus:outline-none ${errors.username.length > 0 ? "border-b-red-400" : ""}`} name="username" onChange={onChange}
        />

        {/* IF ERROR MAKE BORDER RED */}
        {
          errors.username.length > 0 ?
            <span className="text-red-400 mt-3 text-sm">
              {errors.username}
            </span>
        :null}


         {/* LABEL FOR EMAIL */}
        <span className="text-[#66b5ff] mt-3">Email</span>
        {/* EMAIL */}
        <input type="email" placeholder="Enter email..." maxLength={50}
          className={`border-b-2 py-3 px-2  focus:outline-none ${errors.email.length > 0 ? "border-b-red-400" : ""}`} name="email" onChange={onChange}
        />

        {/* IF ERROR SHOW EMAIL ERROR */}
        {
          errors.email.length > 0 ?
            <span className="text-red-400 mt-3 text-sm">
              {errors.email}
            </span> 
        :null}
        

        {/* LABEL FOR PASSWORD */}
        <span className="text-[#66b5ff] mt-3">Password</span>
        {/* EMAIL */}
        <input type="password" placeholder="Enter password..." maxLength={50}
          className={`border-b-2 py-3 px-2  focus:outline-none ${errors.password.length > 0 ? "border-b-red-400" : ""}`} name="password" onChange={onChange}
        />

        {/* IF ERROR SHOW PASSWORD ERROR */}
        {
          errors.password.length > 0 ?
          <span className='text-red-400 mt-3 text-sm'>
            {errors.password}
          </span>
        :null}
        
        {/* LABEL FOR CONFIRM PASSWORD */}
        <span className="text-[#66b5ff] mt-3">Confirm Password</span>
        {/* EMAIL */}
        <input type="password" placeholder="Confirm password..." maxLength={50}
          className={`border-b-2 py-3 px-2  focus:outline-none ${errors.confirmPassword && errors.confirmPassword.length > 0 ? "border-b-red-400" : ""}`} name="confirmPassword" onChange={onChange}
        />

        {/* IF ERROR SHOW CONFIRM PASSWORD ERROR */}
        {
          errors.confirmPassword && errors.confirmPassword.length > 0 ? 
          <span className='text-red-400 mt-3 text-sm'>
            {errors.confirmPassword}
          </span>
        :null}

        {/* REGISTER BTN! */}
        <Button
          onClick={onSubmit}
          txt="Register"
          btnCss='border transition text-white hover:scale-105 hover:shadow-lg w-[20%] bg-[color:var(--main-blue)] m-auto min-w-[80px] mt-5 p-3 rounded-lg hover:bg-white hover:border-[color:var(--main-blue)] hover:text-[color:var(--main-blue)]'
        />
        

      </div>
    </div>

    
  )
}

export default memo(RegisterPage);