import React, { useEffect, useState } from "react";
import { PhotoProvider, PhotoView } from "react-photo-view";

const AttachmentPreview = ({ files }) => {
  const [fileURLs, setFileURLs] = useState([]);
  // console.log('fileURLs :::', fileURLs)
  useEffect(() => {
    if (files?.length > 0) {
      const urls = files.map((file) => {
        if (file instanceof File) {
          return URL.createObjectURL(file);
        } else if (typeof file === "string") {
          return file; // Assume it's already a URL
        }
        return null;
      });

      setFileURLs(urls);

      // Cleanup
      return () => {
        urls.forEach((url) => {
          if (url?.startsWith("blob:")) URL.revokeObjectURL(url);
        });
      };
    }
  }, [files]);

  return (
    <>
      {fileURLs.length > 0 && (
        <PhotoProvider>
          <div className="flex flex-wrap justify-center gap-2 my-2">
            {fileURLs.map((fileURL, index) => {
              if (!fileURL) return null;

              const isImage = fileURL.match(/\.(jpeg|jpg|png|gif|webp)$/i);
              const isPDF = fileURL.endsWith(".pdf");

              return (
                <div key={index} className="relative w-14 h-14">
                  {isImage ? (
                    <PhotoView src={fileURL}>
                      <img
                        src={fileURL}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-full object-cover rounded-lg cursor-pointer"
                      />
                    </PhotoView>
                  ) : isPDF ? (
                    <a
                      href={fileURL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full h-full bg-gray-200 flex items-center justify-center rounded-lg"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="28"
                        height="28"
                        color="#4a4a4a"
                        fill="none"
                      >
                        <path
                          d="M20 13V10.6569C20 9.83935 20 9.4306 19.8478 9.06306C19.6955 8.69552 19.4065 8.40649 18.8284 7.82843L14.0919 3.09188C13.593 2.593 13.3436 2.34355 13.0345 2.19575C12.9702 2.165 12.9044 2.13772 12.8372 2.11401C12.5141 2 12.1614 2 11.4558 2C8.21082 2 6.58831 2 5.48933 2.88607C5.26731 3.06508 5.06508 3.26731 4.88607 3.48933C4 4.58831 4 6.21082 4 9.45584V13M13 2.5V3C13 5.82843 13 7.24264 13.8787 8.12132C14.7574 9 16.1716 9 19 9H19.5"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M19.75 16H17.25C16.6977 16 16.25 16.4477 16.25 17V19M16.25 19V22M16.25 19H19.25M4.25 22V19.5M4.25 19.5V16H6C6.9665 16 7.75 16.7835 7.75 17.75C7.75 18.7165 6.9665 19.5 6 19.5H4.25ZM10.25 16H11.75C12.8546 16 13.75 16.8954 13.75 18V20C13.75 21.1046 12.8546 22 11.75 22H10.25V16Z"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </a>
                  ) : null}
                </div>
              );
            })}
          </div>
        </PhotoProvider>
      )}
    </>
  );
};

export default AttachmentPreview;
