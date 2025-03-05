"use client";
import { OtherIcons } from '@/assests/icons';
import UserAvatar from '@/components/common/UserAvatar/UserAvatar';
import LayOut from '@/components/LayOut';
import React, { useState } from 'react';

const ClientDetails = () => {
    const [isActive, setIsActive] = useState(false);
    const user = {
        name: "Abhilash Singh",

        isActive: true,
        image: "",
    };
    return (
        <LayOut>
            <div className="w-full  h-full  left-[80px] rounded-[10.17px] border border-[#F4EAEA] bg-white p-6 shadow-lg">
                <div className="w-full  h-[40px] relative top-[6px] sm:flex items-center justify-between px-2 border-b border-gray-100 ">
                    <p className="text-[26px] mb-[20px]">
                        Client Information
                    </p>

                    <div className="flex items-center space-x-3 mb-[20px]">
                        {/* Toggle Switch */}
                        <label className="flex items-center cursor-pointer">
                            <span className="ml-2 text-[15px] mr-2">{isActive ? "Active" : "Inactive"}</span>

                            <div className="relative">
                                <input
                                    type="checkbox"
                                    className="sr-only"
                                    checked={isActive}
                                    onChange={() => setIsActive(!isActive)}
                                />
                                <div
                                    className={`w-16 h-[33px] rounded-full shadow-inner transition duration-300 ease-in-out bg-gray-100`}
                                ></div>
                                <div
                                    className={`absolute w-[30px] h-[25px] rounded-full shadow-md top-[3px] left-[2px] transition-transform duration-300 ease-in-out ${isActive ? 'translate-x-7 bg-green-400' : 'bg-red-400'
                                        }`}
                                >
                                    {isActive && (
                                        <span className="absolute inset-0 flex items-center justify-center text-white text-[10px]">
                                            ✔
                                        </span>
                                    )}
                                    {!isActive && (
                                        <span className="absolute inset-0 flex items-center justify-center text-white text-[10px]">
                                            ✘
                                        </span>
                                    )}
                                </div>
                            </div>
                        </label>

                        {/* Edit Button */}
                        <button className="w-[90px] h-[33px] rounded-[4px] py-[4px] bg-black text-white text-lg mr-[10px] mb-2">
                            Edit
                        </button>
                    </div>
                </div>
                <div className="p-4 mt-16 sm:mt-0 flex flex-col gap-4 xl:gap-6  xl:flex-row items-start justify-between ">
                    {/* Avatar Section */}
                    <div className=" w-[260px] h-[69px] flex items-center gap-[12.21px] ">
                        <UserAvatar name={user.name} dotColor='purple' size={66} image={user.image} isActive={user.isActive} />
                        <div className=" text-xl text-gray-700">
                            <p className="font-medium flex w-full ">Abhilash Singh</p>
                            <p className="text-xs text-gray-500">abhisingh@gmail.com</p>
                        </div>
                    </div>

                    {/* User Information Section */}
                    <div className="md:flex  flex-row gap-4  ">
                        <ul className="flex flex-col space-y-2">
                            <li className="w-[367px] h-[24px] flex items-center">
                                <span className=" h-[24px] opacity-90 text-[20px]">Contact Person</span>
                            </li>
                            <li className="w-[367px] h-[24px] flex items-center">
                                <span className="w-[130px] h-[24px] opacity-50">Name:</span>
                                <span className="w-[183px] h-[23px] ml-[35px]">Akash Singh</span>
                            </li>
                            <li className="w-[367px] h-[24px] flex items-center">
                                <span className="w-[130px] h-[24px] opacity-50">Mobile Number:</span>
                                <span className="w-[183px] h-[23px] ml-[35px]">Tech</span>
                            </li>

                        </ul>

                        <ul className="flex  flex-col space-y-2">
                            <li className="w-[367px] h-[24px] flex items-center">

                            </li>
                            <li className="w-[367px] h-[24px] flex items-center">
                                <span className="w-[114px] h-[24px] opacity-70">Username:</span>
                                <span className="w-[183px] h-[23px] ml-[35px]">user@gmail.com</span>
                            </li>
                            <li className="w-[367px] h-[24px] flex items-center">
                                <span className="w-[114px] h-[24px] opacity-70">Client ID:</span>
                                <span className="w-[183px] h-[23px] ml-[35px]">CL-001</span>
                            </li>

                        </ul>
                    </div>
                </div>

                <div className="ml-[33] mt-[20px]">
                    {/* Projects Heading */}
                    <div className="w-full h-[34.39px] flex items-center gap-[6px]">
                        {OtherIcons.projects_svg}
                        <span className="text-lg font-medium">Client Projects</span>
                    </div>

                    {/* Projects Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4  mt-4  ">
                        {[...Array(4)].map((_, index) => (
                            <div
                                key={index}
                                className="w-[100%] h-[132px] border border-gray-300 rounded-[8.93px] p-4 shadow-md hover:shadow-lg transition-all"
                            >
                                <div className='flex justify-between'>
                                    <p className="text-[18px] leading-[24.3px] tracking-[-3%] text-gray-800">
                                        HRMS Dashboard
                                    </p>
                                    <p
                                        className={`px-3  border rounded-md text-[15px] ${"user.priority" === 'High'
                                            ? 'text-[#4976F4] border-[#4976F4]' : "user.priority " === 'Low' ?
                                                'text-red-400 border-red-400' : 'text-[#954BAF] border-[#954BAF] h-[25px] w-[60px]'
                                            } inline-block`}
                                    >
                                        High
                                    </p>
                                </div>


                                <ul className="mt-2 space-y-2">
                                    <li className="flex text-gray-700">
                                        <span className="text-[10.72px] w-[60px]  text-gray-600">
                                            End Date
                                        </span>
                                        <span className="text-[12px]">
                                            01 Jan, 2025
                                        </span>
                                    </li>
                                    <li className="flex text-gray-700 ">
                                        <span className="text-[10.72px]  text-gray-600 w-6">
                                            Team
                                        </span>
                                        <span className="text-[12px] ml-9">
                                            Akash Shinde, Aryan Singh, Puneet Omar, Prachi Jadhav
                                        </span>
                                    </li>
                                </ul>
                            </div>
                        ))}
                    </div>

                    {/* View More Button */}
                    <button className="mt-4 px-4 py-2 bg-white border border-gray-200 text-black rounded-md flex align-middle items-center mx-auto shadow-md hover:shadow-lg">
                        View More
                    </button>
                </div>
            </div></LayOut>

    );
};

export default ClientDetails;
