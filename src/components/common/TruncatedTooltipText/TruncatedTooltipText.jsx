"use client";
import React from "react";
import { Tooltip } from "@mui/material";
import { useRouter } from "next/navigation";

const TruncatedTooltipText = ({ text, maxLength = 22 }) => {
    const router = useRouter();
    const isTruncated = text?.length > maxLength; // Check if text needs truncation
    const displayText = isTruncated ? text?.slice(0, maxLength) + "..." : text;

    return isTruncated ? (
        <Tooltip title={text} arrow disableInteractive>
            <span
                className="cursor-cell"
                onClick={() => router.push("/project-details")}
            >
                {displayText}
            </span>
        </Tooltip>
    ) : (
        <span
            className="py-2 px-4 border-b border-gray-900 text-[20px] cursor-pointer"
            onClick={() => router.push("/project-details")}
        >
            {text}
        </span>
    );
};

export default TruncatedTooltipText;
