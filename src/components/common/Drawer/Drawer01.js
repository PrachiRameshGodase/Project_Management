"use client"
import React, { useState } from "react";
import { motion } from "framer-motion";
import { CircleX, X } from "lucide-react";
import { OtherIcons } from "@/assests/icons";
import AttachmentPreview from "../Attachments/AttachmentPreview";
import DropdownStatus01 from "../Dropdown/DropdownStatus01";
import CommentBox from "../CommentBox/CommentBox";

const Drawer01 = ({ isOpen, setIsDrawerOpen, details }) => {

    if (!isOpen) return null;
    const [isActive, setIsActive] = useState(true)
    return (
        <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 h-full w-96 bg-white shadow-lg z-50 drawer-scrollbar"
        >
            <div className="p-2 flex justify-end items-center">
                <button
                    onClick={() => setIsDrawerOpen(false)}
                    className="text-gray-700 hover:text-black"
                >
                    <CircleX size={30} strokeWidth={1.5} />
                </button>
            </div>
            <div className="p-4 overflow-y-auto h-full ">
                <div className="flex justify-between">
                    <div className="w-[360px] h-[69px] flex items-center justify-between gap-[10px] ">
                        <div className="text-xl text-gray-700">
                            <p className="font-bold">{details?.project_name || '--'}</p>
                            <p className="text-xs text-gray-500">{details?.client_name || '--'}</p>
                        </div>
                        <DropdownStatus01
                            options={["To Do", "In Progress", "Under Review", "Completed"]}
                            selectedValue="To Do"
                            onSelect={(value) => console.log("Selected:", value)}
                            label="Status"
                            className="w-[150px]"
                        />
                    </div>
                    {/* <div>
                        <button className="w-[100px] h-[35px] rounded-[4px] py-[4px] bg-black text-white text-[16px] mb-2 p-4 mt-4">
                            Edit
                        </button>
                    </div> */}
                </div>
                <div className="flex justify-between">

                    <div>
                        <label className="flex items-center cursor-pointer">
                            <span className="ml-2 text-sm mr-2">{isActive ? "Active" : "Inactive"}</span>

                            <div className="relative">
                                <input
                                    type="checkbox"
                                    className="sr-only"
                                    checked={isActive}
                                    onChange={() => setIsActive(!isActive)}
                                />
                                <div
                                    className={`w-14 h-7 rounded-full shadow-inner transition duration-300 ease-in-out bg-gray-100`}
                                ></div>
                                <div
                                    className={`absolute w-6 h-6 rounded-full shadow-md top-[2px] left-[2px] transition-transform duration-300 ease-in-out ${isActive ? 'translate-x-7 bg-green-400' : 'bg-red-400'
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
                    </div>

                </div>
                {/* Project Details Section */}
                <div className="mb-4 mt-4 ml-[5px]">
                    <p className="text-xl leading-6">Project  Details</p>
                    <ul className=" h-[22px] mt-[20px] ">
                        <li className="flex mb-2 gap-4">
                            <span className="text-gray-400 w-[120px] text-[14px]">Priority</span><h4>:</h4>
                            <span className="text-gray-700 w-[200px] text-[14px]">{details?.priority || ""}</span>
                        </li>
                        <li className="flex mb-2 gap-4">
                            <span className="text-gray-400 w-[120px] text-[14px]">Project Stage </span><h4>:</h4>
                            <span className="text-gray-700 w-[200px] text-[14px]">{details?.project_stage}</span>
                        </li>
                        <li className="flex mb-2 gap-4">
                            <span className="text-gray-400 w-[120px] text-[14px]">Starting Date</span><h4>:</h4>
                            <span className="text-gray-700 w-[200px] text-[14px]">{details?.start_date || ""}</span>
                        </li>
                        <li className="flex mb-2 gap-4">
                            <span className="text-gray-400 w-[120px] text-[14px]">Deadline</span><h4>:</h4>
                            <span className="text-gray-700 w-[200px] text-[14px]">{details?.due_date || ""}</span>
                        </li>
                        <li className="flex mb-2 gap-4">
                            <span className="text-gray-400 w-[120px] text-[14px]">Project Leader</span><h4>:</h4>
                            <span className="text-gray-700 w-[200px] text-[14px]">{details?.project_leader_name || ""}</span>
                        </li>
                        <li className="flex mb-2 gap-4">
                            <span className="text-gray-400 w-[120px] text-[14px]">Team</span><h4>:</h4>
                            <span className="text-gray-700 w-[200px] text-[14px]">{details?.team?.join(", ") || ""}</span>
                        </li>
                        <li className="flex mb-2 gap-4">
                            <span className="text-gray-400 w-[120px] text-[14px]">Description</span><h4>:</h4>
                            <span className="text-gray-700 w-[200px] text-[14px]">{details?.description || ""}</span>
                        </li>
                        <li className="flex mb-2 gap-4">
                            <span className="text-gray-400 w-[120px] text-[14px]">Attachments</span>
                            <h4>:</h4>
                            <span className="text-gray-700 w-[200px]">
                                <AttachmentPreview files={details?.attachments} />
                            </span>
                        </li>
                    </ul>
                </div>

                {/* Comment Section */}
                {/* <div className="mt-[390px] mb-[20px]">
                    <p className="text-md">Comment</p>
                    <div className="flex"> <div className="flex items-center mt-2 border border-gray-300 rounded-md p-2">
                        <img
                            src="https://randomuser.me/api/portraits/men/10.jpg"
                            alt="avatar"
                            className="w-[30px] h-[30px] rounded-full mr-2"
                        />
                        <input
                            type="text"
                            placeholder="Add Comment..."
                            className="flex-1 border-none outline-none p-2 w-[139px]"
                        />
                        <p className="flex space-x-2 ml-2 mr-2">
                            <span>{OtherIcons.special_svg}</span>
                            <span>{OtherIcons.attachment_svg}</span>
                            <span>{OtherIcons.speak_svg}</span>
                        </p>
                    </div>
                        <p className="mt-6 ml-4">{OtherIcons.send_comment_svg}</p></div>

                </div>

                <div className="flex mb-[60px]">
                    <img
                        src="https://randomuser.me/api/portraits/men/10.jpg"
                        alt="avatar"
                        className="w-[30px] h-[30px] rounded-full mr-2"
                    />
                    <div className="w-[340px] h-[80px] bg-gray-100 rounded-sm flex flex-col p-2">
                        <div className="flex justify-between"> <p className="text-gray-400 text-[12px]">2 min</p><p>{OtherIcons.dotted_svg}</p></div>
                        <p className="text-[14px]">Lorem ipsum dolor sit amet, coetur adipiscing elit ut aliquam, purus sit amet </p>

                    </div>
                </div> */}
                <CommentBox />
            </div>
        </motion.div>

    );
};

export default Drawer01;

export const Drawer001 = ({ isOpen, setIsDrawerOpen, children }) => {
    if (!isOpen) return null;
    const [isActive, setIsActive] = useState(true)
    return (
        <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 h-full w-96 bg-white shadow-lg z-50 drawer-scrollbar"
        >
            <div className="p-2 flex justify-end items-center">
                <button
                    onClick={() => setIsDrawerOpen(false)}
                    className="text-gray-500 hover:text-black"
                >
                    <X size={18} />
                </button>
            </div>
            <div className="p-4 overflow-y-auto h-full ">
                <div className="flex justify-between">
                    <div className="w-[360px] flex items-center gap-[10px] ">
                        <div className="text-xl text-gray-700">
                            <p className="font-bold">Develop core pages  and create logo</p>
                        </div>
                    </div>
                    <DropdownStatus01
                        options={["To Do", "In Progress", "Under Review", "Completed"]}
                        selectedValue="To Do"
                        onSelect={(value) => console.log("Selected:", value)}
                        label="Status"
                        className="w-[150px]"
                    />

                </div>
                <div className="flex justify-between">
                    <p
                        className={`font-[400] text-[12px] leading-[16.8px] border rounded flex items-center justify-center mt-2 ${"user.status" === "To Do"
                            ? "text-[#6C757D] border-[#6C757D]  w-[50px] h-[20px]"
                            : "user.status" === "In progress"
                                ? "text-[#CA9700] border-[#CA9700]  w-[90px] h-[20px]"
                                : "user.status" === "Completed"
                                    ? "text-[#008053] border-[#008053]  w-[90px] h-[20px]"
                                    : "text-[#0D4FA7] border-[#0D4FA7]  w-[90px] h-[20px]"
                            }`}
                    >
                        Under Review
                    </p>
                    <div>
                        <button className="w-[100px] h-[35px] rounded-[4px] py-[4px] bg-black text-white text-[16px] mb-2 p-4 mt-4">
                            Edit
                        </button>
                    </div>

                </div>
                {/* Project Details Section */}
                <div className="mb-4 mt-4 ml-[5px]">
                    <p className="text-xl leading-6">Task Details</p>
                    <ul className=" h-[22px] mt-[20px] ">
                        <li className="flex mb-2 gap-4">
                            <span className="text-gray-400 w-[120px] text-[14px]">Due Date</span><h4>:</h4>
                            <span className="text-gray-700 w-[200px] text-[14px]">10 Apr, 2024</span>
                        </li>
                        <li className="flex mb-2 gap-4">
                            <span className="text-gray-400 w-[120px] text-[14px]">Type</span><h4>:</h4>
                            <span className="text-gray-700 w-[200px] text-[14px]">Bug fix</span>
                        </li>
                        <li className="flex mb-2 gap-4">
                            <span className="text-gray-400 w-[120px] text-[14px]">Team</span><h4>:</h4>
                            <span className="text-gray-700 w-[200px] text-[14px]">Satyam Pardeshi, Prachi Jadhav, Sumit yadav, Aryan </span>
                        </li>
                        <li className="flex mb-2 gap-4">
                            <span className="text-gray-400 w-[120px] text-[14px]">Visibility</span><h4>:</h4>
                            <span className="text-gray-700 w-[200px] text-[14px]">10 Apr, 2024</span>
                        </li>
                        <li className="flex mb-2 gap-4">
                            <span className="text-gray-400 w-[120px] text-[14px]">Link</span><h4>:</h4>
                            <span className="text-gray-700 w-[200px] text-[14px]">Puneet Omar</span>
                        </li>

                        <li className="flex mb-2 gap-4">
                            <span className="text-gray-400 w-[120px] text-[14px]">Description</span><h4>:</h4>
                            <span className="text-gray-700 w-[200px] text-[14px]">Lorem ipsum dolor sit amet consectetur. Ipsum in amet arcu gravida enim dui ipsum. Id id</span>
                        </li>
                        <li className="flex mb-2 gap-4">
                            <span className="text-gray-400 w-[120px] text-[14px]">Attachments</span>
                            <h4>:</h4>
                            <span className="text-gray-700 w-[200px]">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="w-[76px] h-[84px] bg-white border border-gray-100 rounded-[5.67px] shadow-sm"></div>
                                    <div className="w-[76px] h-[84px] bg-white border border-gray-100 rounded-[5.67px] shadow-sm"></div>
                                </div>
                            </span>
                        </li>
                    </ul>
                </div>

                {/* Comment Section */}
                <CommentBox />
                {/* <div className="mt-[350px] mb-[20px]">
                    <p className="text-md">Comment</p>
                    <div className="flex"> <div className="flex items-center mt-2 border border-gray-300 rounded-md p-2">
                        <img
                            src="https://randomuser.me/api/portraits/men/10.jpg"
                            alt="avatar"
                            className="w-[30px] h-[30px] rounded-full mr-2"
                        />
                        <input
                            type="text"
                            placeholder="Add Comment..."
                            className="flex-1 border-none outline-none p-2 w-[139px]"
                        />
                        <p className="flex space-x-2 ml-2 mr-2">
                            <span>{OtherIcons.special_svg}</span>
                            <span>{OtherIcons.attachment_svg}</span>
                            <span>{OtherIcons.speak_svg}</span>
                        </p>
                    </div>
                        <p className="mt-6 ml-4">{OtherIcons.send_comment_svg}</p></div>

                </div>

                <div className="flex mb-[60px]">
                    <img
                        src="https://randomuser.me/api/portraits/men/10.jpg"
                        alt="avatar"
                        className="w-[30px] h-[30px] rounded-full mr-2"
                    />
                    <div className="w-[340px] h-[80px] bg-gray-100 rounded-sm flex flex-col p-2">
                        <div className="flex justify-between"> <p className="text-gray-400 text-[12px]">2 min</p><p>{OtherIcons.dotted_svg}</p></div>
                        <p className="text-[14px]">Lorem ipsum dolor sit amet, coetur adipiscing elit ut aliquam, purus sit amet </p>

                    </div>
                </div> */}
            </div>
        </motion.div>

    );
};
