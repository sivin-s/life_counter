import { useEffect, useState } from "react";
import { NumberComponent, Dialog } from "./components/index";
import { differenceInMilliseconds, intervalToDuration } from "date-fns";

function App() {
  // manually without 'date-fns'
  /*
  const targetDate = new Date();
  targetDate.setFullYear(targetDate.getFullYear() + 1);
  */

  const [targetDate, setTargetDate] = useState(null);
  const [startTimer, setStartTimer] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // displaying millisecond left
  const [timeLeft, setTimeLeft] = useState(
    differenceInMilliseconds(targetDate, new Date())
  );

  const [duration, setDuration] = useState({
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // local storage
  useEffect(() => {
    const userInputDate = window.localStorage.getItem("#life_counter_backup");
    if (userInputDate) {
      const date = new Date(JSON.parse(userInputDate));
      if (date > new Date()) {
        setTargetDate(date);
        setStartTimer(true);
      } else {
        window.localStorage.removeItem("#life_counter_backup");
      }
    }
  }, []);

  useEffect(() => {
    if (startTimer && targetDate) {
      const interval = setInterval(() => {
        const now = new Date();
        const newTimeLeft = differenceInMilliseconds(targetDate, now);
        if (newTimeLeft <= 0) {
          setTimeLeft(0);
          setDuration({
            years: 0,
            months: 0,
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
          });
          setStartTimer(false);
          window.localStorage.removeItem("#life_counter_backup");
        } else {
          setTimeLeft(newTimeLeft);
          setDuration(intervalToDuration({ start: now, end: targetDate }));
          const dateToString = JSON.stringify(targetDate);
          window.localStorage.setItem("#life_counter_backup", dateToString);
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [targetDate, startTimer]);

  const handleDateChange = (e) => {
    const dataString = e.target.value;

    if (dataString && new Date(dataString) > new Date()) {
      const selectedDate = new Date(dataString);
      setTargetDate(selectedDate);
    } else {
      alert("please select a valid future date.");
    }
  };

  const handleDialog = (e) => {
    e.preventDefault();
    setIsOpen((prev) => !prev);
  };

  return (
    <div
      className="container  max-w-full grid  sm:grid-cols-8 sm:grid-rows-3  grid-cols-1 grid-rows-6  h-screen
     bg-[#000000]
    "
    >
      <div className="fixed top-13 right-11">
        <button onClick={handleDialog}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="50"
            width="50"
            viewBox="0 0 448 512"
          >
            <path
              fill="#ffffff"
              d="M128 0c17.7 0 32 14.3 32 32l0 32 128 0 0-32c0-17.7 14.3-32 32-32s32 14.3 32 32l0 32 48 0c26.5 0 48 21.5 48 48l0 48H0l0-48C0 85.5 21.5 64 48 64l48 0 0-32c0-17.7 14.3-32 32-32zM0 192l448 0 0 272c0 26.5-21.5 48-48 48L48 512c-26.5 0-48-21.5-48-48L0 192zm64 80l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zm128 0l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0zM64 400l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0zm112 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16z"
            />
          </svg>
        </button>
      </div>
      {isOpen && (
        <Dialog
          handleDateChange={handleDateChange}
          setIsOpen={setIsOpen}
          setStartTimer={setStartTimer}
          startTimer={startTimer}
          targetDate={targetDate}
        />
      )}
      {/*date container*/}
      <div className="w-full h-full sm:col-[1/span8]  sm:row-[2/3] col-[1/span1] row-[1/span6] grid grid-cols-1 grid-rows-6 sm:flex sm:flex-row  sm:items-center sm:justify-center">
        {/* Years */}
        <NumberComponent value={duration.years || 0} font_size={7} text={"Y"} />
        {/* Months */}
        <NumberComponent
          value={duration.months || 0}
          font_size={7}
          text={"M"}
        />
        {/*  days */}
        <NumberComponent value={duration.days || 0} font_size={7} text={"D"} />
        {/* hours */}
        <NumberComponent value={duration.hours || 0} font_size={7} text={"H"} />
        {/* minutes */}
        <NumberComponent
          value={duration.minutes || 0}
          font_size={7}
          text={"M"}
        />
        {/* seconds */}
        <NumberComponent
          value={duration.seconds || 0}
          font_size={7}
          text={"S"}
        />
      </div>
    </div>
  );
}

export default App;
