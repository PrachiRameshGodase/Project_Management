"use client";
import React from "react";
import { Tooltip } from "@mui/material";
import { useRouter } from "next/navigation";

const TruncatedTooltipText = ({ text, maxLength = 22 }) => {
    const router = useRouter();
    const isTruncated = text?.length > maxLength;
    const displayText = isTruncated ? text?.slice(0, maxLength) + "..." : text;

    return (
        <Tooltip title={isTruncated ? text : ""} arrow disableInteractive>
            <span
                className="cursor-pointer text-[12px] sm:text-[15px]"
                onClick={() => router.push("/project-details")}
            >
                {displayText}
            </span>
        </Tooltip>
    );
};

export default TruncatedTooltipText;
