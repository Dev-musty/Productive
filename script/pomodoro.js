import { renderNavBar } from "./navbar.js";
renderNavBar();

// variables
let focusMin = $('.focus-min');
let focusSec = $('.focus-sec');
let breakMin = $('.break-min');
let breakSec = $('.break-sec');
const startBtn = $('.start');
const resetBtn = $('.reset');
const pauseBtn = $('.puase'); // Fix typo

let StartTimer;
let isBreakTime = false; // Track if it's break time or focus time

startBtn.click(() => {
  if (StartTimer === undefined) {
    StartTimer = setInterval(timer, 1000);
  }
});

resetBtn.click(() => {
  clearInterval(StartTimer);
  focusMin.text('25');
  focusSec.text('00');
  breakMin.text('5');
  breakSec.text('00');
  StartTimer = undefined;
  isBreakTime = false; // Reset to focus time
});

pauseBtn.click(() => {
  clearInterval(StartTimer);
  StartTimer = undefined;
});

// timer function
function timer() {
  let focusMinValue = Number(focusMin.text());
  let focusSecValue = Number(focusSec.text());
  let breakMinValue = Number(breakMin.text());
  let breakSecValue = Number(breakSec.text());

  // Focus period countdown
  if (!isBreakTime) {
    if (focusSecValue > 0) {
      focusSec.text(addZero(focusSecValue -= 1));
    } else if (focusMinValue > 0 && focusSecValue === 0) {
      focusSec.text('59');
      focusMin.text(addZero(focusMinValue -= 1));
    }

    // If focus period ends, start break time
    if (focusMinValue === 0 && focusSecValue === 0) {
      playSound(); // Play sound when focus period ends
      isBreakTime = true; // Switch to break time
    }
  } else {
    // Break period countdown
    if (breakSecValue > 0) {
      breakSec.text(addZero(breakSecValue -= 1));
    } else if (breakMinValue > 0 && breakSecValue === 0) {
      breakSec.text('59');
      breakMin.text(addZero(breakMinValue -= 1));
    }

    // When break period ends
    if (breakMinValue === 0 && breakSecValue === 0) {
      clearInterval(StartTimer); // Stop the timer
      playSound(); // Play sound when break period ends

      // Delay reset to allow sound to play
      setTimeout(() => {
        resetTimer(); // Reset timer after sound finishes
      }, 3000);
    }
  }
}

// Function to reset the timer after break period
function resetTimer() {
  focusMin.text('25'); // Reset focus period to 25:00
  focusSec.text('00');
  breakMin.text('5');  // Reset break period to 5:00
  breakSec.text('00');
  isBreakTime = false; // Reset to focus time
}

// Function to add zero padding to time values
function addZero(value) {
  return value < 10 ? `0${value}` : value;
}

// Audio play function
const audio = new Audio('../sound/sound.mp3');

async function playSound() {
  try {
    await audio.play(); // Play sound asynchronously
    setTimeout(pauseSound, 3000); // Pause after 3 seconds
  } catch (error) {
    console.error("Error playing audio:", error);
  }
}

function pauseSound() {
  audio.pause();
  audio.currentTime = 0; // Reset playback to the beginning
}
