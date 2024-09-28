// script.js
const secondHand = document.querySelector('.second-hand');
const timeDisplay = document.querySelector('.time-display');
const digitalClock = document.querySelector('.digital-clock'); // For the digital clock below
const dateDisplay = document.querySelector('.date-display'); // For the date display

function updateClock() {
    const now = new Date();

    // Update Date and Day
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    dateDisplay.textContent = now.toLocaleDateString('en-US', options);

    // Seconds
    const seconds = now.getSeconds();
    const secondDegrees = ((seconds / 60) * 360);
    secondHand.style.transform = `rotate(${secondDegrees}deg)`;

    // Hours and minutes
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const displayTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    timeDisplay.textContent = displayTime;

    // Full digital time with seconds for the digital clock below the main clock
    const fullDisplayTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    digitalClock.textContent = fullDisplayTime;

    // Calculate the angle for the digital display
    const hourIn12Format = hours % 12;
    const totalMinutes = hourIn12Format * 60 + minutes;
    const hourDegrees = (totalMinutes / 720) * 360; // 720 minutes in 12 hours = 360 degrees

    // Convert degrees to radians and calculate position on the circle's edge
    const radians = (hourDegrees - 90) * (Math.PI / 180); // Subtract 90 to align with 12:00 at top
    const radius = 150; // Radius in pixels from the center to the edge of the circle
    const x = radius * Math.cos(radians);
    const y = radius * Math.sin(radians);

    // Position the digital time display along the circle's edge
    timeDisplay.style.transform = `translate(${x}px, ${y}px)`;
}

setInterval(updateClock, 1000);
