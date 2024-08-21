import React, { useContext, useEffect, useState } from 'react'
import { FaUser } from "react-icons/fa";
import { BiLogOutCircle } from "react-icons/bi";
import OpenHistoryContext, { HistoryContext } from '../Contexts/OpenHistoryContext';
import { useDispatch, useSelector } from 'react-redux'
import { deleteAuth } from '../Redux/AuthSlice'
import CheckAuth from '../assets/CheckAuth';
import { useNavigate } from 'react-router-dom';


function Navbar({change,onGoogleLoginSuccess}) {
    const dispatch = useDispatch()
    // const { isHistoryOpen, toggleHistory } = useContext(HistoryContext);
    // const [isLogin,setIsLogin] = useState(false)
    // const navigate = useNavigate()
    const is_authenticated = useSelector(state => state.authInfo.is_authenticated)

    const data = [
        { id: 1, code: '^fdh&HShh43SKh', date: '12/02/2024' },
        { id: 2, code: '^a3d&2jL', date: '15/03/2024' },
        { id: 3, code: '^s8j&F', date: '20/04/2024' },
        { id: 4, code: '^Jk39&fjks!', date: '25/05/2024' },
        { id: 5, code: '^7Slx&FJ', date: '30/06/2024' },
        { id: 6, code: '^Klq23&9@kJ3a', date: '05/07/2024' },
        { id: 7, code: '^Ujk&3DfKpQ2', date: '10/08/2024' },
        { id: 8, code: '^Wdq7&Jkds#9', date: '15/09/2024' },
        { id: 9, code: '^Xo1k&F@dks2L', date: '20/10/2024' },
        { id: 10, code: '^Zm81&Qwk$Kd', date: '25/11/2024' },
        { id: 11, code: '^Blx&9sdFk21#k', date: '30/12/2024' },
        { id: 12, code: '^C7k!FjDk@93x', date: '05/01/2025' },
        { id: 13, code: '^D3n&kPslf@90lW2', date: '10/02/2025' },
        { id: 14, code: '^Ep2q&3RsdLk!@#', date: '15/03/2025' },
        { id: 15, code: '^Fq5a&9SlDkL3pO12', date: '20/04/2025' },
        { id: 16, code: '^Gk93&Psoi@#4dKd', date: '25/05/2025' },
        { id: 17, code: '^Hkd&Jsl#239Fadk@3', date: '30/06/2025' },
        { id: 18, code: '^I8sl&2jNkd@3!dF5Lo', date: '05/07/2025' },
        { id: 19, code: '^J1q5&Kl8Fj34sdoD@#', date: '10/08/2025' },
        { id: 20, code: '^KjD4&5fL1$3PkSod@!Ld', date: '15/09/2025' },
      ];
    const logout=()=>{
        localStorage.clear()
        dispatch(deleteAuth())
    }

    return (
        <nav className='w-screen grid grid-cols-2  bg-[#000300] h-fit md:py-5 py-2'>
            <div className='col-span-1 h-full md:pl-10 pl-5 flex items-center'>
                <h1 className='md:text-2xl text-xl font-semibold text-[#097923] space-x-1'><span className='font-bold md:text-3xl text-2xl text-[#3aff43]'>S</span>afe<span className='md:text-3xl text-xl font-bold text-[#3aff43]'>S</span>cribe</h1>
            </div>
           {is_authenticated ?
            <div className='col-span-1 h-full flex gap-x-4 items-center justify-end pr-10'>
                <div className='shrink-0'>
                    <FaUser className='md:size-7 size-5 text-[#3aff43] cursor-pointer' onClick={()=>{
                        change(true)
                        }} />
                </div>
                <div>
                    <BiLogOutCircle className='md:size-9 size-6 text-red-600' onClick={logout}/>
                </div>
            </div>:
            <div className='col-span-1 h-full flex gap-x-4 items-center justify-end pr-10'>
            <div className='shrink-0'>
               <h1 className='text-white cursor-pointer' onClick={onGoogleLoginSuccess}>Login</h1>
            </div>
        </div>}

            
        </nav>
    )
}

export default CheckAuth(OpenHistoryContext(Navbar));