"use client";
import React, { useState, useRef, useEffect } from "react";
import {
  Paperclip,
  Send,
  Trash2,
  Heart,
  Mic,
  PauseCircle,
  PlayCircle,
  MessageSquare,
  FileText,
} from "lucide-react";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import UserAvatar from "../UserAvatar/UserAvatar";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "@/app/store/userSlice";
import {
  addTaskComment,
  deleteTaskComment,
  fetchTaskComment,
} from "@/app/store/projectSlice";
import { formatTime } from "../Helper/Helper";
import TableSkeleton from "../TableSkeleton/TableSkeleton";
import {
  storage,
  ref,
  uploadBytes,
  uploadBytesResumable,
  getDownloadURL,
} from "../../../configs/firebase";

const ChatBox = ({ projectId, taskId }) => {
  const dispatch = useDispatch();
  const usersList = useSelector((state) => state.user?.employeeList?.data);
  const CommentListData = useSelector(
    (state) => state.project?.taskCommentList?.data
  );
  const CommentListLoading = useSelector((state) => state.project);

  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [recording, setRecording] = useState(false);
  const [audioURL, setAudioURL] = useState(null);
  const [audioBlob, setAudioBlob] = useState(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const fileInputRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const chatStartRef = useRef(null);
  const [mentionList, setMentionList] = useState([]);
  const [newMessageCount, setNewMessageCount] = useState(0);
  const chatContainerRef = useRef(null);
  const inputRef = useRef(null);
  const [searchTrigger, setSearchTrigger] = useState(0);

  const [uploading, setUploading] = useState(false);

  const [formData, setFormData] = useState({
    project_id: "",
    task_id: "",
    documents: [],
    audio_recording: "",
    assigned_ids: [],
    comments: "",
  });

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      project_id: projectId,
      task_id: taskId,
    }));
  }, [projectId, taskId]);

  const scrollToTop = () => {
    requestAnimationFrame(() => {
      chatStartRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  };

  // Handle Input Change
  const handleInputChange = (e) => {
    const value = e.target.value;

    setFormData((prev) => ({
      ...prev,
      comments: value, // ✅ Update formData.comments
    }));

    // Detect @mention
    if (value.includes("@")) {
      const searchText = value.split("@").pop().trim().toLowerCase();
      setMentionList(
        searchText
          ? usersList.filter((user) =>
              user.name.toLowerCase().startsWith(searchText)
            )
          : usersList
      );
    } else {
      setMentionList([]);
    }
  };

  const handleMentionClick = () => {
    setMessage((prev) => prev + "@");
    inputRef.current?.focus();

    const searchText = "";
    setMentionList(usersList);
  };

  // Select Mention
  const handleSelectMention = (user) => {
    setFormData((prev) => ({
      ...prev,
      assigned_ids: [...prev.assigned_ids, user.id], // ✅ Add selected user ID
    }));
    setMentionList([]);
  };

  // File Select

  // const handleFileSelect = (event) => {
  //   const file = event.target.files[0];
  //   if (!file) return;

  //   const newFile = {
  //     name: file.name,
  //     url: URL.createObjectURL(file),
  //     type: file.type.startsWith("image/") ? "image" : "document",
  //   };

  //   // ✅ Update formData with the new file
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     documents: newFile, // Store the file inside `documents`
  //   }));

  //   setSelectedFile(newFile); // Optional, if you need it elsewhere
  // };

  const handleFileSelect = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const newFile = {
      name: file.name,
      url: URL.createObjectURL(file),
      type: file.type.startsWith("image/") ? "image" : "document",
    };
    setSelectedFile(newFile); // Optional, if you need it elsewhere

    setUploading(true);

    const storageRef = ref(storage, `uploads/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      null,
      (error) => {
        console.error("Upload Error: ", error);
        setUploading(false);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

        // ✅ Firebase URL formData.documents me store karo
        setFormData((prevData) => ({
          ...prevData,
          documents: [
            ...prevData.documents,
            { name: file.name, url: downloadURL, type: file.type },
          ],
        }));

        setUploading(false);
      }
    );
  };
  console.log("form Data", formData);

  // Start Recording
  // const startRecording = async () => {
  //   setRecording(true);
  //   const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  //   const mediaRecorder = new MediaRecorder(stream);
  //   mediaRecorderRef.current = mediaRecorder;

  //   const chunks = [];
  //   mediaRecorder.ondataavailable = (e) => chunks.push(e.data);
  //   mediaRecorder.onstop = () => {
  //     const audioBlob = new Blob(chunks, { type: "audio/mp3" });
  //     const audioURL = URL.createObjectURL(audioBlob);

  //     setAudioBlob(audioBlob);
  //     setAudioURL(audioURL);

  //     // ✅ Store recording in `formData.audio_recording`
  //     setFormData((prevData) => ({
  //       ...prevData,
  //       audio_recording: audioBlob, // Storing the Blob
  //     }));
  //   };

  //   mediaRecorder.start();
  // };

  const startRecording = async () => {
    setRecording(true);
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorderRef.current = mediaRecorder;

    const chunks = [];
    mediaRecorder.ondataavailable = (e) => chunks.push(e.data);

    mediaRecorder.onstop = async () => {
      const audioBlob = new Blob(chunks, { type: "audio/mp3" });

      // 🔥 Upload to Firebase
      const storageRef = ref(storage, `recordings/audio-${Date.now()}.mp3`);
      const snapshot = await uploadBytes(storageRef, audioBlob);

      // ✅ Get URL from Firebase
      const audioURL = await getDownloadURL(snapshot.ref);

      setAudioBlob(audioBlob);
      setAudioURL(audioURL);

      // ✅ Store Firebase URL in `formData.audio_recording`
      setFormData((prevData) => ({
        ...prevData,
        audio_recording: audioURL, // Storing Firebase URL
      }));
    };

    mediaRecorder.start();
  };

  // Stop Recording
  const stopRecording = () => {
    setRecording(false);
    mediaRecorderRef.current.stop();
  };

  const handleSend = () => {
    dispatch(
      addTaskComment({
        formData,
        project_id: projectId,
        task_id: taskId,
        dispatch,
      })
    ).then((response) => {
      if (response?.data?.success == true)
        setFormData(() => ({
          project_id: "",
          task_id: "",
          documents: [],
          audio_recording: "",
          assigned_ids: [],
          comments: "",
        }));
    });

    setTimeout(() => {
      scrollToTop();
    }, 100);
  };

  // Delete Message
  const handleDelete = (id) => {
    dispatch(
      deleteTaskComment({
        id,
        project_id: projectId,
        task_id: taskId,
        dispatch,
      })
    );
  };

  // new sms
  useEffect(() => {
    const handleScroll = () => {
      if (chatContainerRef.current) {
        const { scrollTop } = chatContainerRef.current;
        if (scrollTop === 0) {
          setNewMessageCount(0); // Reset new message count when scrolled to top
        }
      }
    };

    chatContainerRef.current?.addEventListener("scroll", handleScroll);
    return () =>
      chatContainerRef.current?.removeEventListener("scroll", handleScroll);
  }, []);

  const user = JSON.parse(localStorage.getItem("UserData"));
  const handleRemoveMention = (id) => {
    setFormData((prev) => ({
      ...prev,
      assigned_ids: prev.assigned_ids.filter((assignedId) => assignedId !== id),
    }));
  };

  useEffect(() => {
    const sendData = {
      project_id: projectId,
      task_id: taskId,
    };

    dispatch(fetchTaskComment(sendData));
  }, [dispatch]);

  useEffect(() => {
    const sendData = {
      is_employee: 1,
    };

    dispatch(fetchUsers(sendData));
  }, [dispatch]);

  return (
    <div className=" ">
      <div className="w-full p-2  border rounded-lg shadow-lg bg-white  bottom-16 ">
        <div className="flex justify-between items-center mb-2">
          <h2 className="font-semibold">Comment</h2>
        </div>

        {/* Input Field with File & Audio Preview */}
        <div className="flex justify-between items-center  ">
          <div className="relative border w-full rounded-lg p-1 mb-2 ">
            <div className="flex items-center ">
              {/* Attach File */}
              <UserAvatar
                name={user?.name}
                dotcolor=""
                size={24}
                // image={"https://via.placeholder.com/24?text=💬"}
                isActive={user?.isActive}
              />
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                name="documents"
                onChange={handleFileSelect} // No "value" needed
              />

              {/* Text Input */}
              <input
                ref={inputRef}
                type="text"
                name="comments"
                className="flex-1 outline-none pl-1"
                placeholder="Type a message..."
                value={formData?.comments}
                onChange={handleInputChange}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
              />

              <button
                onClick={handleMentionClick}
                className="p-1 text-[26px] text-gray-500 hover:text-black cursor-pointer"
              >
                @
              </button>

              <button
                className={`p-1  text-gray-500 hover:text-black `}
                onClick={() => fileInputRef.current.click()}
              >
                <Paperclip size={22} />
              </button>
              {/* Mic Button */}
              {recording ? (
                <button className="p-2 text-red-500" onClick={stopRecording}>
                  <PauseCircle size={20} />
                </button>
              ) : (
                <button
                  className="p-1  text-gray-500 hover:text-black"
                  onClick={startRecording}
                >
                  <Mic size={24} />
                </button>
              )}

              {/* Mention List Dropdown */}
              {mentionList.length > 0 && (
                <ul className="absolute -mt-56 max-h-[180px]  overflow-y-auto bg-white border rounded-md shadow-md w-full z-10">
                  {mentionList.map((user, index) => (
                    <li
                      key={index}
                      className="p-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => handleSelectMention(user)}
                    >
                      @ {user?.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            {/* Send Button */}

            {/* File & Audio Preview Inside Input Box */}
            {selectedFile && (
              <div className="mt-2 p-1 bg-gray-100 rounded-md flex items-center gap-2 relative">
                {selectedFile.type === "image" ? (
                  <PhotoProvider>
                    <PhotoView src={selectedFile.url}>
                      <img
                        src={selectedFile.url}
                        alt="Preview"
                        className="w-fit h-14 rounded-md cursor-pointer"
                      />
                    </PhotoView>
                  </PhotoProvider>
                ) : (
                  <div className="text-gray-700 flex gap-1 cursor-pointer">
                    <FileText size={20} color="#292929" />
                    <a
                      href={selectedFile.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {selectedFile.name}
                    </a>
                  </div>
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
            {formData.assigned_ids.length > 0 && (
              <div className="flex flex-wrap mt-2">
                {formData.assigned_ids.map((id) => {
                  const user = usersList.find((u) => u.id === id);
                  return (
                    user && (
                      <span
                        key={id}
                        className="bg-blue-50 text-blue-400 px-2 py-1 rounded-lg m-1 text-sm flex items-center"
                      >
                        @ {user.name}
                        <button
                          onClick={() => handleRemoveMention(id)}
                          className="ml-1 text-red-700 text-xs"
                        >
                          <Trash2 size={12} />
                        </button>
                      </span>
                    )
                  );
                })}
              </div>
            )}
          </div>
          <button
            className=" text-gray-500 pl-2 hover:text-black"
            onClick={handleSend}
          >
            <Send size={20} />
          </button>
        </div>

        {/* Messages */}
        <div className="space-y-3 p-2  max-h-64 overflow-y-auto ">
          <PhotoProvider>
            <div ref={chatStartRef} />

            {CommentListLoading?.taskDetailsLoading ? (
              <TableSkeleton />
            ) : (
              CommentListData?.map((msg) => {
                let fileData = null;
                let parsedDocs;

                try {
                  parsedDocs =
                    typeof msg?.documents === "string"
                      ? JSON.parse(msg.documents)
                      : msg.documents;
                } catch (error) {
                  console.error("Error parsing documents:", error);
                  parsedDocs = null;
                }

                if (Array.isArray(parsedDocs) && parsedDocs.length > 0) {
                  fileData = parsedDocs[0];
                }

                return (
                  <div key={msg.id} className="flex gap-1 items-start group">
                    <UserAvatar
                      name={user?.name}
                      dotcolor=""
                      size={20}
                      image={user?.image}
                      isActive={user?.isActive}
                    />
                    <div className="bg-gray-100 p-2 rounded-lg w-fit max-w-[90%] relative">
                      <span className="text-xs text-gray-500">
                        {formatTime(msg.created_at)}
                      </span>

                      {fileData?.type?.startsWith("image") && (
                        <PhotoProvider>
                          <PhotoView src={fileData.url}>
                            <img
                              src={fileData.url}
                              alt={fileData.name}
                              className="w-40 mt-2 rounded-md cursor-pointer"
                            />
                          </PhotoView>
                        </PhotoProvider>
                      )}

                      {fileData?.type === "application/pdf" && (
                        <div>
                          <a
                            href={fileData.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            {fileData.name}
                          </a>
                        </div>
                      )}

                      {msg.audio_recording && !msg.deleted && (
                        <audio
                          controls
                          className="mt-2 border-2 rounded-md max-w-[99%]"
                        >
                          <source src={msg.audio_recording} type="audio/mp3" />
                        </audio>
                      )}

                      {/* Text Message */}
                      {msg?.comments && (
                        <p
                          className={`whitespace-pre-line ${
                            msg.deleted
                              ? "italic text-[12px] text-gray-500"
                              : ""
                          }`}
                        >
                          {msg?.comments || ""}
                        </p>
                      )}

                      {/* Like & Delete */}
                      <div className="absolute -mt-2 top-2 right-1 hidden group-hover:flex gap-2">
                        <button
                          className="text-gray-500 hover:text-red-500"
                          onClick={() => handleDelete(msg.id)}
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </PhotoProvider>
        </div>
      </div>
      {/* )} */}
    </div>
  );
};
export default ChatBox;
