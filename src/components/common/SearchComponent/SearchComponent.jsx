"use client";
import { useState } from "react";
import { OtherIcons } from "@/assests/icons";

const SearchComponent = ({onSearch, section}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState(""); // Local state for search term
    const [searchCall, setSearchCall] = useState(false); // Local state to trigger search calls
  
    const handleSearch = (e) => {
        const term = e.target.value;
        setSearchTerm(term);
    
        const searchInput = document.getElementById("commonmcsearchbar");
        // Trigger the search action after a timeout
        setTimeout(() => {
          setSearchCall(!searchCall);
          onSearch(term); // Notify parent with the search term
        }, 1000);
    
        // Add or remove the "search-applied" class based on whether the search term is empty
    
        if (searchInput) {
          if (term) {
            searchInput.classList.add("search-applied");
          } else {
            searchInput.classList.remove("search-applied");
          }
        }
      };
    
      // Function to handle search when the icon is clicked
      const searchItems = () => {
        setSearchCall(!searchCall);
        onSearch(searchTerm); // Trigger search on icon click
      };

      const toggleSearch = () => {
        setIsOpen((prev) => !prev);
        if (isOpen) {
          // Reset search term when closing
          setSearchTerm("");
          onSearch(""); // Reset search
        }
      };
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
                    <span onClick={toggleSearch}>
                        ❌
                    </span>
                }
            </div>

            {/* Search Box Popup */}
            {isOpen && (
                <div className="absolute left-[-250px] sm:left-[-450px] top-0 w-[240px] sm:w-[440px]  bg-white shadow-lg border border-purple-300 rounded-lg">
                    <input
                       id="commonmcsearchbar"
                        type="text"
                        placeholder="Search..."
                        className="w-full p-2.5 border border-purple-300 rounded-md focus:outline-none hover:border-purple-700 focus:ring-2 focus:ring-purple-300"
                        onChange={handleSearch}
                    />
                </div>
            )}
        </div>
    );
};

export default SearchComponent;
