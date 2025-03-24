'use client';
import { useEffect, useState } from 'react';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';
import { storage, ref, uploadBytesResumable, getDownloadURL, deleteObject } from '../../../configs/firebase';

const FileUpload = ({ onFilesChange ,initialFiles}) => {
    const [files, setFiles] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (initialFiles) {
            setFiles(initialFiles);
        }
    }, [initialFiles]);

    const handleFileChange = async (e) => {
        const selectedFiles = Array.from(e.target.files);
        if (selectedFiles.length === 0) return;

        setUploading(true);
        setProgress(0);

        const uploadedFiles = await Promise.all(
            selectedFiles.map(async (file) => {
                const storageRef = ref(storage, `uploads/${file.name}`);
                const uploadTask = uploadBytesResumable(storageRef, file);

                return new Promise((resolve, reject) => {
                    uploadTask.on(
                        "state_changed",
                        (snapshot) => {
                            const percent = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                            setProgress(percent);
                        },
                        (error) => reject(error),
                        async () => {
                            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                            resolve({ name: file.name, url: downloadURL, type: file.type });
                        }
                    );
                });
            })
        );

        const updatedFiles = [...files, ...uploadedFiles];
        setFiles(updatedFiles);
        setUploading(false);
        setProgress(0);

        if (onFilesChange) {
            onFilesChange(updatedFiles);
        }
    };

    const handleDelete = async (fileName) => {
        const fileRef = ref(storage, `uploads/${fileName}`);
        await deleteObject(fileRef);

        const updatedFiles = files.filter(file => file.name !== fileName);
        setFiles(updatedFiles);
        if (onFilesChange) {
            onFilesChange(updatedFiles);
        }
    };

    return (
        <div className="w-[310px] sm:w-[350px] md:w-[400px] relative border-2 border-dashed border-[#0000004D] rounded-lg flex flex-col items-center justify-center group p-0">
            {uploading && (
                <div className="w-[98.5%] h-1 bg-gray-300 mt-0 rounded-md">
                    <div className="h-full bg-blue-600 transition-all" style={{ width: `${progress}%` }}></div>
                </div>
            )}
            <label className="h-10 w-full text-[12px] flex items-center justify-center text-center gap-2 cursor-pointer hover:bg-gray-100 transition rounded-lg">
                <input type="file" className="hidden" multiple accept="image/*,application/pdf" onChange={handleFileChange} />
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#000000" fill="none">
                    <path d="M6.93745 10C6.24652 10.0051 5.83076 10.0263 5.4996 10.114C3.99238 10.5131 2.96048 11.8639 3.00111 13.3847C3.01288 13.8252 3.18057 14.3696 3.51595 15.4585C4.32309 18.079 5.67958 20.3539 8.7184 20.8997C9.27699 21 9.90556 21 11.1627 21L12.8372 21C14.0943 21 14.7229 21 15.2815 20.8997C18.3203 20.3539 19.6768 18.079 20.4839 15.4585C20.8193 14.3696 20.987 13.8252 20.9988 13.3847C21.0394 11.8639 20.0075 10.5131 18.5003 10.114C18.1691 10.0263 17.7534 10.0051 17.0625 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M12 3L12 14M12 3C12.4683 3 12.8243 3.4381 13.5364 4.3143L14.5 5.5M12 3C11.5316 3 11.1756 3.4381 10.4635 4.3143L9.49995 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {uploading ? `Uploading... ${progress}%` : `Upload Files (${files.length})`}
            </label>


            {files.length > 0 && (
                <PhotoProvider>
                    <div className="flex flex-wrap justify-center gap-2 my-2">
                        {files?.map((file, index) => (
                            <div key={file?.name} className="relative w-20 h-20">
                                {file?.type?.startsWith("image/") ? (
                                    <PhotoView src={file.url}>
                                        <img src={file.url} alt={`Preview ${index + 1}`} className="w-full h-full object-cover rounded-lg cursor-pointer" />
                                    </PhotoView>
                                ) : (
                                    <a href={file.url} target="_blank" rel="noopener noreferrer" className="block w-full h-full bg-gray-200 flex items-center justify-center rounded-lg">
                                        <span className="text-sm text-gray-700 font-semibold">PDF</span>
                                    </a>
                                )}
                                <button
                                    type='button'
                                    onClick={() => handleDelete(file.name)}
                                    className="absolute top-1 right-1 bg-red-600 text-white p-[2px] rounded-full z-50 text-xs"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="12" height="12">
                                        <path d="M18 6L12 12M12 12L6 18M12 12L18 18M12 12L6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </button>
                            </div>
                        ))}
                    </div>
                </PhotoProvider>
            )}
        </div>
    );
};

export default FileUpload;