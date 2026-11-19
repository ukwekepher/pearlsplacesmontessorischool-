
/* ====================================
   PEARLS PLACES PUZZLE GAME ENGINE
==================================== */

document.addEventListener("DOMContentLoaded", function () {

    const grid = document.getElementById("puzzleGrid");
    const movesDisplay = document.getElementById("puzzleMoves");
    const timerDisplay = document.getElementById("puzzleTimer");
    const message = document.getElementById("puzzleMessage");
    const success = document.getElementById("puzzleSuccess");
    const puzzleCard = grid && grid.closest(".puzzle-card");
    const celebration = document.getElementById("puzzleCelebration");
    const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    const shuffleButton = document.getElementById("puzzleShuffle");
    const previewButton = document.getElementById("puzzlePreview");
    const modal = document.getElementById("puzzleModal");
    const closeModal = document.getElementById("closePuzzleModal");

    if (!grid) return;

    const imagePath = "data/logo.jpeg";
    const totalPieces = 9;

    let pieces = [];
    let selectedPiece = null;
    let moves = 0;
    let seconds = 0;
    let timer = null;
    let gameStarted = false;
    let gameFinished = false;

    function formatTime(value) {
        const minutes = Math.floor(value / 60);
        const remainingSeconds = value % 60;

        return (
            String(minutes).padStart(2, "0") +
            ":" +
            String(remainingSeconds).padStart(2, "0")
        );
    }

    function startTimer() {
        if (timer || gameFinished) return;

        gameStarted = true;

        timer = setInterval(function () {
            seconds++;
            timerDisplay.textContent = formatTime(seconds);
        }, 1000);
    }

    function stopTimer() {
        clearInterval(timer);
        timer = null;
    }

    function shufflePieces() {
        pieces = Array.from(
            { length: totalPieces },
            (_, index) => index
        );

        do {
            for (let i = pieces.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));

                [pieces[i], pieces[j]] =
                    [pieces[j], pieces[i]];
            }
        } while (pieces.every((piece, index) => piece === index));
    }

    function renderPuzzle() {
        grid.innerHTML = "";

        pieces.forEach(function (piece, index) {

            const button = document.createElement("button");

            button.type = "button";
            button.className = "puzzle-piece";

            button.setAttribute(
                "aria-label",
                "Puzzle piece " + (piece + 1)
            );

            const row = Math.floor(piece / 3);
            const column = piece % 3;

            button.style.backgroundImage =
                'url("' + imagePath + '")';

            button.style.backgroundPosition =
                (column * 50) + "% " + (row * 50) + "%";

            button.addEventListener("click", function () {
                selectPiece(index, button);
            });

            grid.appendChild(button);
        });
    }

    function selectPiece(index, button) {

        if (gameFinished) return;

        if (selectedPiece === null) {

            selectedPiece = index;

            button.classList.add("selected");

            message.textContent =
                "Now select another piece to swap.";

            return;
        }

        if (selectedPiece === index) {
            selectedPiece = null;
            button.classList.remove("selected");

            message.textContent =
                "Select two pieces to swap their positions.";

            return;
        }

        startTimer();

        const first = selectedPiece;

        [pieces[first], pieces[index]] =
            [pieces[index], pieces[first]];

        moves++;

        movesDisplay.textContent = moves;

        selectedPiece = null;

        renderPuzzle();

        if (checkWin()) {
            finishGame();
        } else {
            message.textContent =
                "Good job! Keep arranging the pieces.";
        }
    }

    function checkWin() {
        return pieces.every(function (piece, index) {
            return piece === index;
        });
    }

    function triggerCelebration() {

        if (!puzzleCard || !celebration || prefersReducedMotion) return;

        const colors = ["#d6a844", "#6c32a0", "#f06b8d", "#55b8a5", "#f2c94c"];
        const confetti = document.createDocumentFragment();

        for (let i = 0; i < 32; i++) {
            const particle = document.createElement("span");
            const angle = Math.random() * Math.PI * 2;
            const distance = 90 + Math.random() * 190;

            particle.className = "puzzle-confetti";
            particle.style.setProperty(
                "--confetti-x",
                Math.cos(angle) * distance + "px"
            );
            particle.style.setProperty(
                "--confetti-y",
                Math.sin(angle) * distance - 70 + "px"
            );
            particle.style.setProperty(
                "--confetti-turn",
                Math.round(Math.random() * 720 - 360) + "deg"
            );
            particle.style.setProperty(
                "--confetti-color",
                colors[i % colors.length]
            );
            particle.style.setProperty(
                "--confetti-delay",
                Math.random() * 0.2 + "s"
            );

            confetti.appendChild(particle);
        }

        for (let i = 0; i < 5; i++) {
            const balloon = document.createElement("span");

            balloon.className = "puzzle-balloon";
            balloon.style.setProperty("--balloon-left", (7 + i * 20) + "%");
            balloon.style.setProperty(
                "--balloon-color",
                colors[(i + 1) % colors.length]
            );
            balloon.style.setProperty(
                "--balloon-delay",
                (i * 0.12) + "s"
            );
            balloon.style.setProperty(
                "--balloon-drift",
                (Math.random() * 80 - 40) + "px"
            );

            confetti.appendChild(balloon);
        }

        celebration.replaceChildren(confetti);
        puzzleCard.classList.add("celebrating");
    }

    function finishGame() {

        gameFinished = true;

        stopTimer();

        success.classList.add("show");
        triggerCelebration();

        message.textContent =
            "Excellent work! You completed the picture.";

        grid.querySelectorAll(".puzzle-piece").forEach(function (piece) {
            piece.style.cursor = "default";
        });
    }

    function newGame() {

        stopTimer();

        moves = 0;
        seconds = 0;
        selectedPiece = null;
        gameStarted = false;
        gameFinished = false;

        movesDisplay.textContent = "0";
        timerDisplay.textContent = "00:00";

        message.textContent =
            "Select two pieces to swap their positions.";

        success.classList.remove("show");
        puzzleCard.classList.remove("celebrating");
        celebration.replaceChildren();

        shufflePieces();
        renderPuzzle();
    }

    shuffleButton.addEventListener("click", newGame);

    previewButton.addEventListener("click", function () {
        modal.classList.add("active");
    });

    closeModal.addEventListener("click", function () {
        modal.classList.remove("active");
    });

    modal.addEventListener("click", function (event) {
        if (event.target === modal) {
            modal.classList.remove("active");
        }
    });

    newGame();

});
