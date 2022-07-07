import Link from 'next/link';
import Router from 'next/router';
import {memo, SyntheticEvent, useCallback} from 'react';
import { LooseObject } from '../../types/validationTypes';
import Button from './Customs/Button';

export default memo(function Navbar({

}) {


    // HANDLE LOGIN CLICK
    const handleAuthBtnClick = useCallback((e:SyntheticEvent, isLoginClick:boolean) => {
        e.preventDefault();

        // REDIRECT TO /auth/login or /auth/register
        Router.push(`/auth/${isLoginClick ? "login" : "register"}`);


    }, []);

    // HANDLE REGISTER CLICK

    return (
        <div className='text-lg flex-row flex justify-between items-center min-w-screen p-7 sticky shadow-lg'>
            
            {/* APP TITLE */}
            <Link
                href="/"
            >
                <span className="text-[3rem] px-6 blueTxt cursor-pointer">
                    Postr
                </span>
                
            </Link>

            {/* LOGIN/REGISTER BTNS */}
            <div className="flex flex-row">
                
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

            </div>

        </div>
    );
});