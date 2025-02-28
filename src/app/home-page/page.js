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
                {/* <div className="text-sm text-gray-700">
                    <p className="font-bold">Ravikirn</p>
                    <p className="text-xs text-gray-500">admin</p>
                </div> */}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {cardData.map((card) => (
                    <div
                        key={card.id}
                        className="w-[280px] h-[290px] bg-white shadow-lg rounded-[17.5px] p-6 text-center flex flex-col justify-between"
                    >
                        <div className="flex flex-col ">


                            <div className="flex justify-between">
                                <p className=" text-[18px] leading-[28px]  text-[#2A2A2A] ">
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

                        </div>


                    </div>
                ))}
            </div>

        </div>
    );
};

export default HomePage;
