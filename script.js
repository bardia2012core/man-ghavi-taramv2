
let currentTurn = 1;
let score = [0, 0];
let answers = ["", ""];
let maxScore = 10;

function goToAvatar() {
  hideAll(); document.getElementById("avatar-screen").classList.remove("hidden");
}

function goToGameSetup() {
  hideAll(); document.getElementById("game-setup").classList.remove("hidden");
}

function showCredits() {
  hideAll(); document.getElementById("credits-screen").classList.remove("hidden");
}

function backToMenu() {
  hideAll(); document.getElementById("main-menu").classList.remove("hidden");
}

function hideAll() {
  document.querySelectorAll("body > div").forEach(d => d.classList.add("hidden"));
}

function loadAvatar(event, playerNum) {
  const output = document.getElementById("avatar" + playerNum);
  output.src = URL.createObjectURL(event.target.files[0]);
}

function startGame(targetScore) {
  maxScore = targetScore;
  score = [0, 0];
  answers = ["", ""];
  currentTurn = 1;
  document.getElementById("turn-indicator").textContent = "نوبت بازیکن ۱";
  document.getElementById("playerInput").value = "";
  hideAll(); document.getElementById("game-screen").classList.remove("hidden");
  document.getElementById("show-cards").classList.add("hidden");
  updateScoreboard();
}

function submitAnswer() {
  const input = document.getElementById("playerInput").value.trim();
  if (!input) return;

  answers[currentTurn - 1] = input;
  document.getElementById("playerInput").value = "";

  if (currentTurn === 1) {
    currentTurn = 2;
    document.getElementById("turn-indicator").textContent = "نوبت بازیکن ۲";
  } else {
    showBothCards();
  }
}

function showBothCards() {
  document.getElementById("p1Card").textContent = answers[0];
  document.getElementById("p2Card").textContent = answers[1];
  document.getElementById("show-cards").classList.remove("hidden");
  document.getElementById("turn-indicator").textContent = "رأی بده که کی خلاقانه‌تر بود!";
}

function voteWinner(winner) {
  score[winner - 1] += 1;
  if (score[winner - 1] >= maxScore) {
    alert("🏆 بازیکن " + winner + " برنده شد!");
  }
  startGame(maxScore);
}

function updateScoreboard() {
  document.getElementById("scoreboard").textContent =
    `امتیاز: بازیکن ۱ (${score[0]}) - بازیکن ۲ (${score[1]})`;
}
