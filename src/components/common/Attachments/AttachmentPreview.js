import React, { useState } from "react";
import { PhotoProvider, PhotoView } from "react-photo-view";
import { Download, EllipsisVertical, Trash2 } from "lucide-react";
import Image from "next/image";

const AttachmentPreview = ({ files }) => {
  const [hovered, setHovered] = useState(null);

  // Function to determine file preview type based on MIME type
  const getFileIcon = (fileType) => {
    if (!fileType) return "/file.png"; // Default generic file icon

    if (fileType.startsWith("image/")) {
      return "image"; // Indicating it's an image
    } else if (fileType === "application/pdf") {
      return "/pdf.png"; // PDF icon
    } else if (
      fileType === "application/msword" ||
      fileType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      return "/word.png"; // Word icon
    } else if (
      fileType === "application/vnd.ms-excel" ||
      fileType === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ) {
      return "/excel.png"; // Excel icon
    } else if (
      fileType === "application/zip" ||
      fileType === "application/x-rar-compressed"
    ) {
      return "/zip.png"; // ZIP or RAR icon
    } else {
      return "/file.png"; // Generic file icon
    }
  };

  return (
    <PhotoProvider>
      <div className="flex flex-wrap justify-center gap-2 my-2">
        {files.map((file, index) => {
          if (!file.url) return null;

          const fileType = getFileIcon(file.type);

          return (
            <div
              key={index}
              className="relative w-[85px] h-[90px] border-2 border-gray-100 rounded-md p-[5px]"
            >
              {fileType === "image" ? (
                <PhotoView src={file.url}>
                  <img
                    src={file.url}
                    alt={file.name}
                    className="w-full h-full object-cover rounded-lg cursor-pointer"
                  />
                </PhotoView>
              ) : (
                <>
                  <div className="flex justify-between">
                    <img src={fileType} alt="" className="w-[80px] bg-gray-50 rounded-sm cursor-pointer"  onClick={() => window.open(file.url, "_blank")}/>
                    <EllipsisVertical
                      className="cursor-pointer"
                      onClick={() => window.open(file.url, "_blank")}
                      // onClick={() => setHovered(hovered === index ? null : index)}
                    />
                  </div>
                  {/* <p className="text-[12px] truncate">{file.name}</p> */}
                  {/* <span className="text-[12px] text-gray-500">{file.type}</span> */}

                  {hovered === index && (
                    <div className="absolute -bottom-6 right-2 bg-white shadow-lg rounded-lg p-2 flex gap-2">
                      <a href={file.url} download className="p-2 hover:text-blue-500">
                        <Download size={18} />
                      </a>
                      {/* <button className="p-2 hover:text-red-500">
                        <Trash2 size={18} />
                      </button> */}
                    </div>
                    
                  )}
                </>
              )}
            </div>
          );
        })}
      </div>
    </PhotoProvider>
  );
};

export default AttachmentPreview;
