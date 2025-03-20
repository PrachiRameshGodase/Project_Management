"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLoggedInUser, loginUser } from "../store/authSlice";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast"; // Import react-hot-toast
import { Eye, EyeOff } from "lucide-react";
import useUserData from "@/components/common/Helper/useUserData";

const LoginPage = () => {
  const dispatch = useDispatch();
  const userData = useUserData()
  const router = useRouter();
  const { loading, error } = useSelector((state) => state.auth);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    const storedUserData = localStorage.getItem("UserData");

    if (token && storedUserData) {
      const userData = JSON.parse(storedUserData);
      router.push(userData?.is_admin === 1 ? "/all-projects" : "/home");
    }
  }, []);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevVal) => ({
      ...prevVal,
      [name]: value,
    }));
  };
  const handleSubmit = () => {
    dispatch(loginUser(formData)).then((res) => {
      if (res?.payload?.success) {
        toast.success("Login Successful!");
        dispatch(fetchLoggedInUser()).then((userRes) => {
          console.log("userRes", userRes)
          const isAdmin = userRes?.payload?.is_admin === 1;
          router.push(isAdmin ? "/all-projects" : "/home");
        });
      } else {
        toast.error(res?.payload?.message || "Login Failed!");
      }
    });
  };


  return (
    <div className="flex justify-center items-center h-screen">
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      <div className="w-[310px] sm:w-[450px]">
        <p className="text-[32px] text-[#000] p-2 rounded-md mt-1">Login</p>

        <div className="mt-4">
          <label className="block text-[16px] text-[#2A2A2A] p-1 rounded-md">
            User Name or Email Address<span className="text-red-600">*</span>
          </label>
          <input
            type="email"
            placeholder="Enter Email"
            className="w-full h-[54px]   rounded-[10px] p-3 mt-2 bg-[#EBE7EE99] focus:outline-none"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        {/* <div className="mt-4">
          <label className="block text-[16px] text-[#2A2A2A] p-1 rounded-md">
            Password<span className="text-red-600">*</span>
          </label>
          <input
            type="password"
            placeholder="Enter Password"
            className="w-full h-[54px] rounded-[10px] p-3 mt-2 bg-[#EBE7EE99] focus:outline-none"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div> */}
        <div className="mt-4 relative">
          <label className="block text-[16px] text-[#2A2A2A] p-1 rounded-md">
            Password<span className="text-red-600">*</span>
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter Password"
              className="w-full h-[54px] rounded-[10px] p-3 mt-2 bg-[#EBE7EE99] focus:outline-none pr-10"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-[55%] right-3 transform -translate-y-1/2 text-gray-500"
            >
              {showPassword ? <EyeOff size={26} /> : <Eye size={26} />}
            </button>
          </div>
        </div>

        <button
          className="w-full h-[56px] mt-6 bg-[#000] text-white rounded-[8px] text-[20px]"
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
