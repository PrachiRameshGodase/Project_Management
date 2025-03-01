"use client";
import { useState } from "react";
import { ChevronUp, ChevronDown, X } from "lucide-react"; // Import close icon
import { OutsideClick } from "../OutsideClick/OutsideClick";

export const Dropdown02 = ({ options, selectedValues, onSelect, label, icon }) => {
  const dropdownOutsideClick = OutsideClick();
  const [selected, setSelected] = useState(selectedValues || []); // Store selected options

  // Handle select/deselect option
  const handleOptionSelect = (value) => {
    let updatedSelection;
    if (selected.includes(value)) {
      updatedSelection = selected.filter((item) => item !== value); // Deselect if already selected
    } else {
      updatedSelection = [...selected, value]; // Select new option
    }
    setSelected(updatedSelection);
    onSelect(updatedSelection); // Pass updated values
  };

  // Remove selected item from list
  const removeSelected = (value) => {
    const updatedSelection = selected.filter((item) => item !== value);
    setSelected(updatedSelection);
    onSelect(updatedSelection);
  };

  return (
    <div className="relative w-[350px]" ref={dropdownOutsideClick?.ref}>
      {/* Dropdown Header */}
      <div
        className="h-auto min-h-10 flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-2 cursor-pointer w-full flex-wrap"
        ref={dropdownOutsideClick?.buttonRef}
        onClick={dropdownOutsideClick?.handleToggle}
      >
        <div className="flex items-center gap-2 flex-wrap">
          {icon}
          {/* Show selected items as pills */}
          {selected.length > 0 ? (
            selected.map((item) => (
              <div
                key={item}
                className="flex items-center bg-gray-200 text-gray-700 rounded-md px-2 py-1 text-sm"
              >
                {item}
                <X
                  className="w-4 h-4 ml-2 cursor-pointer text-gray-500 hover:text-gray-700"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeSelected(item);
                  }}
                />
              </div>
            ))
          ) : (
            <span className="text-gray-700">{label}</span>
          )}
        </div>

        {/* Arrow Icon (Right-Aligned & Clickable) */}
        <div className="ml-auto cursor-pointer" onClick={dropdownOutsideClick?.handleToggle}>
          {dropdownOutsideClick?.isOpen ? (
            <ChevronUp className="w-4 h-4 text-gray-500" onClick={dropdownOutsideClick?.handleToggle} />
          ) : (
            <ChevronDown className="w-4 h-4 text-gray-500" onClick={dropdownOutsideClick?.handleToggle} />
          )}
        </div>
      </div>

      {/* Dropdown Menu */}
      {dropdownOutsideClick?.isOpen && (
        <div className="absolute top-[100%] mt-2 bg-white shadow-lg border border-gray-300 rounded-lg w-full z-50">
          <ul>
            {options.map((option) => (
              <li
                key={option}
                className={`flex px-4 py-2 hover:bg-gray-100 cursor-pointer text-left ${selected.includes(option) ? "bg-gray-200" : ""
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
