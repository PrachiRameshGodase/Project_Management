import { useEffect, useState } from "react";
import { OutsideClick } from "../OutsideClick/OutsideClick";
import { ChevronDown, ChevronUp } from "lucide-react"; // Import arrow icons
import useUserData from "../Helper/useUserData";

const DropdownStatus01 = ({
  options = [],
  selectedValue = "",
  onSelect,
  label = "Select",
  icon = null,
  className = "",
}) => {
  const dropdownOutsideClick = OutsideClick();
  const userData = useUserData();
  const [selected, setSelected] = useState(selectedValue);

  const handleOptionSelect = (value) => {
    setSelected(value);
    if (onSelect) onSelect(value); // Ensure onSelect callback is executed
    dropdownOutsideClick.handleToggle();
  };

  // Dynamically set color based on selected status
  const getStatusColor = (status) => {
    switch (status) {
      case "To Do":
        return "#6C757D"; // Gray
      case "In Progress":
        return "#CA9700"; // Yellow
      case "Completed":
        return "#008053"; // Green
      case "Under Review":
        return "#0D4FA7"; // Blue
      default:
        return "gray"; // Default color
    }
  };

  // Sync state when selectedValue changes
  useEffect(() => {
    setSelected(selectedValue);
  }, [selectedValue]);
  return (
    <div
      className={`relative mb-2 ${className}`}
      ref={dropdownOutsideClick?.ref}
    >
      <div
        className={`h-[34px] w-full flex items-center justify-between gap-2 border rounded-lg px-3 cursor-pointer transition-all duration-200
          ${
            selected
              ? `border-[${getStatusColor(selected)}] text-[${getStatusColor(
                  selected
                )}]  border border-[#D8D8D8] hover:border-purple-500 hover:ring-2 hover:ring-purple-200 `
              : "border-[#D8D8D8] text-gray-700 hover:border-purple-500 hover:ring-2 hover:ring-purple-200"
          }`}
        onClick={
          userData?.is_client === 0
            ? dropdownOutsideClick?.handleToggle
            : undefined
        }
        ref={dropdownOutsideClick?.buttonRef}
      >
        {icon}
        <span className={`${!selected ? "text-gray-400" : ""}`}>
          {selected || selectedValue}
        </span>

        {/* Up & Down arrow toggle button with dynamic color */}
        {userData?.is_client == 0 && (
          <button type="button" onClick={dropdownOutsideClick?.handleToggle}>
            {dropdownOutsideClick?.isOpen ? (
              <ChevronUp
                size={16}
                className={`text-[${getStatusColor(selected)}] `}
              />
            ) : (
              <ChevronDown
                size={16}
                className={`text-[${getStatusColor(selected)}]`}
              />
            )}
          </button>
        )}
      </div>

      {dropdownOutsideClick?.isOpen && (
        <div className="absolute top-[100%] mt-1 bg-white shadow-lg border border-gray-300 rounded-lg min-w-[110px] w-[150px] z-50">
          <ul>
            {options.map((option, index) => (
              <li
                key={index}
                className={`font-[400] text-[14px] leading-[16.8px] rounded flex items-center justify-start pl-2 cursor-pointer transition-all duration-200
                  ${`text-[${getStatusColor(option)}] h-[35px] hover:shadow-md`}
                  ${selected === option ? "bg-opacity-50" : ""}`}
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
