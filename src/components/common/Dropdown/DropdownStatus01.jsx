import { useState } from "react";
import { OutsideClick } from "../OutsideClick/OutsideClick";

const DropdownStatus01 = ({
    options = [],
    selectedValue = "",
    onSelect,
    label = "Select",
    icon = null,
    className = ""
}) => {
    const dropdownOutsideClick = OutsideClick();
    const [selected, setSelected] = useState(selectedValue);

    const handleOptionSelect = (value) => {
        setSelected(value);
        if (onSelect) onSelect(value); // Ensure onSelect callback is executed
        dropdownOutsideClick.handleToggle();
    };

    return (
        <div className={`relative ${className}`} ref={dropdownOutsideClick?.ref}>
            <div
                className="h-[44px] flex items-center gap-2 border border-gray-300 hover:border-purple-500 hover:ring-2 hover:ring-purple-200 rounded-lg px-3 py-2 cursor-pointer w-auto"
                onClick={dropdownOutsideClick?.handleToggle}
                ref={dropdownOutsideClick?.buttonRef}
            >
                {icon}
                <span className={`text-gray-700 ${!selected ? "text-gray-400" : ""}`}>
                    {selected || label}
                </span>
            </div>

            {dropdownOutsideClick?.isOpen && (
                <div className="absolute top-[100%] mt-2 bg-white shadow-lg border border-gray-300 rounded-lg min-w-[150px] w-auto z-50">
                    <ul>
                        {options.map((option, index) => (
                            <li
                                key={index}
                                className={`flex px-4 py-2 hover:bg-gray-100 cursor-pointer text-left ${selected === option ? "bg-gray-200" : ""
                                    }`}
                                onClick={() => handleOptionSelect(option)}
                            >
                                {option}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default DropdownStatus01;
