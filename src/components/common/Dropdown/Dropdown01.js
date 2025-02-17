import React, { useState } from "react";
import { OutsideClick } from "../OutsideClick/OutsideClick";

const Dropdown01 = ({ options, selectedValue, onSelect, label, icon }) => {
  const dropdownOutsideClick = OutsideClick()

  const handleOptionSelect = (value) => {
    onSelect(value);
    dropdownOutsideClick.handleToggle();
  };


  return (
    <div className="relative" ref={dropdownOutsideClick?.ref}>
      <div
        className={`h-[40px] flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-2 cursor-pointer ${label === "Designation" ? "w-[130px]" : "w-[110px]"
          }`}
        onClick={dropdownOutsideClick?.handleToggle}
        ref={dropdownOutsideClick?.buttonRef}
      >
        {icon}
        <span>{label}</span>
      </div>

      {dropdownOutsideClick?.isOpen && (
        <div className="absolute top-[100%] mt-2 bg-white shadow-lg border border-gray-300 rounded-lg w-[150px] z-50">
          <ul>
            {options.map((option) => (
              <li
                key={option}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
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

export default Dropdown01;

export const Dropdown001 = ({ options, selectedValue, onSelect, label, icon }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownOutsideClick = OutsideClick()



  const handleOptionSelect = (value) => {
    onSelect(value);
    dropdownOutsideClick.handleToggle();

  };

  return (
    <div className="relative" ref={dropdownOutsideClick?.ref}>
      <div
        className={`h-10 flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-2 cursor-pointer ${label === "Designation" ? "w-[350px]" : "w-[350px]"
          }`}
        onClick={dropdownOutsideClick?.handleToggle}
        ref={dropdownOutsideClick?.buttonRef}
      >
        {icon}
        <span className="text-gray-400">{selectedValue || label}</span>
      </div>

      {dropdownOutsideClick?.isOpen && (
        <div className="absolute top-[100%] mt-2 bg-white shadow-lg border border-gray-300 rounded-lg w-[350px] z-50">
          <ul>
            {options.map((option) => (
              <li
                key={option}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
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
