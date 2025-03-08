import React, { useState, useRef, useEffect } from "react";
import { Paperclip, Send, Trash2, Heart, Mic, PauseCircle, PlayCircle, MessageSquare } from "lucide-react";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";

import { format } from "date-fns";

const users = ["John", "Alice", "David", "Emma", "Aryan", "Prachi"]; // Dummy Users


const ChatBox = () => {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const [recording, setRecording] = useState(false);
    const [audioURL, setAudioURL] = useState(null);
    const [audioBlob, setAudioBlob] = useState(null);
    const [isChatOpen, setIsChatOpen] = useState(false);
    const fileInputRef = useRef(null);
    const mediaRecorderRef = useRef(null);
    const chatEndRef = useRef(null); // 🔥 Reference for Auto Scroll
    const [mentionList, setMentionList] = useState([]);

    const scrollToBottom = () => {
        requestAnimationFrame(() => {
            chatEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
        });
    };

    // Handle Input Change
    const handleInputChange = (e) => {
        const value = e.target.value;
        setMessage(e.target.value);
        setMessage(value);

        // Detect @mention
        if (value.includes("@")) {
            const searchText = value.split("@").pop().trim().toLowerCase();
            setMentionList(
                searchText
                    ? users.filter((user) => user.toLowerCase().startsWith(searchText))
                    : users
            );
        } else {
            setMentionList([]);
        }
    };

    // Select Mention
    const handleSelectMention = (user) => {
        setMessage(message.replace(/@\S*$/, `@${user} `));
        setMentionList([]);
    };

    // File Select
    const handleFileSelect = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile({ name: file.name, url: URL.createObjectURL(file), type: file.type.startsWith("image/") ? "image" : "document" });
        }
    };

    // Start Recording
    const startRecording = async () => {
        setRecording(true);
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;

        const chunks = [];
        mediaRecorder.ondataavailable = (e) => chunks.push(e.data);
        mediaRecorder.onstop = () => {
            const audioBlob = new Blob(chunks, { type: "audio/mp3" });
            setAudioBlob(audioBlob);
            setAudioURL(URL.createObjectURL(audioBlob));
        };

        mediaRecorder.start();
    };

    // Stop Recording
    const stopRecording = () => {
        setRecording(false);
        mediaRecorderRef.current.stop();
    };

    // Send Message
    const handleSend = () => {
        if (message.trim() === "" && !selectedFile && !audioBlob) return;

        const newMsg = {
            id: messages.length + 1,
            user: "You",
            text: message,
            file: selectedFile,
            audio: audioBlob ? { url: audioURL, blob: audioBlob } : null,
            time: format(new Date(), "h:mm a"), // 🕒 Format time like WhatsApp
            liked: false,
            deleted: false,
        };

        setMessages([...messages, newMsg]);
        setMessage("");
        setSelectedFile(null);
        setAudioURL(null);
        setAudioBlob(null);
        setMentionList([]);
        setTimeout(() => {
            scrollToBottom(); // 🔥 Auto Scroll
        }, 100);
        setTimeout(scrollToBottom, 50); // 
    };

    // useEffect(() => {
    //     setTimeout(scrollToBottom, 50);
    // }, [messages]);

    // Delete Message
    const handleDelete = (id) => {
        setMessages(
            messages.map((msg) => (msg.id === id ? { ...msg, text: "🗑️ Deleted by You", file: null, audio: null, deleted: true } : msg))
        );
    };

    // Like Message
    const handleLike = (id) => {
        setMessages(messages.map((msg) => (msg.id === id ? { ...msg, liked: !msg.liked } : msg)));
    };

    // 🔹 Highlight mentions in text
    const formatMessage = (text) => {
        return text.split(" ").map((word, index) =>
            word.startsWith("@") ? (
                <span key={index} className="text-blue-600 font-bold">{word}{" "}</span>
            ) : (
                word + " "
            )
        );
    };

    return (
        <div className="fixed bottom-5 ">
            {/* Floating Chat Icon */}
            <button
                className="bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 transition"
                onClick={() => setIsChatOpen(!isChatOpen)}
            >
                <MessageSquare size={24} />
            </button>

            {/* Chat Box */}
            {isChatOpen && (
                <div className="w-[360px] p-3 -mb-12  border rounded-lg shadow-lg bg-white fixed bottom-16 right-2">
                    <div className="flex justify-between items-center mb-2">
                        <h2 className="font-semibold">Chat</h2>
                        <button className="text-gray-500 hover:text-black" onClick={() => setIsChatOpen(false)}>
                            ✖
                        </button>
                    </div>



                    {/* Messages */}
                    <div className="space-y-3 max-h-60 overflow-y-auto " >
                        <PhotoProvider>
                            {messages.map((msg) => (
                                <div key={msg.id} className="flex gap-2 items-start group  ">
                                    <div className="bg-gray-100 p-2 rounded-lg w-fit max-w-[100%] relative">
                                        <span className="text-xs text-gray-500">{msg.time}</span>

                                        {/* Image Preview */}
                                        {msg.file && msg.file.type === "image" && !msg.deleted && (
                                            <PhotoView src={msg.file.url}>
                                                <img src={msg.file.url} alt="Uploaded" className="w-40 mt-2 rounded-md cursor-pointer" />
                                            </PhotoView>
                                        )}
                                        {/* Audio Player */}
                                        {msg.audio && !msg.deleted && (
                                            <audio controls className="mt-2 ">
                                                <source src={msg.audio.url} type="audio/mp3" />
                                            </audio>
                                        )}
                                        {/* Text Message */}
                                        {msg.text && <p className={`whitespace-pre-line  ${msg.deleted ? "italic text-gray-500" : ""}`}>{formatMessage(msg.text)}</p>}




                                        {/* Like & Delete */}
                                        <div className="absolute  -mt-2 top-2 right-1 hidden group-hover:flex gap-2">
                                            {!msg.liked && (
                                                <button className="text-gray-500 hover:text-red-500" onClick={() => handleLike(msg.id)}>
                                                    <Heart size={12} />
                                                </button>
                                            )}
                                            {msg.liked && <span className="text-red-500 text-[12px]">❤️</span>}
                                            <button className="text-gray-500 hover:text-red-500" onClick={() => handleDelete(msg.id)}>
                                                <Trash2 size={12} />
                                            </button>
                                        </div>


                                    </div>

                                </div>
                            ))}
                        </PhotoProvider>

                        <div ref={chatEndRef} />
                    </div>

                    {/* Input Field with File & Audio Preview */}

                    <div className="relative border rounded-lg p-1 mt-2 ">

                        <div className="flex items-center gap-2">
                            {/* Attach File */}
                            <button className="p-1  text-gray-500 hover:text-black" onClick={() => fileInputRef.current.click()}>
                                <Paperclip size={20} />
                            </button>
                            <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileSelect} />


                            {/* Text Input */}
                            <input
                                type="text"
                                className="flex-1 outline-none"
                                placeholder="Type a message..."
                                value={message}
                                onChange={handleInputChange}
                                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                            />


                            {/* Mic Button */}
                            {recording ? (
                                <button className="p-2 text-red-500" onClick={stopRecording}>
                                    <PauseCircle size={20} />
                                </button>
                            ) : (
                                <button className="p-2  text-gray-500 hover:text-black" onClick={startRecording}>
                                    <Mic size={20} />
                                </button>
                            )}

                            {/* Send Button */}
                            <button className="p-2 text-gray-500 hover:text-black" onClick={handleSend}>
                                <Send size={20} />
                            </button>

                            {/* Mention List Dropdown */}
                            {mentionList.length > 0 && (
                                <ul className="absolute -mt-56 max-h-[180px]  overflow-y-auto bg-white border rounded-md shadow-md w-full z-10">
                                    {mentionList.map((user, index) => (
                                        <li
                                            key={index}
                                            className="p-2 hover:bg-gray-100 cursor-pointer"
                                            onClick={() => handleSelectMention(user)}
                                        >
                                            @{user}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        {/* File & Audio Preview Inside Input Box */}
                        {selectedFile && (
                            <div className="mt-2 p-1 bg-gray-100 rounded-md flex items-center gap-2 relative">
                                {selectedFile.type === "image" ? (
                                    <PhotoProvider>
                                        <PhotoView src={selectedFile.url}>
                                            <img src={selectedFile.url} alt="Preview" className="w-12 h-12 rounded-md cursor-pointer" />
                                        </PhotoView>
                                    </PhotoProvider>
                                ) : (
                                    <span className="text-gray-700">{selectedFile.name}</span>
                                )}

                                {/* Delete Button */}
                                <button
                                    className="absolute top-0 right-0 p-1 text-gray-500 hover:text-red-500"
                                    onClick={() => setSelectedFile(null)}
                                >
                                    <Trash2 />
                                </button>
                            </div>
                        )}


                        {audioURL && (
                            <div className="mt-2 p-2  bg-gray-100 rounded-md flex items-center gap-2 relative">
                                <audio controls>
                                    <source src={audioURL} type="audio/mp3" />
                                    Your browser does not support audio playback.
                                </audio>

                                {/* Delete Button */}
                                <button
                                    className="absolute top-0 right-0 p-1 text-gray-500 hover:text-red-500"
                                    onClick={() => setAudioURL(null)}
                                >
                                    <Trash2 />
                                </button>

                            </div>
                        )}

                    </div>
                </div>
            )}
        </div>
    );
};

export default ChatBox;
// 