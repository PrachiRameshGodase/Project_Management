import React, { useState } from "react";
import { OutsideClick } from "../OutsideClick/OutsideClick";
import { ChevronUp, ChevronDown } from "lucide-react";

const Dropdown01 = ({ options, selectedValue, onSelect, label, icon }) => {
  const dropdownOutsideClick = OutsideClick();
  const [selected, setSelected] = useState(selectedValue || ""); // Ensure default selection

  const handleOptionSelect = (value) => {
    onSelect(value);
    setSelected(value);
    dropdownOutsideClick.handleToggle();
  };

  return (
    <div className="relative" ref={dropdownOutsideClick?.ref}>
      <div
        className={`h-[44px] flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-2 cursor-pointer ${
          label === "Designation"
            ? "w-[140px]"
            : label === "Sort By"
            ? "w-[110px]"
            : label === "Task Type"
            ? "w-[120px]" // Fixed incorrect "W-[120px]" to "w-[120px]"
            : "w-[100px]"
        }`}
        onClick={dropdownOutsideClick?.handleToggle}
        ref={dropdownOutsideClick?.buttonRef}
      >
        {icon}
        <span className={`text-gray-700 ${!selected ? "text-gray-400" : ""}`}>
          {selected || label}
        </span>
      </div>

      {dropdownOutsideClick?.isOpen && (
        <div className="absolute top-[100%] mt-2 bg-white shadow-lg border border-gray-300 rounded-lg w-[150px] z-50">
          <ul>
            {options.map((option) => (
              <li
                key={option}
                className={`flex px-4 py-2 hover:bg-gray-100 cursor-pointer text-left ${
                  selected === option ? "bg-gray-200" : ""
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
export default Dropdown01;


export const Dropdown001 = ({ options, selectedValue, onSelect, label, icon }) => {
  const dropdownOutsideClick = OutsideClick();
  const [selected, setSelected] = useState(selectedValue || ""); // Store selected option

  const handleOptionSelect = (value) => {
    setSelected(value);
    onSelect(value);
    dropdownOutsideClick.handleToggle(); // Close dropdown after selection
  };

  return (
    <div className="relative" ref={dropdownOutsideClick?.ref}>
      <div
        className="h-10 flex items-center justify-between gap-2 border border-gray-300 rounded-lg px-3 py-2 cursor-pointer w-[350px]"
        onClick={dropdownOutsideClick?.handleToggle}
        ref={dropdownOutsideClick?.buttonRef}
      >
        <div className="flex items-center gap-2">
          {icon}
          <span className={`text-gray-700 ${!selected ? "text-gray-400" : ""}`}>
            {selected || label}
          </span>
        </div>
        {/* Dynamic Arrow Icon */}
        <div className="ml-auto cursor-pointer" onClick={dropdownOutsideClick?.handleToggle}>
          {dropdownOutsideClick?.isOpen ? (
            <ChevronUp className="w-4 h-4 text-gray-500" />
          ) : (
            <ChevronDown className="w-4 h-4 text-gray-500" />
          )}
        </div>
      </div>

      {/* Dropdown Menu */}
      {dropdownOutsideClick?.isOpen && (
        <div className="absolute top-[100%] mt-2 bg-white shadow-lg border border-gray-300 rounded-lg w-[350px] z-50">
          <ul>
            {options.map((option) => (
              <li
                key={option}
                className={`flex px-4 py-2 hover:bg-gray-100 cursor-pointer text-left ${
                  selected === option ? "bg-gray-200" : ""
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
