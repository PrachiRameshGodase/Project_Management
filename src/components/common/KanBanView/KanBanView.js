import React, { useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const ItemType = "CARD";

const DraggableCard = ({ user, index, moveCard }) => {
    const [{ isDragging }, drag] = useDrag({
      type: ItemType,
      item: { id: user.id, fromStatus: user.status, index }, // Add index
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    });
  
    const [, drop] = useDrop({
      accept: ItemType,
      hover: (draggedItem) => {
        if (draggedItem.id !== user.id) {
          moveCard(draggedItem.id, draggedItem.fromStatus, user.status, draggedItem.index, index);
          draggedItem.index = index;
        }
      },
    });
  
    return (
      <div
        ref={(node) => drag(drop(node))}
        className="w-[300px] h-[240px] mt-4 bg-white p-4 gap-4 shadow-md rounded cursor-pointer"
        style={{ opacity: isDragging ? 0.5 : 1 }}
      >
        <p
          className={`px-3 py-1 border rounded-md text-[15px] inline-block ${
            user.priority === "High"
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
  

const DroppableColumn = ({ status, users, moveUser, moveCard }) => {
    const [, drop] = useDrop({
      accept: ItemType,
      drop: (item) => moveUser(item.id, item.fromStatus, status), // Move across columns
    });
  
    return (
      <div
        ref={drop}
        className="w-[310px] h-full border border-gray-100 rounded bg-gray-100 mb-4"
      >
        <div className="w-full h-[40px] bg-[#F0E7FA] flex items-center px-4">
          <p
            className={`w-[13px] h-[13px] rounded-full ${
              status === "To Do"
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
        <div className="w-full h-full bg-gray-50 p-2">
          {users.map((user, index) => (
            <DraggableCard key={user.id} user={{ ...user, status }} index={index} moveCard={moveCard} />
          ))}
        </div>
      </div>
    );
  };
  const KanBanView = ({ groupedUsers }) => {
    const [columns, setColumns] = useState(groupedUsers);
  
    const moveUser = (userId, fromStatus, toStatus) => {
      if (fromStatus === toStatus) return;
  
      let userToMove;
      const updatedColumns = columns.map((group) => {
        if (group.status === fromStatus) {
          userToMove = group.users.find((user) => user.id === userId);
          return {
            ...group,
            users: group.users.filter((user) => user.id !== userId),
          };
        }
        return group;
      });
  
      if (!userToMove) return;
  
      const finalColumns = updatedColumns.map((group) => {
        if (group.status === toStatus) {
          return {
            ...group,
            users: [...group.users, { ...userToMove, status: toStatus }],
          };
        }
        return group;
      });
  
      setColumns(finalColumns);
    };
  
    const moveCard = (id, fromStatus, toStatus, fromIndex, toIndex) => {
      if (fromStatus !== toStatus) {
        moveUser(id, fromStatus, toStatus);
        return;
      }
  
      const updatedColumns = columns.map((group) => {
        if (group.status === fromStatus) {
          const updatedUsers = [...group.users];
          const [movedUser] = updatedUsers.splice(fromIndex, 1);
          updatedUsers.splice(toIndex, 0, movedUser);
  
          return { ...group, users: updatedUsers };
        }
        return group;
      });
  
      setColumns(updatedColumns);
    };
  
    return (
      <DndProvider backend={HTML5Backend}>
        <div className="w-full mx-auto max-w-full overflow-x-auto mt-[50px]">
          <div className="flex w-full min-w-[1000px] gap-4">
            {columns.map((group) => (
              <DroppableColumn
                key={group.status}
                status={group.status}
                users={group.users}
                moveUser={moveUser}
                moveCard={moveCard} // Pass moveCard function
              />
            ))}
          </div>
        </div>
      </DndProvider>
    );
  };
  
  export default KanBanView;
    
;