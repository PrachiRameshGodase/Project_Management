import { useState } from "react";
import "./datepicker.css";

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
            <span className="date-label">{date ? date : label}</span>
            <span className="icon">📅</span>
        </div>
    );
};

export default CustomDatePicker;
