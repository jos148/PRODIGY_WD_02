let timer;
let isRunning = false;
let startTime;
let elapsedTime = 0;
let lapTimes = [];

const display = document.getElementById("display");
const startStopButton = document.getElementById("startStopButton");
const resetButton = document.getElementById("resetButton");
const lapButton = document.getElementById("lapButton");
const lapList = document.getElementById("lapList");

// Start/Stop button functionality
startStopButton.addEventListener("click", () => {
  if (isRunning) {
    clearInterval(timer);
    startStopButton.textContent = "Start";
  } else {
    startTime = Date.now() - elapsedTime;
    timer = setInterval(updateDisplay, 10);
    startStopButton.textContent = "Pause";
  }
  isRunning = !isRunning;
});

// Reset button functionality
resetButton.addEventListener("click", () => {
  clearInterval(timer);
  isRunning = false;
  elapsedTime = 0;
  lapTimes = [];
  display.textContent = "00:00:00";
  lapList.innerHTML = "";
  startStopButton.textContent = "Start";
});

// Lap button functionality
lapButton.addEventListener("click", () => {
  if (isRunning) {
    const lapTime = formatTime(elapsedTime);
    lapTimes.push(lapTime);
    const lapItem = document.createElement("li");
    lapItem.textContent = `Lap ${lapTimes.length}: ${lapTime}`;
    lapList.appendChild(lapItem);
  }
});

// Update the stopwatch display
function updateDisplay() {
  elapsedTime = Date.now() - startTime;
  display.textContent = formatTime(elapsedTime);
}

// Format time into HH:MM:SS
function formatTime(time) {
  let seconds = Math.floor(time / 1000);
  let minutes = Math.floor(seconds / 60);
  let hours = Math.floor(minutes / 60);

  seconds = seconds % 60;
  minutes = minutes % 60;

  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

// Add leading zero for single digits
function pad(num) {
  return num < 10 ? `0${num}` : num;
}