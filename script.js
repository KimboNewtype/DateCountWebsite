// Define the key dates
const START_DATE = new Date(2026, 3, 26); // March 26, 2026
const END_DATE = new Date(2026, 9, 21);   // September 21, 2026

function calculateCountdown() {
    const today = new Date();
    
    // Reset time to midnight for accurate day calculations
    today.setHours(0, 0, 0, 0);
    const startDate = new Date(START_DATE);
    startDate.setHours(0, 0, 0, 0);
    const endDate = new Date(END_DATE);
    endDate.setHours(0, 0, 0, 0);
    
    // Calculate total duration and days passed
    const totalDays = Math.floor((endDate - startDate) / (1000 * 60 * 60 * 24));
    let daysPassed = Math.floor((today - startDate) / (1000 * 60 * 60 * 24));
    let daysRemaining = Math.floor((endDate - today) / (1000 * 60 * 60 * 24));
    
    // Clamp values
    daysPassed = Math.max(0, Math.min(daysPassed, totalDays));
    daysRemaining = Math.max(0, daysRemaining);
    
    // Calculate progress percentage
    const percentComplete = Math.round((daysPassed / totalDays) * 100);
    
    return {
        daysPassed,
        daysRemaining,
        totalDays,
        percentComplete,
        today
    };
}

function formatDate(date) {
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
}

function updateDisplay() {
    const data = calculateCountdown();
    
    // Update numbers with animation
    document.getElementById('daysPassed').textContent = data.daysPassed;
    document.getElementById('daysRemaining').textContent = data.daysRemaining;
    document.getElementById('percentComplete').textContent = data.percentComplete + '%';
    
    // Update progress bar
    const progressFill = document.getElementById('progressFill');
    progressFill.style.width = data.percentComplete + '%';
    
    // Update current date
    document.getElementById('currentDate').textContent = formatDate(data.today);
}

// Update display on page load
document.addEventListener('DOMContentLoaded', updateDisplay);

// Update display every minute
setInterval(updateDisplay, 60000);
