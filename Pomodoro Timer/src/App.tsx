import React from "react";
import { useEffect, useState, useRef } from "react";
import { Button } from "react-bootstrap";
import "./App.css";
let play = false;
let aboutToFinish = false;

function App() {
  let result = useRef() as React.MutableRefObject<HTMLInputElement>;
  const [render, setRender] = useState(false);
  const [sessionTime, setSessionTime] = useState({
    hours: 0,
    minutes: 25,
    seconds: 0,
  });
  const [shortBreakTime, setShortBreakTime] = useState({
    hours: 0,
    minutes: 5,
    seconds: 0,
  });
  const [longBreakTime, setLongBreakTime] = useState({
    hours: 0,
    minutes: 15,
    seconds: 0,
  });
  const [hours, setHours] = useState(sessionTime.hours);
  const [minutes, setMinutes] = useState(sessionTime.minutes);
  const [seconds, setSeconds] = useState(sessionTime.seconds);
  const [showSettings, setShowSettings] = useState(false);
  let interval: number = 0;
  let isCancelled = false;

  const handleHours = (value: string): number => {
    value = value.slice(0, 2);
    if (+value > 23) value = "23";
    if (+value < 0) value = "0";
    return +value || 0;
  };
  const handleMinutes = (value: string): number => {
    value = value.slice(0, 2);
    if (+value > 59) value = "59";
    if (+value < 0) value = "0";
    return +value || 0;
  };
  const handleSeconds = (value: string): number => {
    value = value.slice(0, 2);
    if (+value > 59) value = "59";
    if (+value < 0) value = "0";
    return +value || 0;
  };

  useEffect(() => {
    const duration = (hours * 60 * 60 + minutes * 60 + seconds) * 1000 + 1000;
    const then = Date.now() + duration;
    interval = setInterval(() => {
      const difference = then - Date.now();
      if (difference < 60000) {
        aboutToFinish = true;
      } else {
        aboutToFinish = false;
      }
      if (!play || isCancelled || difference < 0) {
        clearInterval(interval);
        return;
      }
      setHours(
        Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      );
      setMinutes(Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)));
      setSeconds(Math.floor((difference % (1000 * 60)) / 1000));
    }, 1000);
    return () => {
      isCancelled = true;
    };
  }, [render]);

  return (
    <div className="App text-bg-dark p-5 d-flex flex-column gap-2">
      <div
        className={`display-1 fw-bolder ${aboutToFinish && "text-danger"}`}
        ref={result}
      >
        <span>{hours.toString().padStart(2, "0")}</span>:
        <span>{minutes.toString().padStart(2, "0")}</span>:
        <span>{seconds.toString().padStart(2, "0")}</span>
      </div>
      <div className="user-select-none d-flex gap-2 justify-content-center">
        {play ? (
          <span
            className="material-icons display-1"
            style={{ cursor: "pointer" }}
            onClick={() => {
              play = false;
              setRender((prev) => !prev);
            }}
          >
            stop
          </span>
        ) : (
          <span
            className="material-icons display-1"
            style={{ cursor: "pointer" }}
            onClick={() => {
              play = true;
              setRender((prev) => !prev);
            }}
          >
            play_arrow
          </span>
        )}
        <span
          className="material-icons display-1"
          style={{ cursor: "pointer" }}
          onClick={() => {
            setShowSettings((prev) => !prev);
          }}
        >
          timer
        </span>
      </div>
      {showSettings && (
        <div
          className="settings d-grid gap-5 pt-5 pb-5"
          style={{
            gridAutoFlow: "column",
            gridAutoColumns: "1fr",
          }}
        >
          <div className="d-flex flex-column gap-2">
            <h1 className="text-capitalize">session Time</h1>
            <label className="d-flex justify-content-between p-2 rounded-1 bg-secondary">
              Hours:
              <input
                type="number"
                value={sessionTime.hours || ""}
                placeholder="00"
                onChange={(e) => {
                  setSessionTime((prev) => ({
                    ...prev,
                    hours: handleHours(e.target.value),
                  }));
                }}
              />
            </label>
            <label className="d-flex justify-content-between p-2 rounded-1 bg-secondary">
              Minutes:
              <input
                type="number"
                value={sessionTime.minutes || ""}
                placeholder="00"
                onChange={(e) => {
                  setSessionTime((prev) => ({
                    ...prev,
                    minutes: handleMinutes(e.target.value),
                  }));
                }}
              />
            </label>
            <label className="d-flex justify-content-between p-2 rounded-1 bg-secondary">
              Seconds:
              <input
                type="number"
                value={sessionTime.seconds || ""}
                placeholder="00"
                onChange={(e) => {
                  setSessionTime((prev) => ({
                    ...prev,
                    seconds: handleSeconds(e.target.value),
                  }));
                }}
              />
            </label>
          </div>
          <div className="d-flex flex-column gap-2">
            <h1 className="text-capitalize">short break Time</h1>
            <label className="d-flex justify-content-between p-2 rounded-1 bg-secondary">
              Hours:
              <input
                type="number"
                value={shortBreakTime.hours || ""}
                placeholder="00"
                onChange={(e) => {
                  setShortBreakTime((prev) => ({
                    ...prev,
                    hours: handleHours(e.target.value),
                  }));
                }}
              />
            </label>
            <label className="d-flex justify-content-between p-2 rounded-1 bg-secondary">
              Minutes:
              <input
                type="number"
                value={shortBreakTime.minutes || ""}
                placeholder="00"
                onChange={(e) => {
                  setShortBreakTime((prev) => ({
                    ...prev,
                    minutes: handleMinutes(e.target.value),
                  }));
                }}
              />
            </label>
            <label className="d-flex justify-content-between p-2 rounded-1 bg-secondary">
              Seconds:
              <input
                type="number"
                value={shortBreakTime.seconds || ""}
                placeholder="00"
                onChange={(e) => {
                  setShortBreakTime((prev) => ({
                    ...prev,
                    seconds: handleSeconds(e.target.value),
                  }));
                }}
              />
            </label>
          </div>
          <div className="d-flex flex-column gap-2">
            <h1 className="text-capitalize">long break Time</h1>
            <label className="d-flex justify-content-between p-2 rounded-1 bg-secondary">
              Hours:
              <input
                type="number"
                value={longBreakTime.hours || ""}
                placeholder="00"
                onChange={(e) => {
                  setLongBreakTime((prev) => ({
                    ...prev,
                    hours: handleHours(e.target.value),
                  }));
                }}
              />
            </label>
            <label className="d-flex justify-content-between p-2 rounded-1 bg-secondary">
              Minutes:
              <input
                type="number"
                value={longBreakTime.minutes || ""}
                placeholder="00"
                onChange={(e) => {
                  setLongBreakTime((prev) => ({
                    ...prev,
                    minutes: handleMinutes(e.target.value),
                  }));
                }}
              />
            </label>
            <label className="d-flex justify-content-between p-2 rounded-1 bg-secondary">
              Seconds:
              <input
                type="number"
                value={longBreakTime.seconds || ""}
                placeholder="00"
                onChange={(e) => {
                  setLongBreakTime((prev) => ({
                    ...prev,
                    seconds: handleSeconds(e.target.value),
                  }));
                }}
              />
            </label>
          </div>
        </div>
      )}
      <div className="buttons d-flex gap-2 justify-content-center">
        <Button
          onClick={() => {
            setHours(sessionTime.hours);
            setMinutes(sessionTime.minutes);
            setSeconds(sessionTime.seconds);
            setRender((prev) => !prev);
          }}
        >
          Session
        </Button>
        <Button
          onClick={() => {
            setHours(shortBreakTime.hours);
            setMinutes(shortBreakTime.minutes);
            setSeconds(shortBreakTime.seconds);
            setRender((prev) => !prev);
          }}
        >
          Short break
        </Button>
        <Button
          onClick={() => {
            setHours(longBreakTime.hours);
            setMinutes(longBreakTime.minutes);
            setSeconds(longBreakTime.seconds);
            setRender((prev) => !prev);
          }}
        >
          Long break
        </Button>
      </div>
    </div>
  );
}

export default App;
