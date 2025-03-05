"use client";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../store/authSlice";
import { useRouter } from "next/navigation"; // For navigation in Next.js

const LoginPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { loading, error } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevVal) => ({
      ...prevVal,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    dispatch(loginUser(formData)).then((res)=>{
     
       if (res?.payload?.success== true) {
        router.push("/home"); 
    }
    });

   };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-[450px]">
        <p className="text-[32px] leading-[24px] tracking-[-1.5%] text-[#000000] p-2 rounded-md mt-1">
          Login
        </p>
        <div className="mt-4">
          <label className="block font-medium text-[16px] leading-[16px] tracking-[-2%] text-[#2A2A2A] p-1 rounded-md">
            User Name or Email Address*
          </label>
          <input
            type="email"
            placeholder="Enter Email"
            className="w-full h-[54px] rounded-[10px] text-[#2C2C2C] p-3 mt-2 bg-[#EBE7EE99] focus:outline-none"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="mt-4">
          <label className="block font-medium text-[16px] leading-[16px] tracking-[-2%] text-[#2A2A2A] p-1 rounded-md">
            Password*
          </label>
          <input
            type="password"
            placeholder="Enter Password"
            className="w-full h-[54px] rounded-[10px] text-[#2C2C2C] p-3 mt-2 bg-[#EBE7EE99] focus:outline-none"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        {error && <p className="text-red-500 mt-2">{error}</p>}

        <button
          className="w-full h-[56px] mt-6 bg-[#000000] text-white rounded-[8px] text-center font-medium text-[20px] leading-[27px] tracking-[-1.5%]"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
