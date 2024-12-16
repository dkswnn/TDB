import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { Button } from "antd";

const TaskCard = ({ task, index, removeTask }) => {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="bg-[#E0E4EA] rounded-md shadow-md p-4"
        >
          <div className="flex justify-between items-center mb-2">
            <p className="text-xs font-semibold">{task.name}</p>
            <p className="text-xs">{task.priority}</p>
          </div>
          <div className="flex justify-between items-center mb-2">
            <p className="font-semibold text-xs">Partners:</p>
            <p className="text-xs">{task.partners}</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="font-semibold text-xs">Date Added:</p>
            <p className="text-xs">{task.date}</p>
          </div>
          <div className="flex justify-end mt-4">
            <Button
              danger
              size="small"
              onClick={() => removeTask(index)}
              className="text-xs"
            >
              Remove
            </Button>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default TaskCard;
