import { React, useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const ListTasks = ({ tasks, setTasks }) => {
  const [todos, setTodos] = useState([]);
  const [inProgress, setInprogress] = useState([]);
  const [closed, setClosed] = useState([]);
  const [frozen, setFrozen] = useState([]);
  useEffect(() => {
    const fTodos = tasks.filter((task) => task.status === "todo");
    const fInProgress = tasks.filter((task) => task.status === "inprogress");
    const fClosed = tasks.filter((task) => task.status === "closed");
    const fFrozen = tasks.filter((task) => task.status === "frozen");

    setTodos(fTodos);
    setClosed(fClosed);
    setFrozen(fFrozen);
    setInprogress(fInProgress);
  }, [tasks]);

  const statuses = ["todo", "in-progress", "closed", "frozen"];

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const updatedTasks = Array.from(tasks);
    const [movedTask] = updatedTasks.splice(result.source.index, 1);
    movedTask.status = result.destination.droppableId;
    updatedTasks.splice(result.destination.index, 0, movedTask);
    setTasks(updatedTasks);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex gap-16">
        {statuses.map((status, index) => (
          <Droppable droppableId={status} key={index}>
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                <Section
                  status={status}
                  tasks={tasks}
                  setTasks={setTasks}
                  todos={todos}
                  inProgress={inProgress}
                  closed={closed}
                  frozen={frozen}
                />
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
};

export default ListTasks;

const Section = ({ status, tasks, setTasks, todos, inProgress, closed }) => {
  return (
    <div className="bg-[#F6F6F6] border border-[#E5E5E5] p-4 rounded-md shadow-sm">
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
  );
};
