'use client';
import { useState } from 'react';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';

const FileUpload = ({ onFilesChange }) => {
    const [files, setFiles] = useState([]);

    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        setFiles([...files, ...selectedFiles]);
        if (onFilesChange) {
            onFilesChange([...files, ...selectedFiles]);
        }
    };
    // 🗑️ Delete image function
    const handleDelete = (index) => {
        const updatedFiles = files.filter((_, i) => i !== index);
        setFiles(updatedFiles);
        if (onFilesChange) {
            onFilesChange(updatedFiles);
        }
    };

    return (
        <div className="w-[350px] relative border-2 border-dashed border-gray-400 rounded-lg  flex items-center justify-center  group">
            <label className="h-10 w-full text-[12px] flex items-center justify-center text-center gap-2 cursor-pointer hover:bg-gray-100 transition rounded-lg">
                <input type="file" className="hidden" multiple onChange={handleFileChange} />
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#000000" fill="none">
                    <path d="M6.93745 10C6.24652 10.0051 5.83076 10.0263 5.4996 10.114C3.99238 10.5131 2.96048 11.8639 3.00111 13.3847C3.01288 13.8252 3.18057 14.3696 3.51595 15.4585C4.32309 18.079 5.67958 20.3539 8.7184 20.8997C9.27699 21 9.90556 21 11.1627 21L12.8372 21C14.0943 21 14.7229 21 15.2815 20.8997C18.3203 20.3539 19.6768 18.079 20.4839 15.4585C20.8193 14.3696 20.987 13.8252 20.9988 13.3847C21.0394 11.8639 20.0075 10.5131 18.5003 10.114C18.1691 10.0263 17.7534 10.0051 17.0625 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M12 3L12 14M12 3C12.4683 3 12.8243 3.4381 13.5364 4.3143L14.5 5.5M12 3C11.5316 3 11.1756 3.4381 10.4635 4.3143L9.49995 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>Upload Files ({files.length})</span>
            </label>

            {/* 👁️ Icon hover pe dikhna chahiye */}
            {files.length > 0 && (
                <div className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                    <PhotoProvider>
                        <PhotoView>
                            <div className="w-8 h-8 flex items-center justify-center bg-black text-white rounded-full">
                                👁️
                            </div>
                        </PhotoView>

                        {/* Sabhi images ko slider me show karne ke liye */}
                        {files.map((file, index) => (
                            <PhotoView key={index} src={URL.createObjectURL(file)}>
                                <div className="relative">
                                    {/* 🖼️ Image */}
                                    <img src={URL.createObjectURL(file)} alt={`Preview ${index + 1}`} className="hidden" />

                                    {/* 🗑️ Delete button (Slider ke andar image ke upar) */}
                                    {/* <button
                                        onClick={() => handleDelete(index)}
                                        className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full z-50"
                                    >
                                        ❌
                                    </button> */}
                                </div>
                            </PhotoView>
                        ))}
                    </PhotoProvider>
                </div>
            )}
        </div>
    );
};

export default FileUpload;
// 