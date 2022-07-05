import {memo, useCallback} from 'react';
import { LooseObject } from '../../types/validationTypes';
import Button from './Customs/Button';

export default memo(function Navbar({

}) {


    // HANDLE LOGIN CLICK
    const handleLoginClick = useCallback((e:LooseObject) => {
        e.preventDefault();
    }, []);

    // HANDLE REGISTER CLICK

    return (
        <div className='text-lg flex-row flex justify-between items-center min-w-screen p-7 sticky shadow-lg'>
            
            {/* APP TITLE */}
            <span 
                className="text-[3rem] px-6 blueTxt"
            >
                Postr
            </span>

            {/* LOGIN/REGISTER BTNS */}
            <div className="flex flex-row">
                
                {/* LOGIN */}
                <Button 
                    onClick={handleLoginClick}
                    txt="Login"
                    icon="login"
                    btnCss='w-32 mx-10 rounded-md shadow-xl border-gray border-2 border-solid border-[#3492eb] py-2 relative hover:bg-[#3492eb] commonSmallTransition hover:text-white'
                    iconCss='absolute left-1'
                    txtCss='font-medium'
                />
                
                {/* REGISTER */}
                
                <button>
                    Register
                </button>

            </div>

        </div>
    );
});