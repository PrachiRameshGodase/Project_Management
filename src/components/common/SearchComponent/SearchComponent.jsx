"use client";
import { useState } from "react";
import { OtherIcons } from "@/assests/icons";

const SearchComponent = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative">
            {/* Search Icon Button */}
            <div
                className={`${isOpen ? 'top-0 absolute sm:relative' : ''}  z-[999] bg-white w-[44px] h-[44px] flex items-center justify-center border border-purple-300 hover:border-purple-900  hover:shadow-lg hover:ring-purple-300 rounded-lg p-3 cursor-pointer`}
                onClick={() => setIsOpen(!isOpen)}
            >
                {!isOpen &&
                    <>
                        {OtherIcons.search_svg}
                    </>
                }
                {isOpen &&
                    <>
                        ❌
                    </>
                }
            </div>

            {/* Search Box Popup */}
            {isOpen && (
                <div className="absolute left-[-250px] sm:left-[-450px] top-0 w-[240px] sm:w-[440px]  bg-white shadow-lg border border-purple-300 rounded-lg">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-full p-2.5 border border-purple-300 rounded-md focus:outline-none hover:border-purple-700 focus:ring-2 focus:ring-purple-300"
                    />
                </div>
            )}
        </div>
    );
};

export default SearchComponent;
