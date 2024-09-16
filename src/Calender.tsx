import React, { useState } from "react";
const getDaysInMonth = (month: number, year: number): number => {
  return new Date(year, month + 1, 0).getDate();
};

const getFirstDayOfMonth = (month: number, year: number): number => {
  const day = new Date(year, month, 1).getDay();
  return day === 0 ? 6 : day - 1;
};
const formatSelectedDate = (date: Date | null): string => {
  if (date) {
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "short" });
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  } else {
    return "";
  }
};
interface CalendarProps {
  showOneWayButton: boolean;
  startDate: Date | null;
  endDate: Date | null;
  setStartDate: React.Dispatch<React.SetStateAction<Date | null>>;
  setEndDate: React.Dispatch<React.SetStateAction<Date | null>>;
  setSearchf: React.Dispatch<React.SetStateAction<string>>;
  setShowToCalender: React.Dispatch<React.SetStateAction<boolean>>;
}

const FlightSearchDateCalendar: React.FC<CalendarProps> = ({
  showOneWayButton,
  startDate,
  endDate,
  setStartDate,
  setEndDate,
  setSearchf,
  setShowToCalender,
}) => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState<number>(today.getMonth());
  const [currentYear, setCurrentYear] = useState<number>(today.getFullYear());
  const handleOneWayClick = () => {
    setSearchf("One-way");
    setShowToCalender(false);
  };
  const daysOfWeek: string[] = [
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
    "Sun",
  ];

  const changeMonth = (offset: number): void => {
    let newMonth = currentMonth + offset;
    let newYear = currentYear;

    if (newMonth > 11) {
      newMonth = 0;
      newYear++;
    } else if (newMonth < 0) {
      newMonth = 11;
      newYear--;
    }

    setCurrentMonth(newMonth);
    setCurrentYear(newYear);
  };

  const handleDayClick = (year: number, month: number, day: number) => {
    const selectedDate = new Date(year, month, day);

    if (startDate && endDate) {
      setStartDate(selectedDate);
      setEndDate(null);
    } else if (startDate && !endDate) {
      if (selectedDate > startDate) {
        setEndDate(selectedDate);
        setSearchf(`${formatSelectedDate(selectedDate)}`);
      } else {
        setStartDate(selectedDate);
      }
    } else {
      setStartDate(selectedDate);
    }
  };

  const generateCalendarDays = (month: number, year: number): JSX.Element[] => {
    const days: JSX.Element[] = [];
    const todayDate = today.getDate();
    const daysInMonth = getDaysInMonth(month, year);
    const firstDayOfMonth = getFirstDayOfMonth(month, year);

    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const currentDate = new Date(year, month, day);
      const isPastDate =
        year < today.getFullYear() ||
        (year === today.getFullYear() && month < today.getMonth()) ||
        (year === today.getFullYear() &&
          month === today.getMonth() &&
          day < todayDate);
      const isBeforeStartDate = startDate && currentDate < startDate;
      const selectedDate = new Date(year, month, day);

      const isSelectedStart =
        startDate && selectedDate.toDateString() === startDate.toDateString();
      const isSelectedEnd =
        endDate && selectedDate.toDateString() === endDate.toDateString();
      const isInRange =
        startDate &&
        endDate &&
        selectedDate > startDate &&
        selectedDate < endDate;

      const handleClick = () => {
        if (!isPastDate) {
          handleDayClick(year, month, day);
        }
      };

      days.push(
        <div
          key={day}
          className={`calendar-day ${isSelectedStart ? "selected" : ""} ${
            isSelectedEnd ? "selected" : ""
          } ${isInRange ? "in-range" : ""} ${
            isPastDate || isBeforeStartDate ? "disabled" : ""
          }`}
          onClick={handleClick}
        >
          {day}
        </div>
      );
    }

    return days;
  };

  const renderCalendar = (
    month: number,
    year: number,
    buttonView: { prevButton: boolean; nextButton: boolean }
  ) => (
    <div key={`${month}-${year}`} className="calendar-month">
      <div className="calendar-header">
        {buttonView.nextButton ? (
          <button
            onClick={() => changeMonth(-1)}
            disabled={
              (month === today.getMonth() && year === today.getFullYear()) ||
              (month === currentMonth - 1 && year === currentYear)
            }
          >
            &lt;
          </button>
        ) : (
          <div></div>
        )}
        <h2>
          {new Date(year, month).toLocaleString("default", {
            month: "long",
          })}{" "}
          {year}
        </h2>
        {buttonView.prevButton ? (
          <button onClick={() => changeMonth(1)}>&gt;</button>
        ) : (
          <div></div>
        )}
      </div>
      <div className="calendar-body">
        <div className="calendar-row">
          {daysOfWeek.map((day) => (
            <div key={day} className="calendar-day-header">
              {day}
            </div>
          ))}
        </div>
        <div className="calendar-row calendar-days">
          {generateCalendarDays(month, year)}
        </div>
      </div>
    </div>
  );
  return (
    <>
      <div className="calendar-main-container">
        <div className="calendar-container">
          {[
            renderCalendar(currentMonth, currentYear, {
              prevButton: false,
              nextButton: true,
            }),
            renderCalendar(
              (currentMonth + 1) % 12,
              currentMonth === 11 ? currentYear + 1 : currentYear,
              { prevButton: true, nextButton: false }
            ),
          ]}
        </div>
        {showOneWayButton && (
          <button className="one-way-button" onClick={handleOneWayClick}>
            One Way
          </button>
        )}
      </div>
    </>
  );
};

export default FlightSearchDateCalendar;
