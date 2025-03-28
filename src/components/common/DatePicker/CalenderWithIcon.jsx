import { useRef } from "react";
import { Calendar } from "lucide-react";

const DatePickerWithIcon = ({ date, handleDateChange }) => {
    const dateInputRef = useRef(null);

    const openDatePicker = () => {
        dateInputRef.current.showPicker();
    };

    return (
        <div className="flex items-center justify-center">
            {/* Conditionally Show Date or Icon */}
            {date ? (
                <span 
                    className="text-gray-800 text-[14px] font-medium cursor-pointer"
                    onClick={openDatePicker}
                >
                    {date}
                </span>
            ) : (
                <button
                    type="button"
                    onClick={openDatePicker}
                    className="p-2 rounded-full bg-gray-200 hover:bg-gray-300"
                >
                    <Calendar className="w-5 h-5 text-gray-600" />
                </button>
            )}
            
            {/* Hidden Date Input */}
            <input
                type="date"
                value={date || ""}
                onChange={handleDateChange}
                ref={dateInputRef}
                className="absolute opacity-0 w-0 h-0"
            />
        </div>
    );
};

export default DatePickerWithIcon;
