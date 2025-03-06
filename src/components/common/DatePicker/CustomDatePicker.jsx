"use client";

import { useEffect, useState } from "react";
import "./datepicker.css";
import { OtherIcons } from "@/assests/icons";

const CustomDatePicker = ({selectedDate, label = "Select Date", onChange }) => {
    const [date, setDate] = useState("");
    useEffect(() => {
        setDate(selectedDate); // Update state when selectedDate changes
    }, [selectedDate]);

    const handleDateChange = (e) => {
        setDate(e.target.value);
        if (onChange) onChange(e.target.value);
    };

    return (
        <div className="date-picker">
            <input
                type="date"
                value={date}
                onChange={handleDateChange}
                className="date-input"
            />
            <span className={`date-label ${date ? "hidden" : ""}`}>
                {label}
            </span>
            <span className="icon">{OtherIcons.calender_svg}</span>
        </div>
    );
};

export default CustomDatePicker;
