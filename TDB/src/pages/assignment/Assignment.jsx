import React, { useState, useEffect, useCallback } from "react";
import PageLayout from "../../layouts/PageLayout";
import { Button, message } from "antd";
import { SignInButton, useUser } from "@clerk/clerk-react";
import TaskCard from "./TaskCard";
import AddTaskModal from "./AddTaskModal";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import {
  FileDoneOutlined,
  ProfileOutlined,
  ProjectOutlined,
  QuestionCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";

const Assignment = () => {
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    name: "",
    priority: "",
    partners: "",
    date: "",
    status: "todo",
  });

  const { user } = useUser();

  useEffect(() => {
    if (user) {
      setTasks(user.unsafeMetadata.todos || []);
    }
  }, [user]);

  const handleAddTask = useCallback(() => {
    if (newTask.name && newTask.priority && newTask.partners && newTask.date) {
      const updatedTasks = [...tasks, newTask];
      setTasks(updatedTasks);
      setNewTask({
        name: "",
        priority: "",
        partners: "",
        date: "",
        status: "todo",
      });
      setShowAddTask(false);
      user.update({
        unsafeMetadata: { ...user.unsafeMetadata, todos: updatedTasks },
      });
    } else {
      message.error("Please fill in all fields");
    }
  }, [newTask, tasks, user]);

  const moveTaskToSection = useCallback(
    (taskIndex, newStatus) => {
      const updatedTasks = tasks.map((task, index) => {
        if (index === taskIndex) {
          return { ...task, status: newStatus };
        }
        return task;
      });
      setTasks(updatedTasks);
      user.update({
        unsafeMetadata: { ...user.unsafeMetadata, todos: updatedTasks },
      });
    },
    [tasks, user]
  );

  const removeTask = useCallback(
    (taskIndex) => {
      const updatedTasks = tasks.filter((_, index) => index !== taskIndex);
      setTasks(updatedTasks);
      user.update({
        unsafeMetadata: { ...user.unsafeMetadata, todos: updatedTasks },
      });
    },
    [tasks, user]
  );

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const { source, destination } = result;
    const updatedTasks = Array.from(tasks);
    const [movedTask] = updatedTasks.splice(source.index, 1);
    movedTask.status = destination.droppableId;
    updatedTasks.splice(destination.index, 0, movedTask);
    setTasks(updatedTasks);
    user.update({
      unsafeMetadata: { ...user.unsafeMetadata, todos: updatedTasks },
    });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {user ? (
        <PageLayout>
          <div className="text-3xl font-medium mb-5">Ажиллах Төсөл</div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#F6F6F6] border border-[#E5E5E5] p-4 rounded-md shadow-sm">
              <div className="flex justify-between items-center mb-2">
                <p className="font-semibold">Бүх ажил:</p>
                <p>{tasks.length}</p>
              </div>
              <div className="flex justify-between items-center mb-2">
                <p className="font-semibold">Дууссан:</p>
                <p>{tasks.filter((task) => task.status === "closed").length}</p>
              </div>
              <div className="flex justify-between items-center mb-2">
                <p className="font-semibold">Түр зогссон:</p>
                <p>{tasks.filter((task) => task.status === "frozen").length}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-5">
            <Droppable droppableId="todo">
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="bg-[#F6F6F6] border border-[#E5E5E5] p-4 rounded-md shadow-sm"
                >
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-2">
                      <ProfileOutlined
                        style={{ fontSize: "24px", color: "#1890ff" }}
                      />
                      <p className="font-semibold text-xl">Ажлын жагсаалт</p>
                    </div>
                    <Button
                      type="primary"
                      icon={<PlusOutlined />}
                      shape="circle"
                      onClick={() => setShowAddTask(true)}
                    />
                  </div>
                  <div className="grid grid-cols-1 gap-4">
                    {tasks
                      .filter((task) => task.status === "todo")
                      .map((task, index) => (
                        <TaskCard
                          key={task.id}
                          task={task}
                          index={index}
                          draggableId={task.id}
                          removeTask={removeTask}
                          moveTaskToSection={moveTaskToSection}
                        />
                      ))}
                  </div>
                  {provided.placeholder}
                </div>
              )}
            </Droppable>

            <Droppable droppableId="in-progress">
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="bg-[#F6F6F6] border border-[#E5E5E5] p-4 rounded-md shadow-sm"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <ProjectOutlined
                      style={{ fontSize: "24px", color: "#faad14" }}
                    />
                    <p className="font-semibold text-xl">Ажиллаж байгаа</p>
                  </div>
                  <div className="grid grid-cols-1 gap-4">
                    {tasks
                      .filter((task) => task.status === "in-progress")
                      .map((task, index) => (
                        <TaskCard
                          key={task.id}
                          task={task}
                          index={index}
                          draggableId={task.id}
                          removeTask={removeTask}
                          moveTaskToSection={moveTaskToSection}
                        />
                      ))}
                  </div>
                  {provided.placeholder}
                </div>
              )}
            </Droppable>

            <Droppable droppableId="closed">
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="bg-[#F6F6F6] border border-[#E5E5E5] p-4 rounded-md shadow-sm"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <FileDoneOutlined
                      style={{ fontSize: "24px", color: "#52c41a" }}
                    />
                    <p className="font-semibold text-xl">Дууссан</p>
                  </div>
                  <div className="grid grid-cols-1 gap-4">
                    {tasks
                      .filter((task) => task.status === "closed")
                      .map((task, index) => (
                        <TaskCard
                          key={task.id}
                          task={task}
                          index={index}
                          draggableId={task.id}
                          removeTask={removeTask}
                          moveTaskToSection={moveTaskToSection}
                        />
                      ))}
                  </div>
                  {provided.placeholder}
                </div>
              )}
            </Droppable>

            <Droppable droppableId="frozen">
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="bg-[#F6F6F6] border border-[#E5E5E5] p-4 rounded-md shadow-sm"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <QuestionCircleOutlined
                      style={{ fontSize: "24px", color: "#f5222d" }}
                    />
                    <p className="font-semibold text-xl">Түр зогссон</p>
                  </div>
                  <div className="grid grid-cols-1 gap-4">
                    {tasks
                      .filter((task) => task.status === "frozen")
                      .map((task, index) => (
                        <TaskCard
                          key={task.id}
                          task={task}
                          index={index}
                          draggableId={task.id}
                          removeTask={removeTask}
                          moveTaskToSection={moveTaskToSection}
                        />
                      ))}
                  </div>
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>

          <AddTaskModal
            showAddTask={showAddTask}
            setShowAddTask={setShowAddTask}
            handleAddTask={handleAddTask}
            newTask={newTask}
            setNewTask={setNewTask}
          />
        </PageLayout>
      ) : (
        <PageLayout>
          <div className="flex justify-center items-center h-screen">
            <div className="text-3xl font-medium mb-4">
              Please sign in to access this page.
            </div>
            <Button>
              <SignInButton />
            </Button>
          </div>
        </PageLayout>
      )}
    </DragDropContext>
  );
};

export default Assignment;
