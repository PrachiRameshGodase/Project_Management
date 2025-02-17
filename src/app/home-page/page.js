import React from "react";
import { ArrowUpRight } from "lucide-react";
import { OtherIcons } from "@/assests/icons";

const cardData = [
    { id: 1, logo: <OtherIcons.accounts_logo />, title: "Accounting", description: "Manage your finances effectively." },
    { id: 2, logo: <OtherIcons.hrms_logo />, title: "Finance", description: "Track your income and expenses." },
    { id: 3, logo: <OtherIcons.cms_logo />, title: "Invoicing", description: "Create invoices with ease." },
    { id: 4, logo: <OtherIcons.accounts_logo />, title: "Tax Management", description: "Stay tax compliant effortlessly." },
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
                <div className="text-sm text-gray-700">
                    <p className="font-bold">Ravikirn</p>
                    <p className="text-xs text-gray-500">admin</p>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {cardData.map((card) => (
                    <div
                        key={card.id}
                        className="w-[237px] h-[223px] bg-white shadow-lg rounded-[17.5px] p-6 text-center flex flex-col justify-between"
                    >
                        <div className="flex flex-col items-start">
                            {/* Logo */}
                            <div className="w-[38px] h-[38px] bg-[#F4F9FF] rounded-md flex items-center justify-center">
                                <span className="text-purple-700 font-bold text-lg">{OtherIcons.accounts_logo}</span>
                            </div>

                            {/* Title */}
                            <p className="mt-2 font-[Supreme] font-medium text-[21px] leading-[28px] tracking-[-0.46px] bg-gradient-to-b from-[#C693F4] to-[#581396] text-transparent bg-clip-text">
                                {card.title}
                            </p>

                            <p className="font-[Supreme] font-normal text-[12px] leading-[17px] tracking-[-2.5%] text-gray-600">
                                {card.description}
                            </p>
                        </div>

                        {/* Button */}
                        <button className="mt-2 w-[120px] h-[31.5px] flex items-center justify-between px-[14px] py-[8px] bg-[#4B0082] text-white rounded-full font-medium gap-[6.5px] relative text-xs">
                            Get Started
                            {/* Small Arrow Button */}
                            <span className="w-[17.5px] h-[17.5px] bg-white rounded-full flex items-center justify-center border border-gray-400">
                                <ArrowUpRight size={12} className="text-[#4B0082]" />
                            </span>
                        </button>
                    </div>
                ))}
            </div>
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-center">
                <p
                    className="font-[Supreme] font-normal text-[18px] leading-[30.42px] tracking-[-0.5px] text-black"
                >
                    {new Date().getFullYear()} Codesquarry. All rights reserved.
                </p>
            </div>
        </div>
    );
};

export default HomePage;
