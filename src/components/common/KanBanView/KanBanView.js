import { updateTaskStatus } from "@/app/store/projectSlice";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { formatDate, getDueMessage } from "../Helper/Helper";
import { Drawer001 } from "../Drawer/Drawer01";
import TruncatedTooltipText from "../TruncatedTooltipText/TruncatedTooltipText";

const DraggableCard = ({ user, index, status, itemId }) => {
  const handleDragStart = (e) => {
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("userId", String(user.id)); // Ensure it's a string
    e.dataTransfer.setData("fromStatus", status);
    e.dataTransfer.setData("fromIndex", String(index));
  };
  const [isDrawerOpen1, setIsDrawerOpen1] = useState(false);
  const [itemId2, setItemId2] = useState(null);
  const handleTaskClick = (id) => {
    setItemId2(id);
    setIsDrawerOpen1(true);
  }
  return (
    <div
      draggable
      onDragStart={handleDragStart}
      className="w-[300px] h-full mt-4 bg-white p-4 gap-4 shadow-md rounded cursor-grab active:cursor-grabbing px-3" onClick={() => handleTaskClick(user?.id)}
    >
      <div className="flex justify-between"><p className="text-[16px] ">

        <TruncatedTooltipText
          text={user?.task_title || ""}

          maxLength={20}
          onClick={() => { }}
          section="project"

        />
      </p>
        <p
          className={`px-3 h-[25px] border rounded-md text-[15px] inline-block ${user.priority === "High"
            ? "text-[#4976F4] border-[#4976F4]"
            : user.priority === "Low"
              ? "text-red-400 border-red-400"
              : "text-[#954BAF] border-[#954BAF]"
            }`}
        >
          {user.priority}
        </p></div>


      <ul className="mt-3">
        <li className="flex items-center gap-2">
          <p className="text-[14px] text-gray-400 w-[120px]">Due Date</p>
          <span className="text-[14px] text-gray-700 w-[150px]">
            {user?.due_date ? formatDate(user?.due_date) : "" || ""}
            {user?.due_date && new Date(user?.due_date) >= new Date() && (
              <span
                className={`text-[10px] px-1 rounded mt-1 flex w-[100px] h-[18px] border items-center justify-center
                                                ${user?.status === "Completed"
                    ? "text-green-600 border-green-400"
                    : "text-gray-500 border-gray-300"
                  }`}
              >
                {user?.status === "Completed" ? "Completed" : getDueMessage(user?.due_date)}
              </span>
            )}
          </span>
        </li>
        <li className="flex items-center gap-2 mt-3">
          <p className="text-[14px] text-gray-400 w-[120px] z">Team</p>
          <span className="text-[14px] text-gray-700 w-[150px]">
            {/* {user?.team_leaders?.map((item) => item?.first_name + " " + item?.last_name).join(",")} */}
            <TruncatedTooltipText text={user?.team_leaders?.map((item) => item?.first_name + " " + item?.last_name).join(",")} maxLength={32} />
          </span>
        </li>
        <li className="flex items-center gap-2 mt-3">
          <p className="text-[14px] text-gray-400 w-[120px]">Type</p>
          <span className="text-[14px] text-gray-700 w-[150px]">
            {user?.task_type || "-"}
          </span>
        </li>
      </ul>
      <Drawer001
        isOpen={isDrawerOpen1}
        setIsDrawerOpen={setIsDrawerOpen1}
        itemId2={itemId}
        itemId={itemId2}
        details={user}
      />
    </div>
  );
};

const DroppableColumn = ({ status, users, moveUser, moveCard, itemId }) => {
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const userId = Number(e.dataTransfer.getData("userId"));
    const fromStatus = e.dataTransfer.getData("fromStatus");
    const fromIndex = Number(e.dataTransfer.getData("fromIndex"));

    if (fromStatus !== status) {
      moveUser(userId, fromStatus, status);
    } else {
      // Allow reordering within the same column
      const toIndex = users.length; // Move to the end of the list
      moveCard(userId, fromStatus, fromIndex, toIndex);
    }
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      className="w-[310px] border border-gray-100 rounded bg-gray-100 mb-4 flex flex-col flex-grow"
    >
      <div className="w-full h-[40px] bg-[#F0E7FA] flex items-center px-4">
        <p
          className={`w-[13px] h-[13px] rounded-full ${status === "To Do"
            ? "bg-[#6C757D]"
            : status === "In Progress"
              ? "bg-[#CA9700]"
              : status === "Under Review"
                ? "bg-[#0D4FA7]"
                : "bg-[#048339]"
            }`}
        ></p>
        <p className="text-[15px] ml-2">{status}</p>
        <p className="text-[14px] ml-4">{users.length}</p>
      </div>

      {/* Card Container */}
      <div className="w-full bg-gray-50 p-2 flex flex-col ">
        {users?.map((user, index) => (
          <DraggableCard key={user.id} user={user} index={index} status={status} itemId={itemId} />
        ))}
      </div>
    </div>


  );
};

const KanBanView = ({ groupedUsers, itemId, setDataLoading }) => {

  const dispatch = useDispatch();
  // Define the required statuses
  const statuses = ["To Do", "In Progress", "Under Review", "Completed"];

  // Transform initial groupedUsers data while ensuring all statuses exist
  const groupedByStatus = statuses.map((status) => ({
    status,
    users: groupedUsers?.filter((task) => task.status === status),
  }));

  const [columns, setColumns] = useState(groupedByStatus);



  const moveUser = async (userId, fromStatus, toStatus) => {
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

    const { id } = userToMove;

    dispatch(
      updateTaskStatus({
        id: id,
        status: toStatus,
        dispatch,
        project_id: Number(itemId),
        setDataLoading

      })
    );

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


  const moveCard = (id, fromStatus, fromIndex, toIndex) => {
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
    <div className="w-full mx-auto max-w-full overflow-x-auto mt-[50px]">
      <div className="flex w-full min-w-[1000px] gap-4">
        {columns.map((group) => (
          <DroppableColumn
            key={group.status}
            status={group.status}
            users={group.users}
            moveUser={moveUser}
            moveCard={moveCard}
            itemId={itemId}
          />
        ))}
      </div>
    </div>
  );
};

export default KanBanView;
