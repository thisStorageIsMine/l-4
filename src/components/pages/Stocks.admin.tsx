import { ChangeEventHandler, ReactNode, useState } from "react";
import { Input } from "../ui";

const StocksAdmin = () => {
  const [activeTab, setActiveTab] = useState("day");

  return (
    <section className="flex flex-col w-full min-h-screen p-10">
      <div>
        <h1 className="mb-3">Создавайте Акции</h1>

        <div className="flex gap-2 p-2">
          <Tab active={activeTab === "day"} onClick={() => setActiveTab("day")}>
            {" "}
            Акция дня
          </Tab>
          <Tab
            active={activeTab === "week"}
            onClick={() => setActiveTab("week")}
          >
            {" "}
            Акция недели
          </Tab>
          <Tab
            active={activeTab === "month"}
            onClick={() => setActiveTab("month")}
          >
            {" "}
            Акция месяца
          </Tab>
        </div>
      </div>

      <div className="justify-self-center grow flex justify-start items-center">
        <DayStock isActive={activeTab === "day"} />
        <WeekStock isActive={activeTab === "week"} />
        <MonthStock isActive={activeTab === "month"} />
      </div>
    </section>
  );
};
export { StocksAdmin };

interface ITabProps {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}

const Tab = ({ active, children, onClick }: ITabProps) => {
  return (
    <button className={`${active ? "ring-1" : ""}`} onClick={onClick}>
      {children}
    </button>
  );
};

interface IStockAdminInterface {
  isActive: boolean;
}

const WeekStock = ({ isActive }: IStockAdminInterface) => {
  if (!isActive) {
    return <></>;
  }

  return (
    <section className="flex flex-col gap-2">
      <label>
        Выберите неделю акции:
        <Input type="week" />
      </label>

      <label>
        Изображение:
        <input type="file" />
      </label>

      <label>
        Описание:
        <textarea></textarea>
      </label>
    </section>
  );
};

const DayStock = ({ isActive }: IStockAdminInterface) => {
  if (!isActive) {
    return <></>;
  }
  return (
    <section className="flex flex-col gap-2">
      <label>
        Выберите день акции:
        <Input type="date" />
      </label>

      <label>
        Время начала:
        <Input type="time" />
      </label>

      <label>
        Время конца:
        <Input type="time" />
      </label>

      <label>
        Изображение:
        <input type="file" />
      </label>

      <label>
        Описание:
        <textarea></textarea>
      </label>
    </section>
  );
};

const MonthStock = ({ isActive }: IStockAdminInterface) => {
  if (!isActive) {
    return <></>;
  }
  return (
    <section className="flex flex-col gap-2">
      <label>
        Выберите день акции:
        <Input type="month" />
      </label>

      <label>
        Время день начала:
        <Input type="date" />
      </label>

      <label>
        Время день конца:
        <Input type="time" />
        <label>
          Изображение:
          <input type="file" />
        </label>
        <label>
          Описание:
          <textarea></textarea>
        </label>
      </label>
    </section>
  );
};

const daySelector = (onClick: (text: string) => void) => {
  const handleChange: ChangeEventHandler<HTMLSelectElement> = (e) => {
    onClick(e.target.value);
  };

  return (
    <select onChange={handleChange}>
      <option>Понедельник</option>
      <option>Вторник</option>
      <option>Среда</option>
      <option>Четверг</option>
      <option>Пятница</option>
      <option>Суббота</option>
      <option>Всокресенье</option>
    </select>
  );
};
