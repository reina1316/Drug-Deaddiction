let streakCount = 0;

// Load streak count from local storage
window.onload = function() {
    const storedStreak = localStorage.getItem('streakCount');
    if (storedStreak) {
        streakCount = parseInt(storedStreak);
        document.getElementById('streakCount').innerText = streakCount;
    }
};

// Handle daily login
document.getElementById('loginButton').onclick = function() {
    const lastLoginDate = localStorage.getItem('lastLoginDate');
    const today = new Date().toDateString();

    if (lastLoginDate !== today) {
        streakCount++;
        localStorage.setItem('streakCount', streakCount);
        localStorage.setItem('lastLoginDate', today);
        document.getElementById('streakCount').innerText = streakCount;
        alert('You have logged in today! Your streak has been updated.');
    } else {
        alert('You have already logged in today. Keep it up!');
    }
};

// Handle daily log update
document.getElementById('dayLogButton').onclick = function() {
    const lastLogDate = localStorage.getItem('lastLogDate');
    const today = new Date().toDateString();

    if (lastLogDate !== today) {
        streakCount++;
        localStorage.setItem('streakCount', streakCount);
        localStorage.setItem('lastLogDate', today);
        document.getElementById('streakCount').innerText = streakCount;
        alert('Thank you for logging your day! Your streak has been updated.');
    } else {
        alert('You have already logged your day today. Keep it up!');
    }
};

// Handle meme upload
document.getElementById('uploadButton').onclick = function() {
    const memeInput = document.getElementById('memeInput');
    const memeContainer = document.getElementById('memeContainer');

    if (memeInput.files.length > 0) {
        const file = memeInput.files[0];
        const reader = new FileReader();

        reader.onload = function(e) {
            const img = document.createElement('img');
            img.src = e.target.result;
            img.alt = 'Uploaded Meme';
            img.style.width = '100px'; // Set a fixed width for the images
            img.style.margin = '5px';
            memeContainer.appendChild(img);
        };

        reader.readAsDataURL(file);
        memeInput.value = ''; // Clear the input
    } else {
        alert('Please select a meme to upload.');
    }
};