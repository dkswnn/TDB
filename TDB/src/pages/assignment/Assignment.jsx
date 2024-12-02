import React, { useState } from "react";
import PageLayout from "../../layouts/PageLayout";
import { Button, Checkbox, DatePicker } from "antd";

const Assignment = () => {
  const [showAddTask, setShowAddTask] = useState(false);

  // Initialize tasks state
  const [tasks, setTasks] = useState([]);

  const [newTask, setNewTask] = useState({
    name: "",
    priority: "",
    partners: "",
    date: "",
  });

  const handleAddTask = () => {
    if (newTask.name && newTask.priority && newTask.partners && newTask.date) {
      setTasks([...tasks, newTask]); // Add new task to tasks list
      setNewTask({ name: "", priority: "", partners: "", date: "" }); // Reset newTask fields
      setShowAddTask(false); // Close modal
    } else {
      alert("Please fill in all fields"); // Validation alert
    }
  };

  return (
    <PageLayout>
      <div className="text-3xl font-medium mb-4">Project Name</div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1 */}
        <div className="bg-[#F6F6F6] border border-[#E5E5E5] p-4 rounded-md shadow-sm">
          <div className="flex justify-between items-center mb-2">
            <p className="font-semibold">Date Added:</p>
            <p>{}</p>
          </div>
          <div className="flex justify-between items-center mb-2">
            <p className="font-semibold">Deadline:</p>
            <p>2025/01/15</p>
          </div>
          <div className="flex justify-between items-center mb-2">
            <p className="font-semibold">Partners:</p>
            <p>Duku,Suuri,Tamira</p>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-[#F6F6F6] border border-[#E5E5E5] p-4 rounded-md shadow-sm">
          <p className="text-lg font-semibold text-[#333333]">Goal:</p>
          <div className="flex justify-between items-start mb-4">
            <p className="text-sm text-[#666666] max-w-lg">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem
              qui enim eum facere nulla tempore, at natus sequi non,
              perspiciatis adipisci obcaecati fugiat quod? Assumenda, incidunt
              nobis! Amet, non quo.
            </p>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-[#F6F6F6] border border-[#E5E5E5] p-4 rounded-md shadow-sm">
          <div className="flex justify-between items-center mb-2">
            <p className="font-semibold">All Tasks:</p>
            <p>{tasks.length}</p>
          </div>
          <div className="flex justify-between items-center mb-2">
            <p className="font-semibold">Done:</p>
            <p>0</p>
          </div>
          <div className="flex justify-between items-center mb-2">
            <p className="font-semibold">Frozen:</p>
            <p>1</p>
          </div>
        </div>
      </div>

      {/* Todo section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-5">
        <div className="bg-[#F6F6F6] border border-[#E5E5E5] p-4 rounded-md shadow-sm">
          <div className="flex justify-between items-center">
            <p className="font-semibold text-xl">To Do</p>
            <Button
              type="primary"
              shape="circle"
              className="bg-green-500 text-white"
              onClick={() => setShowAddTask(true)}
            >
              +
            </Button>
          </div>
          <div className="grid grid-cols-1 gap-4 mt-5">
            {tasks.map((task, index) => (
              <div
                key={index}
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
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#F6F6F6] border border-[#E5E5E5] p-4 rounded-md shadow-sm">
          <div className="flex justify-between items-center">
            <p className="font-semibold text-xl">Closed Task</p>
          </div>
        </div>
      </div>

      {/* Add Task Modal */}
      {showAddTask && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-md shadow-lg w-1/3">
            <div className="font-semibold text-2xl text-center mb-4">
              Add New Task
            </div>
            <div>
              <div className="mb-4">
                <p className="font-semibold">Task Name:</p>
                <input
                  type="text"
                  value={newTask.name}
                  onChange={(e) =>
                    setNewTask({ ...newTask, name: e.target.value })
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
                      onChange={() =>
                        setNewTask({ ...newTask, priority: level })
                      }
                    >
                      {level}
                    </Checkbox>
                  ))}
                </div>
              </div>
              <div className="mb-4">
                <p className="font-semibold">Partners:</p>
                <input
                  type="text"
                  value={newTask.partners}
                  onChange={(e) =>
                    setNewTask({ ...newTask, partners: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-4">
                <p className="font-semibold">Date Added:</p>
                <DatePicker
                  onChange={(date, dateString) =>
                    setNewTask({ ...newTask, date: dateString })
                  }
                  className="w-full"
                />
              </div>
            </div>
            <div className="flex justify-end gap-4">
              <Button onClick={() => setShowAddTask(false)}>Cancel</Button>
              <Button type="primary" onClick={handleAddTask}>
                Add Task
              </Button>
            </div>
          </div>
        </div>
      )}
    </PageLayout>
  );
};

export default Assignment;
