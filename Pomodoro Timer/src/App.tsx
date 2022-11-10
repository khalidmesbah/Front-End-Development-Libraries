import React from "react";
import { useEffect, useState, useRef } from "react";
import { Button } from "react-bootstrap";
import "./App.css";
let play = false;
let aboutToFinish = false;
interface time {
  hours: number;
  minutes: number;
  seconds: number;
}
let current: time;
let numOfSession: number = 0;

function App() {
  let result = useRef() as React.MutableRefObject<HTMLInputElement>;
  const [render, setRender] = useState(false);
  const [sessionTime, setSessionTime] = useState({
    hours: 0,
    minutes: 0,
    seconds: 5,
  });
  const [shortBreakTime, setShortBreakTime] = useState({
    hours: 0,
    minutes: 0,
    seconds: 3,
  });
  const [longBreakTime, setLongBreakTime] = useState({
    hours: 0,
    minutes: 0,
    seconds: 4,
  });
  const [maxNumOfSession, setMaxNumOfSessions] = useState(2);
  const [hours, setHours] = useState(sessionTime.hours);
  const [minutes, setMinutes] = useState(sessionTime.minutes);
  const [seconds, setSeconds] = useState(sessionTime.seconds);

  const clearIntervals = () => {
    const interval_id = window.setInterval(function () {},
    Number.MAX_SAFE_INTEGER);
    for (let i = 1; i < interval_id; i++) {
      window.clearInterval(i);
    }
  };

  const next = (next: time) => {
    clearIntervals();
    const { hours, minutes, seconds } = next;
    current = next;
    setHours(hours);
    setMinutes(minutes);
    setSeconds(seconds);
    setRender((prev) => !prev);
  };

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
    console.log(`------------------reRender App------------------`);
  });

  useEffect(() => {
    const duration = (hours * 60 * 60 + minutes * 60 + seconds) * 1000 + 1000;
    const then = Date.now() + duration;
    interval = setInterval(() => {
      if (!play || isCancelled) return;
      const difference = then - Date.now();
      if (difference < 60000) {
        aboutToFinish = true;
      } else {
        aboutToFinish = false;
      }
      if (difference < 0) {
        if (current === sessionTime || !current) {
          if (++numOfSession === maxNumOfSession) {
            numOfSession = 0;
            next(longBreakTime);
          } else {
            next(shortBreakTime);
          }
        } else if (current === shortBreakTime) {
          next(sessionTime);
        } else if (current === longBreakTime) {
          next(sessionTime);
        }
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
      <h1>
        {current === shortBreakTime
          ? "Short Break"
          : current === longBreakTime
          ? "Long Break"
          : "Session"}
      </h1>
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
        <>
          <label>
            Number of sessions for a long break:
            <input
              className="ms-2"
              type="number"
              value={maxNumOfSession}
              onChange={(e) => {
                let value = +e.target.value.slice(0, 1);
                if (value > 9) value = 9;
                if (value < 2) value = 2;
                setMaxNumOfSessions(value);
              }}
            />
          </label>
          <div
            className="settings d-grid gap-5 pt-5 pb-5"
            style={{
              gridTemplateColumns: "repeat(auto-fit,minmax(325px,1fr))",
              justifyItems: "center",
            }}
          >
            <div className="d-flex flex-column gap-2">
              <h1 className="text-capitalize">session Time</h1>
              <label className="d-flex justify-content-between flex-wrap p-2 rounded-1 bg-secondary">
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
              <label className="d-flex justify-content-between flex-wrap p-2 rounded-1 bg-secondary">
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
              <label className="d-flex justify-content-between flex-wrap p-2 rounded-1 bg-secondary">
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
              <label className="d-flex justify-content-between flex-wrap p-2 rounded-1 bg-secondary">
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
              <label className="d-flex justify-content-between flex-wrap p-2 rounded-1 bg-secondary">
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
              <label className="d-flex justify-content-between flex-wrap p-2 rounded-1 bg-secondary">
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
              <label className="d-flex justify-content-between flex-wrap p-2 rounded-1 bg-secondary">
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
              <label className="d-flex justify-content-between flex-wrap p-2 rounded-1 bg-secondary">
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
              <label className="d-flex justify-content-between flex-wrap p-2 rounded-1 bg-secondary">
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
        </>
      )}
      <div className="buttons d-flex gap-2 justify-content-center flex-wrap">
        <Button onClick={() => next(sessionTime)}>Session</Button>
        <Button onClick={() => next(shortBreakTime)}>Short break</Button>
        <Button onClick={() => next(longBreakTime)}>Long break</Button>
      </div>
    </div>
  );
}

export default App;
