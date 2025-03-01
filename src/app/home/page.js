import React from "react";
import { ArrowUpRight } from "lucide-react";
import { OtherIcons } from "@/assests/icons";

const cardData = [
    { id: 1, logo: <OtherIcons.accounts_logo />, title: "Accounting", description: "Manage your finances effectively." },
    { id: 2, logo: <OtherIcons.hrms_logo />, title: "Finance", description: "Track your income and expenses." },
    { id: 3, logo: <OtherIcons.cms_logo />, title: "Invoicing", description: "Create invoices with ease." },
    { id: 4, logo: <OtherIcons.accounts_logo />, title: "marketing Webapp", description: "Stay tax compliant effortlessly." },
    { id: 5, logo: <OtherIcons.accounts_logo />, title: "Accounting", description: "Manage your finances effectively." },
    { id: 6, logo: <OtherIcons.accounts_logo />, title: "Finance", description: "Track your income and expenses." },
    { id: 7, logo: <OtherIcons.accounts_logo />, title: "Invoicing", description: "Create invoices with ease." },
    { id: 8, logo: <OtherIcons.accounts_logo />, title: "Tax Management", description: "Stay tax compliant effortlessly." },
];

const HomePage = () => {
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 p-10 relative">
            {/* Avatar and Text Outside of Cards (Top-right of Page) */}
            <div className="absolute top-4 right-4 flex items-center space-x-2">
                <img
                    src="https://randomuser.me/api/portraits/men/10.jpg" // Replace with actual avatar image URL
                    alt="avatar"
                    className="w-[42px] h-[42px] rounded-full"
                />

            </div>
            <div className="flex flex-col w-full mt-[40px]">
                {/* <div className="flex items-center justify-center h-screen"> */}
                    <h1 className="text-3xl font-semibold text-gray-800 text-center flex items-center justify-center">All Projects</h1>
                {/* </div> */}

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-[40px]">
                    {cardData.map((card) => (
                        <div
                            key={card.id}
                            className="w-full h-full bg-white shadow-lg rounded-[17.5px] p-6 text-center flex flex-col justify-between"
                        >
                            <div className="flex flex-col gap-2">


                                <div className="flex justify-between">
                                    <p className=" text-[18px] text-[#2A2A2A] text-left">
                                        {card.title}
                                    </p>

                                    <span
                                        className={` border rounded-md ${"user.status" === 'To Do'
                                            ? 'text-[#6C757D] border-[#6C757D]'
                                            : "user.status" === 'In progress' ?
                                                'text-[#CA9700] border-[#CA9700]' : " user.status" === 'Completed' ? 'text-[#008053] border-[#008053]' : 'text-[#0D4FA7] border-[#0D4FA7] h-[24px] w-[120px]'
                                            } inline-block`}
                                    >
                                        In Progress
                                    </span>
                                </div>

                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-100">
                                        {OtherIcons.projects_svg}
                                    </div>
                                    <div className="flex flex-col">
                                        <p className="text-gray-800 text-[14px]">1 Jan, 2025</p>
                                        <p className="text-gray-400 text-[12px]">Deadline Date</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 mt-2">
                                    <div className="w-12 h-8 flex items-center justify-center rounded-full bg-blue-100">
                                        {OtherIcons.clients_svg}
                                    </div>
                                    <div className="flex flex-col text-left">
                                        <p className="text-gray-800 text-[14px]">Prachi Godase, Anurag, Punit, Sumit, Aryan</p>
                                        <p className="text-gray-400 text-[12px]">Team</p>
                                    </div>
                                </div>

                                <div> <div className="flex items-center gap-2 mb-2 justify-between">
                                    <p className='flex items-center flex-row gap-1'> {OtherIcons.projects_svg}
                                        <p className="font-[Supreme] font-normal text-[12.8px] leading-[17.28px]">Tasks (20)</p></p>


                                </div>
                                    <div className="w-[270px] h-[39px]">
                                        <table className="w-[90%]">
                                            <thead>
                                                <tr className="text-left">
                                                    <td className='font-300 text-gray-400 text-[12px]'>To Do</td>
                                                    <td className='font-300 text-gray-400 text-[12px]'>In Progress</td>
                                                    <td className='font-300 text-gray-400 text-[12px]'>Under Review</td>
                                                    <td className='font-300 text-gray-400 text-[12px]'>Completed</td>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td className='font-300 text-gray-700 text-[12px] text-center'>08</td>
                                                    <td className='font-300 text-gray-700 text-[12px] text-center'>08</td>
                                                    <td className='font-300 text-gray-700 text-[12px] text-center'>08</td>
                                                    <td className='font-300 text-gray-700 text-[12px] text-center'>08</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div></div>
                            </div>


                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HomePage;
