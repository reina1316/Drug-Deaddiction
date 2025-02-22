document.getElementById('submitDayLogButton').onclick = function() {
    const dayLogInput = document.getElementById('dayLogInput');
    const dayLogOutput = document.getElementById('dayLogOutput');

    if (dayLogInput.value.trim() === "") {
        alert("Please write something before submitting.");
        return;
    }

    // Display the submitted log
    dayLogOutput.innerHTML = <h2>Your Day Log:</h2><p>${dayLogInput.value}</p>;
    dayLogInput.value = ""; // Clear the input after submission
};
