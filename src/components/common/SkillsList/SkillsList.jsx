"use client";
import { useState, useEffect } from "react";

const SkillsList = ({ skills }) => {
    const [maxVisible, setMaxVisible] = useState(4); // Default 4 skills show hongi
    const [showMore, setShowMore] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 400) {
                setMaxVisible(2);
            } else if (window.innerWidth < 600) {
                setMaxVisible(3);
            } else {
                setMaxVisible(4);
            }
        };

        handleResize(); // Initial run
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <li className="flex flex-wrap  items-center gap-2 w-[100%]">
            {/* <span className="opacity-70">Skills:</span> */}
            <span className="flex    flex-wrap gap-2 w-full   items-center">
                {(showMore ? skills : skills.slice(0, maxVisible)).map((skill, index) => (
                    <span key={index} className="bg-[#F0F0FF] py-1 px-3 rounded-full">
                        {skill}
                    </span>
                ))}
                {!showMore && skills.length > maxVisible && (
                    <button
                        onClick={() => setShowMore(true)}
                        className="bg-gray-200 px-3 py-1 w-[110px] rounded-full text-sm text-blue-600 hover:bg-gray-300"
                    >
                        + More Skills
                    </button>
                )}
            </span>
        </li>
    );
};

export default SkillsList;
