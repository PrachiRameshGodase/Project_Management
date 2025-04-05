"use client";
import React, { useEffect, useState } from "react";
import { OutsideClick } from "../OutsideClick/OutsideClick";
import { ChevronUp, ChevronDown } from "lucide-react";
import { OtherIcons } from "@/assests/icons";
import { statusOptions } from "../Helper/Helper";
import { Tooltip } from "@mui/material";

const Dropdown01 = ({ options, selectedValue, onSelect, label, icon }) => {
  const dropdownOutsideClick = OutsideClick();
  const [selected, setSelected] = useState("All"); // Ensure default selection

  const handleOptionSelect = (value) => {
    const newValue = value === "All" ? " " : value; // Convert "All" to an empty string
    onSelect(newValue);
    setSelected(newValue);
    dropdownOutsideClick.handleToggle();
  };


  return (
    <div className="relative" ref={dropdownOutsideClick?.ref}>
      <div
        className="h-[44px] flex items-center gap-2 border border-[#D8D8D8] hover:border-purple-500 hover:ring-2 hover:ring-purple-200 rounded-lg px-3 py-2 cursor-pointer"
        onClick={dropdownOutsideClick?.handleToggle}
        ref={dropdownOutsideClick?.buttonRef}
      >
        {icon}
        <span className="text-gray-700">{label}</span>
      </div>

      {dropdownOutsideClick?.isOpen && (
        <div className="absolute top-[100%] mt-2 bg-white shadow-lg border border-[#D8D8D8] rounded-lg w-[160px] z-50">
          <ul>
            {options.map((option) => (
              <li
                key={option}
                className={`flex items-center justify-between px-4 py-2 hover:bg-gray-100 cursor-pointer text-left ${selected === option ? "bg-gray-200" : ""
                  }`}
                onClick={() => handleOptionSelect(option)}
              >
                <span>{option}</span>

                {/* Always render the tick container, conditionally fill it */}
                <span className="w-5 h-5 flex items-center justify-center">
                  <span
                    className={`w-5 h-5 rounded-full flex items-center justify-center text-sm ${selected === option
                        ? "bg-blue-500 text-white"
                        : "invisible"
                      }`}
                  >
                    ✓
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>

  )
};
export default Dropdown01;


export const Dropdown001 = ({ options, selectedValue, onSelect, label, icon }) => {
  const dropdownOutsideClick = OutsideClick();
  const [selected, setSelected] = useState(selectedValue || null);
  const [searchTerm, setSearchTerm] = useState("");

  // Update selected state when selectedValue changes
  useEffect(() => {
    if (selectedValue) {
      // Ensure selectedValue is an object from options
      const foundOption = options?.find((opt) => opt.label === selectedValue);
      setSelected(foundOption || null);
    }
  }, [selectedValue, options]);

  const handleOptionSelect = (value) => {
    setSelected(value); // Store full object
    onSelect(value.label); // Pass only label
    dropdownOutsideClick.handleToggle(); // Close dropdown
  };

  const filteredOptions = options?.filter((option) =>
    option?.label?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative" ref={dropdownOutsideClick?.ref}>
      <div
        className="h-10 flex items-center justify-between gap-2 border border-[#0000004D] rounded-lg px-3 py-2 cursor-pointer w-[310px] sm:w-[350px] md:w-[400px]"
        onClick={dropdownOutsideClick?.handleToggle}
        ref={dropdownOutsideClick?.buttonRef}
      >
        <div className="flex items-center gap-2">
          {icon}
          <span className={`text-gray-400 ${selected ? "text-gray-700" : ""}`}>
            {selected?.label || label} {/* ✅ Fix: Show selected label */}
          </span>
        </div>
        <div className="ml-auto cursor-pointer">
          {dropdownOutsideClick?.isOpen ? (
            <ChevronUp className="w-4 h-4 text-gray-500" />
          ) : (
            <ChevronDown className="w-4 h-4 text-gray-500" />
          )}
        </div>
      </div>

      {dropdownOutsideClick?.isOpen && (
        <div className="absolute top-[100%] mt-2 bg-white shadow-lg border border-[#0000004D] rounded-lg w-[310px] sm:w-[350px] md:w-[400px] z-50">
          {/* Search Input */}
          <input
            type="text"
            className="w-full p-2 border-b border-gray-300 outline-none"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          {/* Dropdown Options */}
          <ul className="max-h-60 overflow-y-auto">
            {filteredOptions?.length > 0 ? (
              filteredOptions?.map((option) => (
                <li
                  key={option.id}
                  className={`flex px-4 py-2 hover:bg-gray-100 cursor-pointer text-left ${selected?.id === option?.id ? "bg-gray-200" : ""
                    }`}
                  onClick={() => handleOptionSelect(option)}
                >
                  {option?.label}
                </li>
              ))
            ) : (
              <li className="px-4 py-2 text-gray-500">No results found</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};


export const Dropdown0001 = ({ options, selectedValue, onSelect, label, icon }) => {
  const dropdownOutsideClick = OutsideClick();
  const [selected, setSelected] = useState(selectedValue);

  const handleOptionSelect = (value) => {
    onSelect(value);
    setSelected(value);
    dropdownOutsideClick.handleToggle();
  };

  return (
    <div className="relative" ref={dropdownOutsideClick?.ref}>
      <div
        className="h-[44px] flex items-center gap-2 border border-[#D8D8D8] hover:border-purple-500 hover:ring-2 hover:ring-purple-200 rounded-lg px-3 py-2 cursor-pointer"
        onClick={dropdownOutsideClick?.handleToggle}
        ref={dropdownOutsideClick?.buttonRef}
      >
        {icon}
        <span className="text-gray-700">
          {label}
        </span>
      </div>

      {dropdownOutsideClick?.isOpen && (
        <div className="absolute top-[100%] mt-2 bg-white shadow-lg border border-[#D8D8D8] rounded-lg w-[160px] z-50">
          <ul>
            {options.map((option) => (
              <li
                key={option.value}
                className={`flex items-center justify-between px-4 py-2 hover:bg-gray-100 cursor-pointer text-left ${selected === option.value ? "bg-gray-200" : ""
                  }`}
                onClick={() => handleOptionSelect(option.value)}
              >
                <span>{option.label}</span>
                <span className="w-5 h-5 flex items-center justify-center">
                  <span
                    className={`w-5 h-5 rounded-full flex items-center justify-center text-sm ${selected === option.value
                        ? "bg-blue-500 text-white"
                        : "invisible"
                      }`}
                  >
                    ✓
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};



export const DropdownStatus = ({ selectedValue, onSelect }) => {
  const dropdownOutsideClick = OutsideClick();


  const [selected, setSelected] = useState(
    statusOptions.find((option) => option.value === selectedValue) || null
  );

  const handleOptionSelect = (option) => {
    setSelected(option);
    onSelect(option.value);
    dropdownOutsideClick.handleToggle();
  };

  return (
    <div className="relative" ref={dropdownOutsideClick?.ref}>
      {/* Dropdown Button */}
      <Tooltip title={selected ? selected.label : "Status"} arrow disableInteractive>
        <div
          className={`h-[44px] flex items-center gap-2  border border-[#D8D8D8] hover:border-purple-500 hover:ring-2 hover:ring-purple-200  rounded-lg px-3 py-2 cursor-pointer w-[120px]`}
          onClick={dropdownOutsideClick?.handleToggle}
          ref={dropdownOutsideClick?.buttonRef}
        >
          {OtherIcons.user_svg}
          <span className={`text-gray-700 ${!selected ? "text-gray-400" : ""}`}>
            {selected ? selected.label : "Status"}
          </span>
        </div>
      </Tooltip>

      {/* Dropdown List */}
      {dropdownOutsideClick?.isOpen && (
        <div className="absolute top-[100%] mt-2 bg-white shadow-lg border border-[#D8D8D8] rounded-lg w-[150px] z-50">
          <ul>
            {statusOptions?.map((option) => (
              <li
                key={option.value}
                className={`flex px-4 py-2 hover:bg-gray-100 cursor-pointer text-left ${selected?.value === option.value ? "bg-gray-200" : ""
                  }`}
                onClick={() => handleOptionSelect(option)}
              >
                {option.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
