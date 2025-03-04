"use client";

import { useState } from "react";
import "./datepicker.css";
import { OtherIcons } from "@/assests/icons";

const CustomDatePicker = ({ label = "Select Date", onChange }) => {
    const [date, setDate] = useState("");

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
