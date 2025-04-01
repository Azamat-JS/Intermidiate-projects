import React, { useState } from 'react';
import {FaRegEye, FaRegEyeSlash} from 'react-icons/fa6';

export default function Input({value, onChange, label, placeholder, type}) {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassoword = () => {
     setShowPassword(!showPassword);
  }
    return (
   <div>
    <label className='text-[13px] text-slate-800'>{label}</label>
    <div className='input-box'>
        <input type={type == 'password' ? showPassword ? 'text' : 'password' : type} 
        placeholder={placeholder}
        className='w-full bg-transparent outline-none'
        value={value}
        onChange={(e) => onChange(e)}
        />

        {type === "password" && (
            <>
            {showPassword ? (
                <FaRegEye
                size={22}
                className=''
                onClick={() => toggleShowPassoword()}
                />
            ) : (
                <FaRegEyeSlash 
                size={22}
                className=''
                onClick={() => toggleShowPassoword()}
                />
            )}
            </>
        )}
    </div>
  </div>
  );
};
