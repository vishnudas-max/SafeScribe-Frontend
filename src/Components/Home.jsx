import React, { useState, useContext, useEffect } from 'react'
import Navbar from './Navbar'
import { IoIosCopy } from "react-icons/io";
import { IoSaveSharp } from "react-icons/io5";
import "../assets/style.css";
import { MdClose } from "react-icons/md";
import OpenHistoryContext, { HistoryContext } from '../Contexts/OpenHistoryContext';
import Slider from '@mui/material/Slider';
import { useDispatch, useSelector } from 'react-redux'
import { setAuth } from '../Redux/AuthSlice'
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom'
import CheckAuth from '../assets/CheckAuth';
import api from '../config'

function Home() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const is_authenticated = useSelector(state => state.authInfo.is_authenticated)
  const [message, setMessage] = useState('')
  const username = useSelector(state => state.authInfo.username)

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

  const { isHistoryOpen, toggleHistory } = useContext(HistoryContext);

  useEffect(() => {
    if (isHistoryOpen) {
      getAllPasswords()
    }
  }, [isHistoryOpen])


  const onGoogleLoginSuccess = () => {
    // alert(import.meta.env.VITE_BASE_URL)
    // // localStorage.setItem('loading', true)
    const GOOGLE_AUTH_URL = 'https://accounts.google.com/o/oauth2/v2/auth';
    const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URL
    const scope = [
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile'
    ].join(' ');

    const params = {
      response_type: 'code',
      client_id: import.meta.env.VITE_GOOGLE_OAUTH2_CLIENT_ID,
      redirect_uri: REDIRECT_URI,
      prompt: 'select_account',
      access_type: 'offline',
      scope
    };
    const urlParams = new URLSearchParams(params).toString();
    window.location = `${GOOGLE_AUTH_URL}?${urlParams}`;
  }

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const access = query.get('access');
    const refresh = query.get('refresh');
    if (access && refresh) {
      localStorage.setItem('accessToken', access);
      localStorage.setItem('refreshToken', refresh);
      const decodeToken = jwtDecode(access);
      dispatch(setAuth({
        "username": decodeToken.username,
        "is_admin": decodeToken.is_admin,
        "userID": decodeToken.user_id
      }));
    }
    navigate('/', { replace: true })
    return () => {
    }
  }
    , [location]
  )


  const [uppercase, setUppercase] = useState(false);
  const [lowercase, setLowercase] = useState(false);
  const [numeric, setNumeric] = useState(false);
  const [symbols, setSymbols] = useState(false);
  const [passwordLength, setPasswordLength] = useState(10);
  const [password, setPassword] = useState('');
  const [passwords, setPasswords] = useState(null)

  const handleGeneratePassword = () => {
    const selectedOptions = [uppercase, lowercase, numeric, symbols].filter(Boolean).length;

    if (selectedOptions < 2) {
      setMessage('Select atleast two options!');
      setTimeout(() => (
        setMessage('')
      ), [1000])
      return;
    }

    const upperCaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowerCaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const numericChars = '0123456789';
    const symbolChars = '!@#$%^&*()_+[]{}|;:,.<>?';

    let characterPool = '';

    if (uppercase) characterPool += upperCaseChars;
    if (lowercase) characterPool += lowerCaseChars;
    if (numeric) characterPool += numericChars;
    if (symbols) characterPool += symbolChars;

    let generatedPassword = '';
    for (let i = 0; i < passwordLength; i++) {
      const randomIndex = Math.floor(Math.random() * characterPool.length);
      generatedPassword += characterPool[randomIndex];
    }

    setPassword(generatedPassword);
  };

  const handleSavePassword = () => {

    const access = localStorage.getItem('accessToken');


    api.post('manage/password/', { password: password }, {
      headers: {
        Authorization: `Bearer ${access}`
      }
    })
      .then(response => {

        console.log(response);
        setMessage('Password saved!');
        setTimeout(() => setMessage(''), 1000);
      })
      .catch(error => {
        console.error('Error saving password:', error);
        setMessage('Failed to save password!');
        setTimeout(() => setMessage(''), 2000);
      });
  };

  const getAllPasswords = () => {

    const access = localStorage.getItem('accessToken');


    api.get('manage/password/', {
      headers: {
        Authorization: `Bearer ${access}`
      }
    })
      .then(response => {
        setPasswords(response.data)
        console.log(response);
      })
      .catch(error => {
        console.error('Something went wrong', error);
      });
  };

  return (
    <>
      <Navbar change={toggleHistory} onGoogleLoginSuccess={onGoogleLoginSuccess} />

      <div className='bg-zinc-800 mx-auto  mt-5 md:max-w-[900px] max-w-[350px] h-fit md:pb-7 pb-4 '>

        {/* notification-- */}
        <div className={`delay-75 z-20 transition-all ease-in-out absolute md:top-20 right-12 top-12  w-fit text-[#4bf95f]  px-3 py-2 text- font-semibold h-fit bg-[#000300] rounded-md
          ${message ? 'scale-100' : 'scale-0 px-0'}
          `}>
          <p className='text-nowrap'>{message}</p>
        </div>

        <h1 className='text-center pt-5 md:text-4xl text-2xl font-bold space-x-4 text-white'>Generate a Secure Password</h1>
        <div className='pl-5 pr-5 pt-8 pb-4 md:max-w-[700px] max-w-[340px] bg-[#000300] mx-auto md:mt-20 mt-8 rounded-md'>
          <div className='md:flex flex-col md:flex-row gap-x-2 items-center'>
            <div className='flex gap-x-1 items-center'>
              <input type="text" placeholder='{@}I#},P3+>\\&\\.&' value={password} className='bg-gray-800 text-white md:w-72 w-full pt-3 pr-2 pb-1 outline-none rounded-md pl-2 md:text-[19px]' />
              {password && <button className='text-white w-fit h-fit px-2 text-xs flex' onClick={() => setPassword('')}>Clear<MdClose className='size-4 text-white' /></button>}
            </div>
            <div className='flex h-fit md:pt-0 pt-3 md:gap-x-2 gap-x-4'>
              <button
                onClick={() => {
                  if (password) {
                    navigator.clipboard.writeText(password)
                      .then(() => {
                        setMessage('Password copied to clipboard!');
                        setTimeout(() => (
                          setMessage('')
                        ), [1000])
                      })
                      .catch(() => {
                        setMessage('Failed to copy the password.');
                        setTimeout(() => (
                          setMessage('')
                        ), [1000])
                      });
                  } else {
                    setMessage('Generate a password!.');
                    setTimeout(() => (
                      setMessage('')
                    ), [1000])
                  }
                }}
                className='flex gap-x-2 h-fit items-center w-fit py-2 bg-[#3aff43] px-2 border rounded-md border-gray-900'>
                Copy<IoIosCopy className='text-black' />
              </button>

              <button onClick={() => {
                if (is_authenticated) {
                  if (password) {
                    handleSavePassword()
                  } else {
                    setMessage('Generate a password!.');
                    setTimeout(() => (
                      setMessage('')
                    ), [1000])
                  }
                } else {
                  onGoogleLoginSuccess()
                }
              }} className='flex gap-x-2 h-fit items-center w-fit py-2 bg-[#3aff43] px-2 border rounded-md border-gray-900'>
                Save<IoSaveSharp className='text-black' />
              </button >

            </div>
          </div>
          <div className='w-full h-[1px] my-4 flex gap-x-1'>
            {Array(60).fill().map((_, index) => (
              <div key={index} className='h-full bg-white w-full'></div>
            ))}
          </div>

          <div>
            <h1 className='text-gray-200 text-xl mb-4 font-semibold'>Customize your Password</h1>
          </div>

          <div className='w-full border-[2px] p-7 border-gray-600 h-fit grid grid-cols-2'>

            <div className='col-span-1 flex items-center gap-x-3 py-2'>
              <input type="checkbox" name="uppercase" id=""
                checked={uppercase}
                onChange={(e) => setUppercase(e.target.checked)}
                className='size-5 border text-black border-gray-300 rounded checked:bg-green-500 checked:border-green-500 focus:outline-none appearance-none' />
              <label htmlFor="uppercase" className='text-white'>Uppercase</label>
            </div>

            <div className='col-span-1 flex items-center gap-x-3 py-2'>
              <input type="checkbox"
                checked={lowercase}
                onChange={(e) => setLowercase(e.target.checked)}
                name="lowercase" id="" className='size-5 border text-black border-gray-300 rounded checked:bg-green-500 checked:border-green-500 focus:outline-none appearance-none' />
              <label htmlFor="lowercase" className='text-white'>Lowercase</label>
            </div>

            <div className='col-span-1 flex items-center gap-x-3 py-2'>
              <input type="checkbox"
                checked={numeric}
                onChange={(e) => setNumeric(e.target.checked)}
                name="numeric" id="" className='size-5 border text-black border-gray-300 rounded checked:bg-green-500 checked:border-green-500 focus:outline-none appearance-none' />
              <label htmlFor="numeric" className='text-white'>Numeric</label>
            </div>

            <div className='col-span-1 flex items-center gap-x-3 py-2'>
              <input type="checkbox"
                checked={symbols}
                onChange={(e) => setSymbols(e.target.checked)}
                name="symbols" id="" className='size-5 border text-black border-gray-300 rounded checked:bg-green-500 checked:border-green-500 focus:outline-none appearance-none' />
              <label htmlFor="symbols" className='text-white'>Symbols</label>
            </div>

            <div className='flex items-center gap-x-3'>
              <label htmlFor="passwordlength" className='text-white'>Password Length</label>
              <input
                type="number"
                id="passwordlength"
                min={0}
                max={20}
                value={passwordLength}
                readOnly
                className='text-center w-9 px-2 bg-transparent border outline-none text-white'
              />
            </div>
            <div className='flex items-center gap-x-3'>
              <Slider
                min={0}
                max={20}
                value={passwordLength}
                onChange={(e, value) => setPasswordLength(value)}
                sx={{
                  width: 300,
                  color: 'success.main',
                }}
              />
            </div>
          </div>

          <button className='text-black w-fit h-fit bg-[#3aff43] mt-3 px-3 py-[5px] font-semibold'
            onClick={handleGeneratePassword}
          >Generate</button>
        </div>

        {/* password list show-- */}
        {isHistoryOpen &&
          <div className='fixed top-0 left-0 right-0 h-screen backdrop-blur-md transition-all ease-in-out delay-75 flex'>
            <div className='absolute right-5 top-5'>
              <MdClose className='size-9 text-white cursor-pointer' onClick={() => toggleHistory(false)} />
            </div>
            <div className='md:max-w-[500px] grid gap-2 md:max-h-[600px] overflow-y-scroll no-scrollbar grid-cols-2 bg-gray-900 rounded-md mt-20 pt-3 px-3 pb-2 h-fit mx-auto'>
              <div className='col-span-2 py-2 text-center text-white text-xl font-bold'>
                <h1 className='text-3xl'>{username}</h1>
              </div>
              <div className='col-span-2 py-2 text-center text-white text-xl font-semibold'>
                <h1>Password History</h1>
              </div>
              {passwords && passwords.map((password, index) => (
                <div key={index} className='col-span-1'>
                  <div className='border-red-700 border px-3 py-1 w-56'>
                    <h5 className='text-white bg-transparent'>{password.password}</h5>
                    <div className='flex justify-between mt-1'>
                      <span className='text-gray-500 text-xs'>{password.saved_date}</span>
                      <div>
                        <IoIosCopy className='text-gray-400 size-5 cursor-pointer'
                          onClick={() => (
                            navigator.clipboard.writeText(password.password)
                              .then(() => {
                                setMessage('Password copied to clipboard!');
                                setTimeout(() => (
                                  setMessage('')
                                ), [1000])
                              })
                              .catch(() => {
                                setMessage('Failed to copy the password.');
                                setTimeout(() => (
                                  setMessage('')
                                ), [1000])
                              }))}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}



            </div>
          </div>}

      </div>
    </>
  )
}

export default CheckAuth(OpenHistoryContext(Home));

