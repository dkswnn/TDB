import React from "react";
import { Button, Modal, Input, Checkbox, DatePicker } from "antd";
import { v4 as uuidv4 } from "uuid";

const AddTaskModal = ({
  showAddTask,
  setShowAddTask,
  handleAddTask,
  newTask,
  setNewTask,
  loading,
}) => {
  const handleCancel = () => {
    setShowAddTask(false);
    setNewTask({
      id: "",
      name: "",
      priority: "",
      partners: "",
      date: "",
      status: "todo",
    });
  };
  console.log(newTask);

  return (
    <Modal
      title="Add New Task"
      visible={showAddTask}
      onCancel={handleCancel}
      footer={[
        <Button key="cancel" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button
          key="add"
          type="primary"
          onClick={handleAddTask}
          loading={loading}
        >
          Add Task
        </Button>,
      ]}
    >
      <div className="mb-4">
        <p className="font-semibold">Task Name:</p>
        <Input
          type="text"
          value={newTask.name}
          onChange={(e) =>
            setNewTask({ ...newTask, id: uuidv4(), name: e.target.value })
          }
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
      <div className="mb-4">
        <p className="font-semibold">Type of Project:</p>
        <div className="flex gap-4">
          {["High", "Medium", "Low"].map((level) => (
            <Checkbox
              key={level}
              checked={newTask.priority === level}
              onChange={() => setNewTask({ ...newTask, priority: level })}
            >
              {level}
            </Checkbox>
          ))}
        </div>
      </div>
      <div className="mb-4">
        <p className="font-semibold">Partners:</p>
        <Input
          type="text"
          value={newTask.partners}
          onChange={(e) => setNewTask({ ...newTask, partners: e.target.value })}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
      <div className="mb-4">
        <p className="font-semibold">Dead Line:</p>
        <DatePicker
          onChange={(date, dateString) =>
            setNewTask({ ...newTask, date: dateString })
          }
          className="w-full"
        />
      </div>
    </Modal>
  );
};

export default AddTaskModal;
