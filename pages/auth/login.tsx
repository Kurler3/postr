import React, {memo, useState, useCallback} from 'react'

// CUSTOM COMPONENTS
import Button from '../../src/components/Customs/Button';

// APOLLO HOOKS
import { useMutation } from '@apollo/client';

// TYPESCRIPT INTERFACE FOR STATE
import { LoginState, RegisterState } from '../../types/authTypes';

// MUTATIONS
import { REGISTER_USER } from '../../graphql/mutations';

// LOADER
import { Circles } from 'react-loader-spinner';

import Router from 'next/router';




const LoginPage = () => {
  //////////////////////////
  // STATE //////////////
  //////////////////////////

  const [errors, setErrors] = useState<LoginState>({
    username: '',
    email: '',
    password: '',
  });

  const [state, setState] = useState<LoginState>({
    username: '',
    email: '',
    password: '',
  });

  //////////////////////////
  // MUTATION //////////////
  //////////////////////////

  // ADD USER FUNCTION AND LOADING 
  // UPDATE WILL BE TRIGGERED IF THE USER IS SUCCESSFULLY REGISTERED (SET LOCAL STORAGE TOKEN HERE)
  const [loginUser, {loading}] = useMutation(REGISTER_USER, {
    update(proxy, result) {
      console.log("Result: ", result);

      

    },
    onError(err) {
      console.log(err.graphQLErrors[0].extensions.errors);
      
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
      ...state,
    }
  });

  //////////////////////////
  // FUNCTIONS //////////////
  //////////////////////////

  // HANDLE INPUT CHANGE
  const handleInputChange = useCallback((e:React.ChangeEvent<HTMLInputElement>) => {

    let key = e.target.name;
    let value = e.target.value;

    // IF STATE KEY DIFFERENT THAN THE NEW INPUT, THEN CHANGE
    if(state[key as keyof typeof LoginPage] !== value) {
      setState((prevState) => {
        return {
          ...prevState,
          [key]: value,
        }
      });

      setErrors((prevState) => {
        return {
          ...prevState,
          [key]: "",
        }
      });
    }

  }, []);

  // HANDLE SUBMIT
  const handleSubmit = useCallback(async () => {
    // CALL ADD USER MUTATION FUNCTION
    await loginUser();

    // IF LOGGED IN SUCCESSFULLY, THEN REDIRECT TO HOME PAGE "/"
    Router.push('/');
    
  }, []);


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
          className={`border-b-2 py-3 px-2  focus:outline-none ${errors.username.length > 0 ? "border-b-red-400" : ""}`} name="username" onChange={handleInputChange}
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
          className={`border-b-2 py-3 px-2  focus:outline-none ${errors.email.length > 0 ? "border-b-red-400" : ""}`} name="email" onChange={handleInputChange}
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
          className={`border-b-2 py-3 px-2  focus:outline-none ${errors.password.length > 0 ? "border-b-red-400" : ""}`} name="password" onChange={handleInputChange}
        />

        {/* IF ERROR SHOW PASSWORD ERROR */}
        {
          errors.password.length > 0 ?
          <span className='text-red-400 mt-3 text-sm'>
            {errors.password}
          </span>
        :null}
        
    

        {/* REGISTER BTN! */}
        <Button
          onClick={handleSubmit}
          txt="Login"
          btnCss='border transition text-white hover:scale-105 hover:shadow-lg w-[20%] bg-[color:var(--main-blue)] m-auto min-w-[80px] mt-5 p-3 rounded-lg hover:bg-white hover:border-[color:var(--main-blue)] hover:text-[color:var(--main-blue)]'
        />
        

      </div>
    </div>

    
  )
}

export default memo(LoginPage);