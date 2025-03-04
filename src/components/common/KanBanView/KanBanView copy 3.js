import React, { useState } from "react";

const DraggableCard = ({ user, index, status, moveUser }) => {
  const handleDragStart = (e) => {
    e.dataTransfer.setData("userId", user.id);
    e.dataTransfer.setData("fromStatus", status);
    e.dataTransfer.setData("fromIndex", index);
  };
  return (
    <div
      draggable
      onDragStart={handleDragStart}
      className="w-[300px] h-[240px] mt-4 bg-white p-4 shadow-md rounded cursor-pointer"
    >
      <p
        className={`px-3 py-1 border rounded-md text-[15px] inline-block ${user.priority === "High"
          ? "text-[#4976F4] border-[#4976F4]"
          : user.priority === "Low"
            ? "text-red-400 border-red-400"
            : "text-[#954BAF] border-[#954BAF]"
          }`}
      >
        {user.priority}
      </p>
      <p className="text-[18px] mt-2">{user.userId}</p>
      <ul>
        <li className="flex">
          <p className="text-[15px] text-gray-400 w-[120px] mt-2">Due Date</p>
          <span className="text-[15px] mt-2">{user.dueDate}</span>
        </li>
        <li className="flex">
          <p className="text-[15px] text-gray-400 w-[280px] mt-2">Team</p>
          <span className="text-[15px] mt-2">{user.team}</span>
        </li>
        <li className="flex">
          <p className="text-[15px] text-gray-400 w-[120px] mt-2">Type</p>
          <span className="text-[15px] mt-2">{user.type}</span>
        </li>
      </ul>
    </div>
  );
};

const DroppableColumn = ({ status, users, moveUser }) => {
  const handleDragOver = (e) => e.preventDefault();

  const handleDrop = (e) => {
    e.preventDefault();
    const userId = e.dataTransfer.getData("userId");
    const fromStatus = e.dataTransfer.getData("fromStatus");

    if (fromStatus !== status) {
      moveUser(userId, fromStatus, status);
    }
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      className="w-[310px] min-h-[300px] border border-gray-100 rounded bg-gray-100 p-2"
    >
      <div className="w-full h-[40px] bg-[#F0E7FA] flex items-center px-4">
        <p
          className={`w-[13px] h-[13px] rounded-full ${status === "To Do"
            ? "bg-[#6C757D]"
            : status === "In progress"
              ? "bg-[#CA9700]"
              : status === "Under Review"
                ? "bg-[#0D4FA7]"
                : "bg-[#048339]"
            }`}
        ></p>
        <p className="text-[15px] ml-2">{status}</p>
        <p className="text-[14px] ml-4">{users.length}</p>
      </div>
      {users.map((user, index) => (
        <DraggableCard
          key={user.id}
          user={user}
          index={index}
          status={status}
          moveUser={moveUser} />
      ))}
    </div>
  );
};

const KanBanView = () => {
  const [columns, setColumns] = useState([
    { status: "To Do", users: [{ id: "1", userId: "Task 1", dueDate: "2024-03-10", team: "A", type: "Bug" }] },
    { status: "In Progress", users: [] },
    { status: "Done", users: [] }
  ]);

  const moveUser = (userId, fromStatus, toStatus) => {
    let userToMove = null;
    const updatedColumns = columns.map((group) => {
      if (group.status === fromStatus) {
        userToMove = group.users.find((user) => user.id === userId);
        return { ...group, users: group.users.filter((user) => user.id !== userId) };
      }
      return group;
    });

    if (!userToMove) return;

    const finalColumns = updatedColumns.map((group) => {
      if (group.status === toStatus) {
        return { ...group, users: [userToMove, ...group.users] }; // 🆕 Top pe add ho raha hai
      }
      return group;
    });

    setColumns(finalColumns);
  };

  return (
    <div className="flex gap-4 p-4 overflow-x-auto">
      {columns.map((group) => (
        <DroppableColumn key={group.status} status={group.status} users={group.users} moveUser={moveUser} />
      ))}
    </div>
  );
};

export default KanBanView;
