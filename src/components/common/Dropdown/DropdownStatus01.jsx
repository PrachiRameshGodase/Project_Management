import { useEffect, useState } from "react";
import { OutsideClick } from "../OutsideClick/OutsideClick";
import { ChevronDown, ChevronUp } from "lucide-react"; // Import arrow icons

const DropdownStatus01 = ({
  options = [],
  selectedValue = "",
  onSelect,
  label = "Select",
  icon = null,
  className = "",
}) => {
  const dropdownOutsideClick = OutsideClick();
  const [selected, setSelected] = useState(selectedValue);

  // Sync state when selectedValue changes
  useEffect(() => {
    setSelected(selectedValue);
  }, [selectedValue]);

  const handleOptionSelect = (value) => {
    setSelected(value);
    if (onSelect) onSelect(value); // Ensure onSelect callback is executed
    dropdownOutsideClick.handleToggle();
  };

  return (
    <div
      className={`relative mb-2 ${className}`}
      ref={dropdownOutsideClick?.ref}
    >
      <div
        className={`h-[34px] w-fit flex items-center justify-between gap-2 border rounded-lg px-3 cursor-pointer transition-all duration-200
    ${
      selected === "To Do"
        ? "border-[#6C757D] text-[#6C757D] hover:bg-[#6C757D] hover:text-white"
        : selected === "In Progress"
        ? "border-[#CA9700] text-[#CA9700] hover:bg-[#CA9700] hover:text-white"
        : selected === "Completed"
        ? "border-[#008053] text-[#008053] hover:bg-[#008053] hover:text-white"
        : selected === "Under Review"
        ? "border-[#0D4FA7] text-[#0D4FA7] hover:bg-[#0D4FA7] hover:text-white"
        : "border-gray-300 text-gray-700 hover:border-purple-500 hover:ring-2 hover:ring-purple-200"
    }
  `}
        onClick={dropdownOutsideClick?.handleToggle}
        ref={dropdownOutsideClick?.buttonRef}
      >
        {icon}
        <span className={`${!selected ? "text-gray-400" : ""}`}>
          {selectedValue || label}
        </span>

        {/* Up & Down arrow toggle button */}
        <button type="button" onClick={dropdownOutsideClick?.handleToggle}>
          {dropdownOutsideClick?.isOpen ? (
            <ChevronUp size={16} className="text-gray-500" />
          ) : (
            <ChevronDown size={16} className="text-gray-500" />
          )}
        </button>
      </div>

      {dropdownOutsideClick?.isOpen && (
        <div className="absolute top-[100%] mt-1 bg-white shadow-lg border border-gray-300 rounded-lg min-w-[110px] w-[150px] z-50">
          <ul>
            {options.map((option, index) => (
              <li
                key={index}
                className={`font-[400] text-[14px] leading-[16.8px] rounded flex items-center justify-start pl-2 cursor-pointer transition-all duration-200
    ${
      option === "To Do"
        ? `text-[#6C757D]  h-[35px] hover:bg-[#6C757D] hover:text-white`
        : option === "In Progress"
        ? `text-[#CA9700]  h-[35px] hover:bg-[#CA9700] hover:text-white`
        : option === "Completed"
        ? `text-[#008053]  h-[35px] hover:bg-[#008053] hover:text-white`
        : `text-[#0D4FA7]  h-[35px] hover:bg-[#0D4FA7] hover:text-white`
    }
    ${selected === option ? "bg-opacity-50" : ""}
  `}
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
