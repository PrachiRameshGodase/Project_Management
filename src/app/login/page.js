"use client";
import React, { useState } from 'react'

const LoginPage = ({onLoginSuccess}) => {
    const [formData, setFormData]=useState({
        email:"",
        password:""
    })

    const handleChange=(e)=>{
        const { name, value } = e.target;
        setFormData((prevVal) => {
            return { ...prevVal, [name]: value };
        });
    }
    const handleLogin = (e) => {
            e.preventDefault();
        const { email, password } = formData;
        // Simulate login validation
        if (email === "user@example.com" && password === "password") {
          onLoginSuccess(); // Call the callback to update login state
        } else {
          alert("Invalid credentials");
        }
      };
    return (
        <div className="flex justify-center items-center h-screen ">
            <div className=" w-[450px]">
                <p className="font-[Supreme] font-bold text-[24px] leading-[26px] tracking-[-4%] text-[#17538A]  p-2 rounded-md text-center">
                    Log In to Your Dashboard! 👋
                </p>
                <p className="font-[Supreme] font-normal text-[15px] leading-[24px] tracking-[-1.5%] text-[#525252]  p-2 rounded-md text-center mt-1">
                    Welcome back. Enter your credentials to access your account
                </p>
                <div className="mt-4">
                    <label className="block font-[Supreme] font-medium text-[16px] leading-[16px] tracking-[-2%] text-[#2A2A2A]  p-1 rounded-md">
                        Email Address*
                    </label>
                    <input
                        type="email"
                        placeholder="Enter Email"
                        className="w-full h-[54px] rounded-[10px] text-[#2C2C2C] p-3 mt-2 bg-[#EBE7EE99] focus:outline-none"
                        name='email'
                        value={formData?.email}
                        onChange={handleChange}
                    />
                </div>
                <div className="mt-4">
                    <label className="block font-[Supreme] font-medium text-[16px] leading-[16px] tracking-[-2%] text-[#2A2A2A]  p-1 rounded-md">
                        Password*
                    </label>
                    <input
                        type="password"
                        placeholder="Enter Password"
                        className="w-full h-[54px] rounded-[10px] text-[#2C2C2C] p-3 mt-2 bg-[#EBE7EE99] focus:outline-none"
                        name='password'
                        value={formData?.password}
                        onChange={handleChange}

                    />
                </div>
                <div className="flex items-center justify-between mt-4">
                    <div className="flex justify-between items-center">
                        {/* Left Side - Checkbox & Label */}
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                className="w-[18px] h-[18px] border-[1px] border-[#6540A3] bg-[#6540A3] checked:text-white rounded-sm focus:ring-0"
                            />
                            <p className="ml-2 font-[Supreme] font-normal text-[15px] leading-[16px] tracking-[-2%] text-[#2C2C2C]">
                                Remember me
                            </p>
                        </div>

                        {/* Right Side - Forget Password */}
                        <div className='ml-[215px]'>
                            <p className="font-[Supreme] font-normal text-[15px] leading-[16px] tracking-[-2%] text-[#400F6F] cursor-pointer">
                                Forget Password?
                            </p>
                        </div>
                    </div>

                </div>
                <button className="w-full h-[56px] mt-6 bg-[#4B0082] text-white rounded-[8px] text-center font-[Supreme] font-medium text-[20px] leading-[27px] tracking-[-1.5%]" onClick={onLoginSuccess}>
                    Login
                </button>
            </div>
        </div>
    );
};

export default LoginPage
