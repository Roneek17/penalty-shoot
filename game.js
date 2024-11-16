const goalkeeper = document.getElementById("goalkeeper");
const ball = document.getElementById("ball");
const result = document.getElementById("result");
const goalsDisplay = document.getElementById("goals");
const missesDisplay = document.getElementById("misses");
const attemptsDisplay = document.getElementById("attempts");
const goalArea = document.querySelector(".goal-area");
const cheeringSound = document.getElementById("cheering-sound");
const ballHitSound = document.getElementById("ball-hit-sound");
const goalSound = document.getElementById("goal-sound");

let goals = 0;
let misses = 0;
let attempts = 0;

cheeringSound.play();

const goalBoundary = {
    left: 20,
    right: 80,
    top: 20,
    bottom: 65
};

function randomDive() {
    const x = Math.random() * (goalBoundary.right - goalBoundary.left) + goalBoundary.left;
    const y = Math.random() * (goalBoundary.bottom - goalBoundary.top) + goalBoundary.top;
    goalkeeper.style.left = `${x}%`;
    goalkeeper.style.top = `${y}%`;
    return { x, y };
}

function shoot(event) {
    attempts++;

    ballHitSound.currentTime = 0; 
    ballHitSound.play();

    const rect = goalArea.getBoundingClientRect();
    let clickX = ((event.clientX - rect.left) / rect.width) * 100; 
    let clickY = ((event.clientY - rect.top) / rect.height) * 100; 

    
    clickX = Math.max(goalBoundary.left, Math.min(clickX, goalBoundary.right));
    clickY = Math.max(goalBoundary.top, Math.min(clickY, goalBoundary.bottom));

   
    ball.style.left = `${clickX}%`;
    ball.style.top = `${clickY}%`;

    
    const divePosition = randomDive();

    setTimeout(() => {
        const distance = Math.hypot(divePosition.x - clickX, divePosition.y - clickY);
        const saveThreshold = 25; 
        if (distance < saveThreshold) {
            result.textContent = "What a save!";
            misses++;
        } else {
            result.textContent = "GOOOAAALL!!!";
            goals++;
            goalSound.currentTime = 0; 
            goalSound.play(); 
        }
        updateScoreboard();
        resetPositions();
    }, 500);
}


function updateScoreboard() {
    goalsDisplay.textContent = goals;
    missesDisplay.textContent = misses;
    attemptsDisplay.textContent = attempts;
}


function resetPositions() {
    goalkeeper.style.left = "50%";
    goalkeeper.style.top = "60%";
    ball.style.left = "50%";
    ball.style.top = "90%";
}

goalArea.addEventListener("click", shoot);
