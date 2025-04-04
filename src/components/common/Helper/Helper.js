import { fetchMaster } from "@/app/store/masterSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export const status=["All", "Active", "Inactive"]
export const statusProject = [ "To Do","In Progress", "Under Review", 'Completed', 'On Hold']
export const statusProject2 = ["All", "To Do","In Progress", "Under Review", 'Completed', 'On Hold']

export const designation = ["Manager", "Team Lead", "Tester", "Jr. Developer", "Sr. Developer"];
export const designationFilter = ["All","Manager", "Team Lead", "Tester", "Jr. Developer", "Sr. Developer"];
export const view=["Card", "List"]
export const projectSortConstant=["Project Name", "Team"]
export const departmentOptions=["IT", "Marketing"]
export const taskView =["List", "Kanban"]
export const projectPriority =["High", "Low", "Medium"]
export const projectPriority2 =["All","High", "Low", "Medium"]

export const projectStage =["Stage 1", "Stage 2", "Stage 3"]
export const taskType=["Documentation", "Bug Fix", "Implementation", "Review"]
export const taskVisibility=["Public", "Private"]

export const Skills =["React", "JavaScript", "HTML", "CSS", "Tailwind CSS", "Bootstarp","Node.js", "Express.js", "SQL", "MongoDB", "Git", "Git-Hub", "Firebase", "Axios"]

export const statusOptions = [
  { label: "All", value:2 },
  
    { label: "Active", value: 0 },
    { label: "Inactive", value: 1 },
  ];

  export const getStatusDetails = (status) => {
    switch (status) {
      case "To do":
        return { percentage: 0, color: "#EBF0FF" }; 
      case "In Progress":
        return { percentage: 25, color: "#A3B3FF" }; 
      case "Under Review":
        return { percentage: 50, color: "#637DFF" }; 
      case "Completed":
        return { percentage: 100, color: "#0025FF" }; 
      default:
        return { percentage: 0, color: "#EBF0FF" }
    }
  };

  export const formatTime = (timestamp) => {
    if (!timestamp) return ""; // Handle cases where timestamp is null/undefined
    return new Date(timestamp).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true, // AM/PM format
    });
  };
  
  export const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
}

export const getDueMessage = (dueDate) => {
  if (!dueDate) return "";

  const currentDate = new Date();
  const due = new Date(dueDate);

  // Calculate difference in days
  const diffTime = due - currentDate;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // Convert milliseconds to days

  if (diffDays > 0) {
    return `${diffDays} days remaining`;
  } else if (diffDays === 0) {
    return "Due today";
  } 
};



 