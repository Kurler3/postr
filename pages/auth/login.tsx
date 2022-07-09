import React, {memo, useState, useCallback} from 'react'

// CUSTOM COMPONENTS
import Button from '../../src/components/Customs/Button';

// APOLLO HOOKS
import { useMutation } from '@apollo/client';

// TYPESCRIPT INTERFACE FOR STATE
import { LoginState, RegisterState } from '../../types/authTypes';

// MUTATIONS
import { LOGIN_USER } from '../../graphql/mutations';

// LOADER
import { Circles } from 'react-loader-spinner';

// ROUTER
import Router from 'next/router';

// CUSTOM HOOK
import { useForm } from '../../util/hooks';

// GET USEDISPATCH 
import { useDispatch } from '../../store/store';

// GET LOGIN FUNCTION FROM USER REDUCER
import { login as loginAction } from '../../store/reducers/usersReducer';

// initial STATE
const initialState = {
  username: '',
  password: '',
}

const LoginPage = () => {

  const dispatch = useDispatch();

  //////////////////////////
  // STATE //////////////
  //////////////////////////

  const [errors, setErrors] = useState<LoginState>({
    username: '',
    password: '',
  });



  // USE FORM HOOK
  const {onChange, onSubmit, values} = useForm(login, initialState);

  //////////////////////////
  // MUTATION //////////////
  //////////////////////////

  // ADD USER FUNCTION AND LOADING 
  // UPDATE WILL BE TRIGGERED IF THE USER IS SUCCESSFULLY REGISTERED (SET LOCAL STORAGE TOKEN HERE)
  const [loginUser, {loading}] = useMutation(LOGIN_USER, {
    update(proxy, result) {
      Router.push('/');
      
      // CALL REDUX LOGIN ACTION HERE
      dispatch(loginAction(result.data.login));
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

  //////////////////////////
  // FUNCTIONS //////////////
  //////////////////////////

  // WORK AROUND FOR LOGIN USER IN THE useForm
  function login() {
    loginUser();
  }


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
        Login
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
        
    

        {/* REGISTER BTN! */}
        <Button
          onClick={onSubmit}
          txt="Login"
          btnCss='border transition text-white hover:scale-105 hover:shadow-lg w-[20%] bg-[color:var(--main-blue)] m-auto min-w-[80px] mt-5 p-3 rounded-lg hover:bg-white hover:border-[color:var(--main-blue)] hover:text-[color:var(--main-blue)]'
        />
        

      </div>
    </div>

    
  )
}

export default memo(LoginPage);