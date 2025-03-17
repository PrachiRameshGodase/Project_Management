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
import { storage, ref, uploadBytes, uploadBytesResumable, getDownloadURL } from "../../../configs/firebase";


const ChatBox = ({ projectId, taskId }) => {
  const dispatch = useDispatch();
  const usersList = useSelector((state) => state.user?.employeeList?.data);
  const CommentListData = useSelector((state) => state.project?.taskCommentList?.data);
  console.log("CommentListData", CommentListData)
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
          documents: [...prevData.documents, { name: file.name, url: downloadURL, type: file.type }],
        }));

        setUploading(false);
      }
    );
  };
  console.log("form Data", formData)

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

  // Send Message
  const handleSend = () => {
    

   

    

    dispatch(addTaskComment({formData, project_id:projectId, task_id:taskId, dispatch}));

    setTimeout(() => {
      scrollToTop();
    }, 100);
  };

  // Delete Message
  const handleDelete = (id) => {
    dispatch(deleteTaskComment({ id, project_id: projectId, task_id: taskId, dispatch }));
  };

  // Like Message
  const handleLike = (id) => {
    setMessages(
      messages.map((msg) =>
        msg.id === id ? { ...msg, liked: !msg.liked } : msg
      )
    );
  };

  // 🔹 Highlight mentions in text
  const formatMessage = (text) => {
    return text.split(" ").map((word, index) =>
      word.startsWith("@") ? (
        <span key={index} className="text-blue-600 font-bold">
          {word}{" "}
        </span>
      ) : (
        word + " "
      )
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

  console.log("formDatat", formData);

  return (
   <></>
  );
};
export default ChatBox;

