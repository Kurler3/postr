import Link from 'next/link';
import Router from 'next/router';
import React, {memo, SyntheticEvent, useCallback, useEffect} from 'react';
import { getUserState, UserState } from '../../../store/reducers/usersReducer';
import { useSelector } from '../../../store/store';
import Button from '../Customs/Button';
import { useDispatch } from '../../../store/store';
import {logout as logoutAction} from '../../../store/reducers/usersReducer'; 
import { USER_TOKEN } from '../../../util/constants';

import jwt from 'jsonwebtoken';

import {login as loginUser} from '../../../store/reducers/usersReducer';

export default memo(function Navbar({

}) {

    // DISPATCH
    const dispatch = useDispatch();

    // GET USER STATE FROM REDUX
    const user = useSelector(getUserState);
    

    // HANDLE LOGIN CLICK
    const handleAuthBtnClick = useCallback((e:SyntheticEvent, isLoginClick:boolean) => {
        e.preventDefault();

        // REDIRECT TO /auth/login or /auth/register
        Router.push(`/auth/${isLoginClick ? "login" : "register"}`);

    }, []);

    // HANDLE LOGOUT
    const handleLogOut = useCallback((e:SyntheticEvent) => {
        dispatch(logoutAction());
    }, []);


    // AUTH SIGN IN IF TOKEN
    useEffect(() => {
        let token = localStorage.getItem(USER_TOKEN);

        // IF THERE'S A TOKEN AND THE USER IS NOT LOGGED IN, THEN LOG HIM IN
        if(token && token.length > 0  && !user.id) {
            let userData = jwt.decode(token);
            dispatch(loginUser({...userData as Object, token} as UserState));
        }

    }, []);

    return (
        <div className='text-lg flex-row flex justify-between items-center min-w-screen p-7 sticky shadow-lg'>
            
            {/* APP TITLE */}
            <Link
                href="/"
            >
                <span className="transition hover:scale-105 text-[3rem] px-6 text-[#66b5ff] hover:text-[#3492eb] cursor-pointer">
                    Postr
                </span>
                
            </Link>

            {/* LOGIN/REGISTER BTNS */}
            <div className="flex flex-row items-center">
                
                {
                    !user.id ?
                    <React.Fragment>
                        {/* LOGIN */}
                        <Button 
                            onClick={(e:SyntheticEvent) => handleAuthBtnClick(e, true)}
                            txt="Login"
                            icon="login"
                            btnCss='w-32 mx-5 rounded-md shadow-xl border-gray border-2 border-solid border-[#3492eb] py-2 relative hover:bg-[#3492eb] commonSmallTransition hover:text-white'
                            iconCss='mr-2'
                            txtCss='font-medium'
                        />
                        
                        {/* REGISTER */}
                        
                        <Button 
                            onClick={(e:SyntheticEvent) => handleAuthBtnClick(e, false)}
                            txt="Register"
                            icon="how_to_reg"
                            btnCss='w-32 mx-5 rounded-md shadow-xl border-2 border-solid hover:border-[#3492eb] py-2 relative bg-[#3492eb]  hover:bg-white commonSmallTransition text-white hover:text-black'
                            iconCss='mr-2'
                            txtCss='font-medium'
                        />
                    </React.Fragment>
                
                :
                <React.Fragment>
                    
                    {/* GREETING MSG*/}
                    <span className='text-2xl h-full mr-5'>
                        Hi, <b>{user.username}</b>!
                    </span>
                    
                    {/* LOGOUT BTN */}
                    <Button 
                        onClick={(e:SyntheticEvent) => handleLogOut(e)}
                        txt="Logout"
                        icon="logout"
                        btnCss='w-32 mx-5 rounded-md shadow-xl border-gray border-2 border-solid border-[#3492eb] py-2 relative hover:bg-[#3492eb] commonSmallTransition hover:text-white'
                        iconCss='mr-2'
                        txtCss='font-medium'
                    />
                </React.Fragment>
                
            }

                

            </div>

        </div>
    );
});