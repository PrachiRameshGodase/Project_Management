"use client"
import { useState, useEffect } from "react";

const useUserData = () => {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const storedData = localStorage.getItem("UserData");
        if (storedData) {
            setUserData(JSON.parse(storedData));
        }
    }, []);

    return userData;
};

export default useUserData;
