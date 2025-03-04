import React, { useState } from "react";

const DraggableCard = ({ user, index, status, moveUser }) => {
  const handleDragStart = (e) => {
    e.dataTransfer.setData("userId", user.id);
    e.dataTransfer.setData("fromStatus", status);
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      className="w-[300px] h-[240px] mt-4 bg-white p-4 shadow-md rounded cursor-pointer"
    >
      <p className="text-[18px] mt-2">{user.userId}</p>
      <p className="text-[15px] text-gray-400">Due Date: {user.dueDate}</p>
      <p className="text-[15px] text-gray-400">Team: {user.team}</p>
      <p className="text-[15px] text-gray-400">Type: {user.type}</p>
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
      <h3 className="bg-gray-200 p-2 text-center font-bold">{status}</h3>
      {users.map((user, index) => (
        <DraggableCard key={user.id} user={user} index={index} status={status} moveUser={moveUser} />
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
