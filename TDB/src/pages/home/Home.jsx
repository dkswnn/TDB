import React, { useState, useEffect } from "react";
import PageLayout from "../../layouts/PageLayout";
import { Modal, Button } from "antd";
import { TreeSelect } from "antd";
import { useUser } from "@clerk/clerk-react"; // Clerk hook for user info

const Home = () => {
  const { user } = useUser(); // Get current user from Clerk
  const days = ["Даваа", "Мягмар", "Лхагва", "Пүрэв", "Баасан"];
  const times = [
    "8:00-9:30",
    "9:35-11:05",
    "11:10-12:40",
    "13:20-14:50",
    "14:55-16:25",
  ];

  const treeData = [
    {
      title: "Н.Соронзонболд",
      value: "teacher1",
      children: [
        {
          title: "Компьютерийн ухааны туршилт 3",
          value: "Компьютерийн ухааны туршилт 3",
        },
      ],
    },
    {
      title: "Б.Батчулуун",
      value: "teacher2",
      children: [
        {
          title: "Тусгай цаг",
          value: "Тусгай цаг",
        },
      ],
    },
    {
      title: "Д.Золжаргал",
      value: "teacher3",
      children: [
        {
          title: "Үйлдлийн системийн онол",
          value: "Үйлдлийн системийн онол",
        },
      ],
    },
    {
      title: "Т.Мөнхбат",
      value: "teacher4",
      children: [
        {
          title: "Хэрэглээний математик",
          value: "Хэрэглээний математик",
        },
        {
          title: "Дискрет математик",
          value: "Дискрет математик",
        },
      ],
    },
    {
      title: "Ч.Баттөгс",
      value: "teacher5",
      children: [
        {
          title: "Веб програмчлал",
          value: "Веб програмчлал",
        },
        {
          title: "Компьютерийн ухааны туршилт 3",
          value: "Компьютерийн ухааны туршилт 3",
        },
      ],
    },
    {
      title: "М.Оюунчимэг, Сакураи",
      value: "teacher6",
      children: [
        {
          title: "Япон хэл",
          value: "Япон хэл",
        },
      ],
    },
    {
      title: "Ц.Золбадрал",
      value: "teacher7",
      children: [
        {
          title: "Хэрэглээний физик 2",
          value: "Хэрэглээний физик 2",
        },
      ],
    },
    {
      title: "А.Даваа",
      value: "teacher8",
      children: [
        {
          title: "Техникийн англи хэл",
          value: "Техникийн англи хэл",
        },
      ],
    },
    {
      title: "А.Мөнхбаяр",
      value: "teacher9",
      children: [
        {
          title: "Сүлжээний архитектур",
          value: "Сүлжээний архитектур",
        },
      ],
    },
    {
      title: "Б.Отгонцэцэг",
      value: "teacher10",
      children: [
        {
          title: "Биеийн тамир",
          value: "Биеийн тамир",
        },
      ],
    },
  ];

  const [value, setValue] = useState(undefined);
  const [selectedCell, setSelectedCell] = useState(null);
  const [schedule, setSchedule] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditable, setIsEditable] = useState(false);

  // Load the schedule from localStorage if it exists
  useEffect(() => {
    const savedSchedule = localStorage.getItem(`schedule-${user?.id}`);
    if (savedSchedule) {
      setSchedule(JSON.parse(savedSchedule));
    }
  }, [user?.id]);

  const toggleSchedule = () => {
    setIsEditable(!isEditable);
  };

  const openModal = (timeIndex, dayIndex) => {
    setSelectedCell({ timeIndex, dayIndex });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const onChange = (newValue) => {
    setValue(newValue);
  };

  const handleSubmit = () => {
    if (selectedCell && value) {
      const [teacherValue, subject] = value.split(":");
      const teacher = treeData.find(
        (teacher) => teacher.value === teacherValue
      )?.title;

      if (teacher && subject) {
        const updatedSchedule = {
          ...schedule,
          [`${selectedCell.timeIndex}-${selectedCell.dayIndex}`]: {
            teacher,
            subject,
          },
        };

        // Save the updated schedule to LocalStorage
        setSchedule(updatedSchedule);
        localStorage.setItem(
          `schedule-${user?.id}`,
          JSON.stringify(updatedSchedule)
        );
      }

      closeModal();
    }
  };

  return (
    <PageLayout>
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center gap-4 mb-4">
          <div className="text-2xl font-bold text-center flex-grow">
            Хичээлийн хуваарь
          </div>
          <button
            className="ml-auto border-[3px] border-green-300 rounded-full p-1 bg-green-300 hover:bg-slate-300 hover:border-slate-300"
            onClick={toggleSchedule}
          >
            Хуваарь өөрчлөх
          </button>
        </div>

        <div className="grid grid-cols-6">
          <div className="font-bold text-center border p-8">Цаг\Өдөр</div>
          {days.map((day, index) => (
            <div key={index} className="font-bold text-center border p-8">
              {day}
            </div>
          ))}
          {times.map((time, timeIndex) => (
            <React.Fragment key={timeIndex}>
              <div className="font-bold text-center border p-8">{time}</div>
              {days.map((_, dayIndex) => {
                const cellKey = `${timeIndex}-${dayIndex}`;
                return (
                  <div
                    key={cellKey}
                    className="border p-8 text-center bg-gray-100 relative"
                  >
                    {isEditable && !schedule[cellKey] && (
                      <button
                        className="absolute inset-0 flex items-center justify-center text-xl"
                        onClick={() => openModal(timeIndex, dayIndex)}
                      >
                        +
                      </button>
                    )}
                    {schedule[cellKey] && (
                      <div className="text-center">
                        <div>{schedule[cellKey].subject}</div>
                        <div>{schedule[cellKey].teacher}</div>
                      </div>
                    )}
                  </div>
                );
              })}
            </React.Fragment>
          ))}
        </div>

        <Modal
          title="Хичээл нэмэх"
          open={isModalOpen}
          onCancel={closeModal}
          footer={null}
        >
          <div>
            <div style={{ width: 300 }}>
              <h2>Choose Teacher and Subject</h2>
              <TreeSelect
                value={value}
                onChange={onChange}
                treeData={treeData.map((teacher) => ({
                  ...teacher,
                  children: teacher.children.map((subject) => ({
                    ...subject,
                    value: `${teacher.value}:${subject.value}`,
                  })),
                }))}
                placeholder="Select a teacher and a subject"
                style={{ width: "100%" }}
                treeDefaultExpandAll
                treeCheckable={false}
                showCheckedStrategy={TreeSelect.SHOW_CHILD}
                allowClear={true}
              />
              <Button onClick={handleSubmit} type="primary" className="mt-4">
                Submit
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </PageLayout>
  );
};

export default Home;
