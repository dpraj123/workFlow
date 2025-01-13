"use client";
import { useState, useEffect } from "react";
import {
  format,
  addMonths,
  subMonths,
  setDate,
  getDaysInMonth,
} from "date-fns";

// Generate a list of years
const generateYears = (start: number, end: number) => {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
};

// Generate a list of months
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// Generate a list of days for the selected month and year
const generateDays = (month: number, year: number) => {
  const daysInMonth = getDaysInMonth(new Date(year, month));
  return Array.from({ length: daysInMonth }, (_, i) => i + 1);
};

export default function Home() {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [days, setDays] = useState<number[]>([]);
  const [years] = useState<number[]>(
    generateYears(1990, new Date().getFullYear())
  );

  useEffect(() => {
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();
    setDays(generateDays(month, year));
  }, [currentDate]);

  const handleScrollDay = (event: React.WheelEvent) => {
    event.preventDefault();
    const newDay =
      event.deltaY < 0
        ? Math.min(getDaysInMonth(currentDate), currentDate.getDate() + 1)
        : Math.max(1, currentDate.getDate() - 1);

    setCurrentDate(setDate(currentDate, newDay));
  };

  const handleScrollMonth = (event: React.WheelEvent) => {
    event.preventDefault();
    const newMonth =
      event.deltaY < 0
        ? (currentDate.getMonth() + 1) % 12
        : (currentDate.getMonth() - 1 + 12) % 12;

    setCurrentDate(
      new Date(currentDate.getFullYear(), newMonth, currentDate.getDate())
    );
  };

  const handleScrollYear = (event: React.WheelEvent) => {
    event.preventDefault();
    const newYear =
      event.deltaY < 0
        ? currentDate.getFullYear() + 1
        : currentDate.getFullYear() - 1;

    setCurrentDate(
      new Date(newYear, currentDate.getMonth(), currentDate.getDate())
    );
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* Day Picker */}
        <div
          onWheel={handleScrollDay}
          style={{
            height: "50px",
            width: "60px",
            border: "1px solid #ccc",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "10px",
            cursor: "pointer",
          }}
        >
          {currentDate.getDate()}
        </div>

        {/* Month Picker */}
        <div
          onWheel={handleScrollMonth}
          style={{
            height: "50px",
            width: "100px",
            border: "1px solid #ccc",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "10px",
            cursor: "pointer",
          }}
        >
          {months[currentDate.getMonth()]}
        </div>

        {/* Year Picker */}
        <div
          onWheel={handleScrollYear}
          style={{
            height: "50px",
            width: "80px",
            border: "1px solid #ccc",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
          }}
        >
          {currentDate.getFullYear()}
        </div>
      </div>
    </div>
  );
}
"use client";
import { useState, useEffect } from "react";
import { format, addDays, subDays } from "date-fns";

// Custom range function to generate a list of dates
const generateDateList = (baseDate: Date, numDays: number) => {
  return Array.from({ length: numDays }, (_, i) => addDays(baseDate, i));
};

export default function Home() {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [dateList, setDateList] = useState<Date[]>([]);

  // Generate a list of 7 dates starting from the current date
  useEffect(() => {
    const dates = generateDateList(currentDate, 4);
    setDateList(dates);
  }, [currentDate]);

  const handleWheel = (event: React.WheelEvent) => {
    event.preventDefault();
    if (event.deltaY < 0) {
      // Scroll up, show next set of dates
      setCurrentDate((prev) => addDays(prev, 1));
    } else {
      // Scroll down, show previous set of dates
      setCurrentDate((prev) => subDays(prev, 1));
    }
  };

  return (
    <div
      className="flex pt-10 !w-[100vw] justify-center"
      onWheel={handleWheel}
      style={{
        overflowY: "auto",
        border: "1px solid #ccc",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {dateList.map((date) => (
          <div
            key={date.toString()}
            style={{
              padding: "10px",
              borderBottom: "1px solid #eee",
              textAlign: "center",
              cursor: "pointer",
            }}
            onClick={() => setCurrentDate(date)}
          >
            {format(date, "dd MMM yyyy")}
          </div>
        ))}
      </div>
    </div>
  );
}
