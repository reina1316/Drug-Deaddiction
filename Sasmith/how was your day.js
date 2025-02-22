// Handle submission of the daily log
document.getElementById('submitDayLogButton').onclick = function() {
    const dayLogInput = document.getElementById('dayLogInput').value;
    const confirmationMessage = document.getElementById('confirmationMessage');

    if (dayLogInput.trim() === '') {
        alert('Please write something about your day before submitting.');
        return;
    }

    // Update the streak count
    let streakCount = localStorage.getItem('streakCount') ? parseInt(localStorage.getItem('streakCount')) : 0;
    const lastLogDate = localStorage.getItem('lastLogDate');
    const today = new Date().toDateString();

    if (lastLogDate !== today) {
        streakCount++;
        localStorage.setItem('streakCount', streakCount);
        localStorage.setItem('lastLogDate', today);
    }

    // Show confirmation message
    confirmationMessage.style.display = 'block';
    document.getElementById('dayLogInput').value = ''; // Clear the input
};