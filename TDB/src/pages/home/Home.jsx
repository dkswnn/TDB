import { useUser } from "@clerk/clerk-react";
import { Button, Modal, TreeSelect, Input } from "antd";
import React, { useEffect, useState } from "react";
import PageLayout from "../../layouts/PageLayout";

const Home = () => {
  const { user } = useUser();
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
  const [isHomeWorkModalOpen, setIsHomeWorkModalOpen] = useState(false);
  const [homeworkData, setHomeworkData] = useState(null);
  const [todo, setTodo] = useState([]);

  useEffect(() => {
    const savedSchedule = localStorage.getItem(`schedule-${user?.id}`);
    if (savedSchedule) {
      setSchedule(JSON.parse(savedSchedule));
    }
  }, [user?.id]);

  const toggleSchedule = () => {
    setIsEditable(!isEditable);
  };

  const openModal = (timeIndex, dayIndex, existingValue) => {
    setSelectedCell({ timeIndex, dayIndex });
    setValue(existingValue || undefined);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const onChange = (newValue) => {
    setValue(newValue);
  };

  const openHomeWorkModal = (timeIndex, dayIndex) => {
    const cellKey = `${timeIndex}-${dayIndex}`;
    const existingSchedule = schedule[cellKey];
    if (existingSchedule) {
      setHomeworkData(existingSchedule);
    } else {
      setHomeworkData(null);
    }
    setSelectedCell({ timeIndex, dayIndex });
    setIsHomeWorkModalOpen(true);
  };

  const closeHomeWorkModal = () => {
    setIsHomeWorkModalOpen(false);
    setHomeworkData(null);
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
          <h1 className="text-2xl font-bold text-center flex-grow">
            Хичээлийн хуваарь
          </h1>
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
                const existingSchedule = schedule[cellKey];
                return (
                  <div
                    key={cellKey}
                    className="border p-8 text-center bg-gray-100 relative"
                  >
                    {isEditable && !existingSchedule && (
                      <button
                        className="absolute inset-0 flex items-center justify-center text-xl"
                        onClick={() => openModal(timeIndex, dayIndex)}
                      >
                        +
                      </button>
                    )}
                    {existingSchedule && (
                      <div>
                        <div
                          onClick={() => openHomeWorkModal(timeIndex, dayIndex)}
                          className="cursor-pointer"
                        >
                          <div>{existingSchedule.subject}</div>
                          <div>{existingSchedule.teacher}</div>
                        </div>
                        {isEditable && (
                          <button
                            className="absolute top-0 right-0 mt-2 mr-2 text-blue-500"
                            onClick={() =>
                              openModal(
                                timeIndex,
                                dayIndex,
                                `${existingSchedule.teacher}:${existingSchedule.subject}`
                              )
                            }
                          >
                            Өөрчлөх
                          </button>
                        )}
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
            placeholder="Хичээлээ сонгоно уу"
            style={{ width: "100%" }}
            treeDefaultExpandAll
            allowClear={true}
          />
          <Button onClick={handleSubmit} type="primary" className="mt-4">
            Submit
          </Button>
        </Modal>

        <Modal
          title="Гэрийн даалгавар"
          open={isHomeWorkModalOpen}
          onCancel={closeHomeWorkModal}
          footer={null}
        >
          {homeworkData ? (
            <div>
              <div className="flex gap-5">
                <h3>Хичээл: {homeworkData.subject}</h3>
                <p>Багш: {homeworkData.teacher}</p>
              </div>
              <div>
                <Input />
                <Button></Button>
              </div>
            </div>
          ) : (
            <p>Мэдээлэл олдсонгүй</p>
          )}
        </Modal>
      </div>
    </PageLayout>
  );
};

export default Home;
