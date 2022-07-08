
// REACT
import React, { memo, useCallback, useState } from 'react';

// APOLLO HOOKS
import {useMutation} from '@apollo/client';
import { REGISTER_USER } from '../../graphql/mutations';


interface RegisterState {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const RegisterPage = () => {

 

  //////////////////////////
  // STATE //////////////
  //////////////////////////
  const [state, setState] = useState<RegisterState>({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  //////////////////////////
  // MUTATION //////////////
  //////////////////////////

  // ADD USER FUNCTION AND LOADING 
  // UPDATE WILL BE TRIGGERED IF THE USER IS SUCCESSFULLY REGISTERED (SET LOCAL STORAGE TOKEN HERE)
  const [addUser, {loading} ] = useMutation(REGISTER_USER, {
    update(proxy, result) {
      console.log("Result: ", result);
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
    if(state[key as keyof typeof RegisterPage] !== value) {
      setState((prevState) => {
        return {
          ...prevState,
          [key]: value,
        }
      })
    }

  }, []);

  // HANDLE SUBMIT
  const handleSubmit = useCallback(() => {
    // CALL ADD USER MUTATION FUNCTION
    addUser();
  }, []);


  return (  
    <div className='m-auto w-[40%] flex flex-col justify-start align-middle mt-8'>
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
          className="border-b-2 py-3 px-2  focus:outline-none" name="username" onChange={handleInputChange}
        />

         {/* LABEL FOR EMAIL */}
        <span className="text-[#66b5ff] mt-3">Email</span>
        {/* EMAIL */}
        <input type="email" placeholder="Enter email..." maxLength={50}
          className="border-b-2 py-3 px-2  focus:outline-none" name="email" onChange={handleInputChange}
        />

        {/* LABEL FOR PASSWORD */}
        <span className="text-[#66b5ff] mt-3">Password</span>
        {/* EMAIL */}
        <input type="password" placeholder="Enter password..." maxLength={50}
          className="border-b-2 py-3 px-2  focus:outline-none" name="password" onChange={handleInputChange}
        />

        
        {/* LABEL FOR CONFIRM PASSWORD */}
        <span className="text-[#66b5ff] mt-3">Confirm Password</span>
        {/* EMAIL */}
        <input type="password" placeholder="Confirm password..." maxLength={50}
          className="border-b-2 py-3 px-2  focus:outline-none" name="confirmPassword" onChange={handleInputChange}
        />

        {/* REGISTER BTN! */}

      </div>
    </div>

    
  )
}

export default memo(RegisterPage);