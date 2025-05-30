import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const Input = ({ value, onChange, label, placeholder, type }) => {
  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => setShowPassword(!showPassword);

  // Determine the actual input type
  const inputType = type === "password" && showPassword ? "text" : type;

  return (
    <div>
      <label className="text-[13px] text-slate-800">{label}</label>
      <div className="input-box flex items-center border rounded px-3 py-2">
        <input
          className="w-full bg-transparent outline-none"
          type={inputType}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />

        {type === "password" && (
          <>
            {showPassword ? (
              <FaRegEye
                size={20}
                className="text-primary cursor-pointer ml-2"
                onClick={togglePassword}
              />
            ) : (
              <FaRegEyeSlash
                size={20}
                className="text-slate-400 cursor-pointer ml-2"
                onClick={togglePassword}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Input;
