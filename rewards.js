// Initialize points from local storage or set to default
let points = localStorage.getItem('points') ? parseInt(localStorage.getItem('points')) : 150;
document.getElementById('pointsCount').innerText = points;

// Function to unlock rewards
function unlockReward(rewardElement) {
    const requiredPoints = parseInt(rewardElement.getAttribute('data-points'));

    if (points >= requiredPoints) {
        points -= requiredPoints; // Deduct points
        localStorage.setItem('points', points); // Update local storage
        document.getElementById('pointsCount').innerText = points; // Update displayed points
        alert(`You've unlocked the reward: ${rewardElement.querySelector('h4').innerText}! 🎉`);
    } else {
        alert(`You need ${requiredPoints - points} more points to unlock this reward.`);
    }
}

// Add event listeners to unlock buttons
document.querySelectorAll('.unlock-button').forEach(button => {
    button.addEventListener('click', function() {
        const rewardCard = this.closest('.reward-card');
        unlockReward(rewardCard);
    });
});