import React, { useState, useContext, useEffect } from 'react'
import Navbar from './Navbar'
import { IoIosCopy } from "react-icons/io";
import { IoSaveSharp } from "react-icons/io5";
import "../assets/style.css";
import { MdClose } from "react-icons/md";
import OpenHistoryContext, { HistoryContext } from '../Contexts/OpenHistoryContext';
import Slider from '@mui/material/Slider';



function Home() {

  const [value, setValue] = useState(0);
  const handlePasswordLength = (e) => {
    setValue(e.target.value);
  };
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
  return (
    <>
      <Navbar change={toggleHistory} />
      <div className='bg-zinc-800 mx-auto  mt-5 md:max-w-[900px] max-w-[350px] h-fit md:pb-7 pb-4'>
        <h1 className='text-center pt-5 md:text-4xl text-2xl font-bold space-x-4 text-white'>Generate a Secure Password</h1>

        <div className='pl-5 pr-5 pt-8 pb-4 md:max-w-[700px] max-w-[340px] bg-[#000300] mx-auto md:mt-20 mt-8 rounded-md'>
          <div className='md:flex flex-col md:flex-row gap-x-2 items-center'>
            <input type="text" placeholder='{@}I#},P3+>\\&\\.&' className='bg-gray-800 text-white md:w-72 w-full pt-3 pr-2 pb-1 outline-none rounded-md pl-2 md:text-[19px]' />
            <div className='flex h-fit md:pt-0 pt-3 md:gap-x-2 gap-x-4'>
              <button className='flex gap-x-2 h-fit items-center w-fit py-2 bg-[#3aff43] px-2 border rounded-md border-gray-900'>
                Copy<IoIosCopy className='text-black' />
              </button>
              <button className='flex gap-x-2 h-fit items-center w-fit py-2 bg-[#3aff43] px-2 border rounded-md border-gray-900'>
                Save<IoSaveSharp className='text-black' />
              </button>
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
              <input type="checkbox" name="uppercase" id="" className='size-5 border text-black border-gray-300 rounded checked:bg-green-500 checked:border-green-500 focus:outline-none appearance-none' />
              <label htmlFor="uppercase" className='text-white'>Uppercase</label>
            </div>

            <div className='col-span-1 flex items-center gap-x-3 py-2'>
              <input type="checkbox" name="lowercase" id="" className='size-5 border text-black border-gray-300 rounded checked:bg-green-500 checked:border-green-500 focus:outline-none appearance-none' />
              <label htmlFor="lowercase" className='text-white'>Lowercase</label>
            </div>

            <div className='col-span-1 flex items-center gap-x-3 py-2'>
              <input type="checkbox" name="numeric" id="" className='size-5 border text-black border-gray-300 rounded checked:bg-green-500 checked:border-green-500 focus:outline-none appearance-none' />
              <label htmlFor="numeric" className='text-white'>Numeric</label>
            </div>

            <div className='col-span-1 flex items-center gap-x-3 py-2'>
              <input type="checkbox" name="symbols" id="" className='size-5 border text-black border-gray-300 rounded checked:bg-green-500 checked:border-green-500 focus:outline-none appearance-none' />
              <label htmlFor="symbols" className='text-white'>Symbols</label>
            </div>

            <div className='col-span-1 flex items-center gap-x-3 py-2'>
              <input type="checkbox" name="uppercase" id="" className='size-5 border text-black border-gray-300 rounded checked:bg-green-500 checked:border-green-500 focus:outline-none appearance-none' />
              <label htmlFor="uppercase" className='text-white'>Uppercase</label>
            </div>

            <div className='flex items-center gap-x-3'>
              <label htmlFor="passwordlength" className='text-white'>Password Length</label>
              <input
                type="number"
                id="passwordlength"
                min={0}
                max={20}
                value={value}
                readOnly
                className='text-center w-9 px-2 bg-transparent border outline-none text-white'
              />
            </div>
            <div className='flex items-center gap-x-3'>
        <Slider
          min={0}
          max={20}
          value={value}
          onChange={handlePasswordLength}
          sx={{
            width: 300,
            color: 'success.main',
          }}
        />
      </div>
          </div>

          <button className='text-black w-fit h-fit bg-[#3aff43] mt-3 px-3 py-[5px] font-semibold'>Generate</button>
        </div>

        {/* password list show-- */}
        {isHistoryOpen &&
          <div className='fixed top-0 left-0 right-0 h-screen backdrop-blur-md transition-all ease-in-out delay-75 flex'>
            <div className='absolute right-5 top-5'>
              <MdClose className='size-9 text-white cursor-pointer' onClick={() => toggleHistory(false)} />
            </div>
            <div className='md:max-w-[500px] grid gap-2 md:max-h-[600px] overflow-y-scroll no-scrollbar grid-cols-2 bg-gray-900 rounded-md mt-20 pt-3 px-3 pb-2 h-fit mx-auto'>
              <div className='col-span-2 py-2 text-center text-white text-xl font-bold'>
                <h1>Password History</h1>
              </div>
              {data.map((item) => (
                <div key={item.id} className='col-span-1'>
                  <div className='border-red-700 border px-3 py-1 w-56'>
                    <h5 className='text-white bg-transparent'>{item.code}</h5>
                    <div className='flex justify-between mt-1'>
                      <span className='text-gray-500 text-xs'>{item.date}</span>
                      <div>
                        <IoIosCopy className='text-gray-400 size-5 cursor-pointer' />
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

export default OpenHistoryContext(Home);
