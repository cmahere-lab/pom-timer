
let durations = {
  pomodoro: 60 * 60,
  shortBreak: 10 * 60,
  longBreak: 60 * 60
};

let currentMode = "pomodoro";
let timeLeft = durations[currentMode];
let isPaused = true;
let interval;
const alarm = new Audio("alarm.wav");

const clock = document.getElementById("clock");
const label = document.getElementById("label");
const progress = document.getElementById("progress-value");

function formatTime(seconds) {
  const h = String(Math.floor(seconds / 3600)).padStart(2, '0');
  const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
  const s = String(seconds % 60).padStart(2, '0');
  return `${h}:${m}:${s}`;
}

function updateDisplay() {
  clock.textContent = formatTime(timeLeft);
  progress.style.width = ((durations[currentMode] - timeLeft) / durations[currentMode]) * 100 + "%";
  if (currentMode === "pomodoro") label.textContent = "FOCUS TIME";
  else label.textContent = "BREAK TIME";
}

function startTimer() {
  if (interval) clearInterval(interval);
  interval = setInterval(() => {
    if (!isPaused) {
      timeLeft--;
      if (timeLeft <= 0) {
        clearInterval(interval);
        timeLeft = 0;
        alarm.play();
document.getElementById("alarm-sound").play();
      }
      updateDisplay();
    }
  }, 1000);
}

document.querySelectorAll("button[data-mode]").forEach(btn => {
  btn.addEventListener("click", () => {
    currentMode = btn.getAttribute("data-mode");
    timeLeft = durations[currentMode];
    isPaused = false;
    updateDisplay();
    startTimer();
  });
});

document.getElementById("pause-button").addEventListener("click", () => {
  isPaused = !isPaused;
});

document.querySelector("button[data-action='plus']").addEventListener("click", () => {
  timeLeft += 60;
  updateDisplay();
});

document.querySelector("button[data-action='minus']").addEventListener("click", () => {
 if (timeLeft > 0) timeLeft -= 60;
  if (timeLeft < 0) timeLeft = 0;
  updateDisplay();
});

updateDisplay();
