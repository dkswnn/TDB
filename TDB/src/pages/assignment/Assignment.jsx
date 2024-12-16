import React, { useState, useEffect, useMemo, useCallback } from "react";
import PageLayout from "../../layouts/PageLayout";
import { Button, message } from "antd";
import { SignInButton, useUser } from "@clerk/clerk-react";
import TaskCard from "./TaskCard";
import AddTaskModal from "./AddTaskModal";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

const Assignment = () => {
  const [showAddTask, setShowAddTask] = useState(false);
  const [loading, setLoading] = useState(false);

  const [tasks, setTasks] = useState([]);

  const [newTask, setNewTask] = useState({
    name: "",
    priority: "",
    partners: "",
    date: "",
    status: "todo",
  });

  const { user, signInAttempt } = useUser();

  useEffect(() => {
    if (!user) {
      console.log("Please sign in to access this page.");
    } else {
      setTasks(user.unsafeMetadata.todos || []);
    }
  }, [user]);

  const handleAddTask = useCallback(() => {
    if (newTask.name && newTask.priority && newTask.partners && newTask.date) {
      const updatedTasks = [...task, newTask];
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
      const updatedTasks = tasks.filter((task, index) => index !== taskIndex);
      setTasks(updatedTasks);
      user.update({
        unsafeMetadata: { ...user.unsafeMetadata, todos: updatedTasks },
      });
    },
    [tasks, user]
  );

  const onDragEnd = (result) => {
    if (!result.destination) return; // If dropped outside a droppable area
    const { source, destination } = result;
    const updatedTasks = Array.from(tasks);
    const [movedTask] = updatedTasks.splice(source.index, 1); // Remove the task from the source index
    movedTask.status = destination.droppableId; // Update the status based on the droppableId
    updatedTasks.splice(destination.index, 0, movedTask); // Insert the task at the destination index
    setTasks(updatedTasks); // Update the tasks state
    user.update({
      unsafeMetadata: { ...user.unsafeMetadata, todos: updatedTasks },
    });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {user ? (
        <PageLayout>
          <div className="text-3xl font-medium mb-4">Project Name</div>
          {/* <ListTasks tasks={tasks} setTasks={setTasks} /> */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="bg-[#F6F6F6] border border-[#E5E5E5] p-4 rounded-md shadow-sm">
              <div className="flex justify-between items-center mb-2">
                <p className="font-semibold">Date Added:</p>
                <p></p>
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
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Quidem qui enim eum facere nulla tempore, at natus sequi non,
                  perspiciatis adipisci obcaecati fugiat quod? Assumenda,
                  incidunt nobis! Amet, non quo.
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
                <p>{tasks.filter((task) => task.status === "closed").length}</p>
              </div>
              <div className="flex justify-between items-center mb-2">
                <p className="font-semibold">Frozen:</p>
                <p>{tasks.filter((task) => task.status === "frozen").length}</p>
              </div>
            </div>
          </div>

          {/* Task sections */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-5">
            {/* To Do section */}
            <Droppable droppableId="todo">
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="bg-[#F6F6F6] border border-[#E5E5E5] p-4 rounded-md shadow-sm"
                >
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
                    {tasks
                      .filter((task) => task.status === "todo")
                      .map((task, index) => (
                        <TaskCard
                          key={task.id}
                          task={task}
                          index={index}
                          draggableId={task.id} // Pass unique id
                          removeTask={removeTask}
                          moveTaskToSection={moveTaskToSection}
                          loading={loading}
                        />
                      ))}
                  </div>
                  {provided.placeholder}
                </div>
              )}
            </Droppable>

            {/* In Progress section */}
            <Droppable droppableId="in-progress">
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="bg-[#F6F6F6] border border-[#E5E5E5] p-4 rounded-md shadow-sm"
                >
                  <div className="flex justify-between items-center">
                    <p className="font-semibold text-xl">In Progress </p>
                  </div>
                  <div className="grid grid-cols-1 gap-4 mt-5">
                    {tasks
                      .filter((task) => task.status === "in-progress")
                      .map((task, index) => (
                        <TaskCard
                          key={task.id}
                          task={task}
                          index={index}
                          draggableId={task.id} // Pass unique id
                          removeTask={removeTask}
                          moveTaskToSection={moveTaskToSection}
                          loading={loading}
                        />
                      ))}
                  </div>
                  {provided.placeholder}
                </div>
              )}
            </Droppable>

            {/* Closed section */}
            <Droppable droppableId="closed">
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="bg-[#F6F6F6] border border-[#E5E5E5] p-4 rounded-md shadow-sm"
                >
                  <div className="flex justify-between items-center">
                    <p className="font-semibold text-xl">Closed </p>
                  </div>
                  <div className="grid grid-cols-1 gap-4 mt-5">
                    {tasks
                      .filter((task) => task.status === "closed")
                      .map((task, index) => (
                        <TaskCard
                          key={task.id}
                          task={task}
                          index={index}
                          draggableId={task.id} // Pass unique id
                          removeTask={removeTask}
                          moveTaskToSection={moveTaskToSection}
                          loading={loading}
                        />
                      ))}
                  </div>
                  {provided.placeholder}
                </div>
              )}
            </Droppable>

            {/* Frozen section */}
            <Droppable droppableId="frozen">
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="bg-[#F6F6F6] border border-[#E5E5E5] p-4 rounded-md shadow-sm"
                >
                  <div className="flex justify-between items-center">
                    <p className="font-semibold text-xl">Frozen</p>
                  </div>
                  <div className="grid grid-cols-1 gap-4 mt-5">
                    {tasks
                      .filter((task) => task.status === "frozen")
                      .map((task, index) => (
                        <TaskCard
                          key={task.id}
                          task={task}
                          index={index}
                          draggableId={task.id} // Pass unique id
                          removeTask={removeTask}
                          moveTaskToSection={moveTaskToSection}
                          loading={loading}
                        />
                      ))}
                  </div>
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>

          {/* Add Task Modal */}
          <AddTaskModal
            key={tasks.id}
            showAddTask={showAddTask}
            setShowAddTask={setShowAddTask}
            handleAddTask={handleAddTask}
            newTask={newTask}
            setNewTask={setNewTask}
            loading={loading}
          />
        </PageLayout>
      ) : (
        <PageLayout>
          <div className="flex justify-center items-center h-screen">
            <div className="text-3xl font-medium mb-4">
              Please sign in to access this page.
            </div>
            <Button>
              {" "}
              <SignInButton />
            </Button>
          </div>
        </PageLayout>
      )}
    </DragDropContext>
  );
};

export default Assignment;
