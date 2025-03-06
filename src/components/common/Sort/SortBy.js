import { OtherIcons } from '@/assests/icons';
import React from 'react';

const SortBy = ({
    setSearchTrigger,
    selectedSortBy,
    setSelectedSortBy,
    sortOrder,
    setSortOrder,
    sortOptions,
    resetPageIfNeeded
}) => {

    const handleSort = (order) => {
        setSortOrder(order);
        setSelectedSortBy(sortOptions);
        resetPageIfNeeded();
        setSearchTrigger((prev) => prev + 1);
    };
    console.log("sortOrder", sortOrder)
    return (
        <span className="ml-2 flex flex-col gap-1">
            <button
                onClick={() => handleSort(1)}
                className={sortOrder == 1 ? 'text-red-500' : 'text-gray-500'}
            >
                {OtherIcons.arrow_up_svg}
            </button>
            <button
                onClick={() => handleSort(2)}
                className={sortOrder == 2 ? 'text-red-500' : 'text-gray-500'}
            >
                {OtherIcons.arrow_down_svg}
            </button>
        </span>
    );
};

export default SortBy;
