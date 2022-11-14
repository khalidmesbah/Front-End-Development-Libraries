import { useEffect, useState } from "react";

const heaterKit = [
  {
    keyCode: 81,
    key: "Q",
    id: "Heater-1",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3",
  },
  {
    keyCode: 87,
    key: "W",
    id: "Heater-2",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3",
  },
  {
    keyCode: 69,
    key: "E",
    id: "Heater-3",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3",
  },
  {
    keyCode: 65,
    key: "A",
    id: "Heater-4",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3",
  },
  {
    keyCode: 83,
    key: "S",
    id: "Clap",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3",
  },
  {
    keyCode: 68,
    key: "D",
    id: "Open-HH",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3",
  },
  {
    keyCode: 90,
    key: "Z",
    id: "Kick-n'-Hat",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3",
  },
  {
    keyCode: 88,
    key: "X",
    id: "Kick",
    src: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3",
  },
  {
    keyCode: 67,
    key: "C",
    id: "Closed-HH",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3",
  },
];
const smoothPianoKit = [
  {
    keyCode: 81,
    key: "Q",
    id: "Chord-1",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3",
  },
  {
    keyCode: 87,
    key: "W",
    id: "Chord-2",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3",
  },
  {
    keyCode: 69,
    key: "E",
    id: "Chord-3",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3",
  },
  {
    keyCode: 65,
    key: "A",
    id: "Shaker",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3",
  },
  {
    keyCode: 83,
    key: "S",
    id: "Open-HH",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3",
  },
  {
    keyCode: 68,
    key: "D",
    id: "Closed-HH",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3",
  },
  {
    keyCode: 90,
    key: "Z",
    id: "Punchy-Kick",
    src: "https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3",
  },
  {
    keyCode: 88,
    key: "X",
    id: "Side-Stick",
    src: "https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3",
  },
  {
    keyCode: 67,
    key: "C",
    id: "Snare",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3",
  },
];

function App() {
  const [drumPads, setDrumPads] = useState(heaterKit);
  const [power, setPower] = useState(true);
  const [current, setCurrent] = useState("");
  const [volume, setVolume] = useState(0.5);

  const activateKeyboard = ({ key }: KeyboardEvent) => {
    key = key.toUpperCase();
    const availableKeys = drumPads.map((drumPad) => drumPad.key);
    if (availableKeys.includes(key)) playSound(key);
  };

  const playSound = (idSelector: string) => {
    if (!power) return;
    setCurrent(drumPads.find(({ key }) => key === idSelector)?.id || "");
    const audio = document.getElementById(idSelector) as HTMLAudioElement;
    audio.pause();
    audio.volume = volume;
    audio.currentTime = 0;
    audio.play();
  };

  useEffect(() => {
    document.addEventListener("keydown", activateKeyboard);
    return () => {
      document.removeEventListener("keydown", activateKeyboard);
    };
  }, [power, volume, drumPads]);

  return (
    <div id="drum-machine">
      <div id="drum-pads">
        {drumPads.map(({ key, src, id }) => (
          <div
            className="drum-pad"
            id={id}
            key={key}
            onClick={() => playSound(key)}
          >
            {key}
            <audio src={src} className="clip" id={key}></audio>
          </div>
        ))}
      </div>
      <div id="display">
        <button
          id="power"
          onClick={() => {
            setPower((power) => !power);
          }}
        >
          Turn Power {power === true ? "Off" : "On"} {power}
        </button>
        <input
          id="volume"
          max="1"
          min="0"
          step="0.01"
          type="range"
          value={volume}
          onChange={(e) => setVolume(e.target.value as unknown as number)}
        />
        <p id="current">{current}</p>
        <div id="bank">
          <label>
            <input
              type="radio"
              name="kit"
              defaultChecked
              onClick={() => setDrumPads(heaterKit)}
            />
            Heater Kit
          </label>
          <label>
            <input
              type="radio"
              name="kit"
              onClick={() => setDrumPads(smoothPianoKit)}
            />
            Smooth Piano Kit
          </label>
        </div>
      </div>
    </div>
  );
}

export default App;
