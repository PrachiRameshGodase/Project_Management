import { useEffect, useState } from "react";
import { ChevronDown, ChevronUp, X, Search } from "lucide-react";
import { OutsideClick } from "../OutsideClick/OutsideClick"; // Ensure this is properly implemented
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "@/app/store/userSlice";
import { useDebounceSearch } from "../Helper/HelperFunction";

export const Dropdown02 = ({ options, selectedValues, onSelect, label, icon }) => {
  const dropdownOutsideClick = OutsideClick();
  const [selected, setSelected] = useState(selectedValues || []); // Store selected options
  const [searchQuery, setSearchQuery] = useState(""); // Store search input

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

  // Filter options based on search query
  const filteredOptions = options?.filter((option) =>
    option.toLowerCase().includes(searchQuery.toLowerCase())
  );
  useEffect(() => {
    setSelected(Array.isArray(selectedValues) ? selectedValues : []);
  }, [selectedValues]);


  return (
    <div className="relative w-[310px] sm:w-[350px] md:w-[400px]  " ref={dropdownOutsideClick?.ref}>
      {/* Dropdown Header */}
      <div
        className="h-auto min-h-10 flex items-center gap-2 border border-[#0000004D] rounded-lg px-3 py-2 cursor-pointer w-full flex-wrap"
        ref={dropdownOutsideClick?.buttonRef}
        onClick={dropdownOutsideClick?.handleToggle}
      >
        <div className="flex items-center gap-2 flex-wrap">
          {icon}
          {/* Show selected items as pills */}
          {selected?.length > 0 ? (
            selected?.map((item) => (
              <div
                key={item}
                className={`flex items-center bg-gray-200 text-gray-700 rounded-md px-2 py-1 text-sm }`}
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
            <span className="text-gray-400">{label}</span>
          )}
        </div>

        {/* Arrow Icon (Right-Aligned & Clickable) */}
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
        <div className="absolute top-[100%] mt-1 bg-white shadow-lg border border-gray-200 rounded-lg w-full z-50 mb-4">
          {/* Search Bar */}
          <div className="flex items-center border-b border-[#0000004D] px-3 py-2">
            <Search className="w-4 h-4 text-gray-500 mr-2" />
            <input
              type="text"
              className="w-full outline-none text-sm"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Options List (Scrollable) */}
          <ul className="max-h-60 overflow-y-auto">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <li
                  key={option}
                  className={`flex px-4 py-2 hover:bg-gray-100 cursor-pointer text-left ${selected.includes(option) ? "bg-gray-200" : ""
                    }`}
                  onClick={() => handleOptionSelect(option)}
                >
                  {option}
                </li>
              ))
            ) : (
              <li className="px-4 py-2 text-gray-500 text-sm">No results found</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export const Dropdown002 = ({ selectedValue, onSelect, label, project_id }) => {
  
  const dropdownOutsideClick = OutsideClick();
  const dispatch = useDispatch();
  const usersList = useSelector((state) => state.user?.employeeList?.data);
console.log("usersList", usersList)
  const [selected, setSelected] = useState(selectedValue);
  const [searchQuery, setSearchQuery] = useState("");
 
  
   // Debounce function for search
   const debouncedSearch = useDebounceSearch(() => {
    dispatch(fetchUsers({ is_employee: 1, search: searchQuery, project_id:project_id , status:0}));
  }, 800);

  // Trigger API call when searchQuery changes, but with debounce
  useEffect(() => {
    debouncedSearch();
    
  }, [searchQuery, project_id]);

  const handleOptionSelect = (option) => {
    setSelected((prev) => {
      const isAlreadySelected = prev.some((user) => user.id === option.id);
      const updatedSelection = isAlreadySelected
        ? prev.filter((user) => user.id !== option.id)
        : [...prev, option];
  
      onSelect(updatedSelection.map((user) => user.id)); // Ensure `onSelect` gets an array of IDs
      return updatedSelection;
    });
  };
  

  const removeSelected = (id) => {
    const updatedSelection = selected.filter((user) => user.id !== id);
    setSelected(updatedSelection);
    onSelect(updatedSelection.map((user) => user.id)); // Ensure only IDs are passed
  };
  
  useEffect(() => {
   
  
    if (
      Array.isArray(selectedValue) &&
      selectedValue.length > 0 &&
      usersList?.length > 0
    ) {
      const selectedUsers = usersList.filter((user) => selectedValue.includes(user.id));
  
      if (JSON.stringify(selectedUsers) !== JSON.stringify(selected)) {
        setSelected(selectedUsers);
      }
    }
  }, [selectedValue, usersList]);
  
  
  

 console.log("selected", selected)
  return (
    <div className="relative w-[310px] sm:w-[350px] md:w-[400px]" ref={dropdownOutsideClick?.ref}>
      <div
        className="h-auto min-h-10 flex items-center gap-2 border border-gray-400 rounded-lg px-3 py-2 cursor-pointer w-full flex-wrap"
        ref={dropdownOutsideClick?.buttonRef}
        onClick={dropdownOutsideClick?.handleToggle}
      >
        <div className="flex items-center gap-2 flex-wrap">
          {selected?.length > 0 ? (
            selected?.map((user, index) => (
              <div key={user?.id || `option-${index}`} className="flex items-center bg-gray-200 rounded-md px-2 py-1">
                {user?.name}
                <span
                  className="w-4 h-4 ml-2 cursor-pointer text-gray-500 hover:text-gray-700"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeSelected(user.id);
                  }}
                >
                  ✕
                </span>
              </div>
            ))
          ) : (
            <span className="text-gray-400">{label}</span>
          )}
        </div>
        <div className="ml-auto cursor-pointer" onClick={dropdownOutsideClick?.handleToggle}>
          {dropdownOutsideClick?.isOpen ? <ChevronUp className="w-4 h-4 text-gray-500" /> : <ChevronDown className="w-4 h-4 text-gray-500" />}
        </div>
      </div>
      {dropdownOutsideClick?.isOpen && (
        <div className="absolute top-[100%] mt-1 bg-white shadow-lg border border-gray-200 rounded-lg w-full z-50 mb-4">
          <div className="flex items-center border-b border-gray-400 px-3 py-2">
            <Search className="w-4 h-4 text-gray-500 mr-2" />
            <input
              type="text"
              className="w-full outline-none text-sm"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <ul className="max-h-60 overflow-y-auto">
            {usersList?.length > 0 ? (
              usersList?.map((option,index) => (
                <li
                  key={option?.id || `option-${index}`}
                  className={`flex px-4 py-2 hover:bg-gray-100 cursor-pointer ${selected.some((user) => user.id === option.id) ? "bg-gray-200" : ""}`}
                  onClick={() => handleOptionSelect(option)}
                >
                  {option?.name}
                </li>
              ))
            ) : (
              <p className="px-4 py-2 text-gray-500 text-sm">No results found</p>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

