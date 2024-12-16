import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { v4 as uuid4 } from "uuid";

const CreateTask = ({ tasks, setTasks }) => {
  const [task, setTask] = useState({
    id: uuid4(),
    name: "",
    priority: "",
    partners: "",
    date: "",
    status: "todo",
  });

  return (
    <div className="mb-4 p-4 border border-gray-300 rounded-md shadow-sm">
      <div className="mb-2">
        <p className="font-semibold">Task Name:</p>
        <Input
          type="text"
          value={task.name}
          onChange={(e) => setTask({ ...task, name: e.target.value, id: v4() })}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
      <div className="mb-2">
        <p className="font-semibold">Type of Project:</p>
        <div className="flex gap-4">
          {["High", "Medium", "Low"].map((level) => (
            <Checkbox
              key={level}
              checked={task.priority === level}
              onChange={() => setTask({ ...task, priority: level })}
            >
              {level}
            </Checkbox>
          ))}
        </div>
      </div>
      <div className="mb-2">
        <p className="font-semibold">Partners:</p>
        <Input
          type="text"
          value={task.partners}
          onChange={(e) => setTask({ ...task, partners: e.target.value })}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
      <div className="mb-2">
        <p className="font-semibold">Dead Line:</p>
        <DatePicker
          onChange={(date, dateString) =>
            setTask({ ...task, date: dateString })
          }
          className="w-full"
        />
      </div>
    </div>
  );
};

export default CreateTask;
