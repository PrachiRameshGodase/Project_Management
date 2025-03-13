"use client"
import { useState, useEffect } from 'react';

const useFetchOnMount = (fetchFunction, section) => {
    const [searchTrigger, setSearchTrigger] = useState(0);

    useEffect(() => {
        if (searchTrigger) {
            fetchFunction(); // Trigger the fetch
        } else {
            setSearchTrigger((prev) => prev + 1); // Set to true after first render to avoid immediate fetch
        }
    }, [searchTrigger, fetchFunction, section]);

    return searchTrigger;
};

export default useFetchOnMount;
