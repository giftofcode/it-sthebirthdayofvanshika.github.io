"use strict";

document.addEventListener("DOMContentLoaded", () => {

  const celebrateButton =
    document.getElementById("celebrateButton");

  const confettiContainer =
    document.getElementById("confettiContainer");

  window.createConfetti = function (
    amount = 80
  ) {

    if (!confettiContainer) {
      return;
    }

    const colors = [
      "#ffffff",
      "#f6e7d8",
      "#d4af37",
      "#e8d3b9",
      "#ffd700",
      "#f5deb3"
    ];

    for (let i = 0; i < amount; i++) {

      const piece =
        document.createElement("span");

      piece.className =
        "confetti-piece";

      piece.style.left =
        Math.random() * 100 + "%";

      piece.style.background =
        colors[
          Math.floor(
            Math.random() *
            colors.length
          )
        ];

      piece.style.width =
        6 + Math.random() * 8 + "px";

      piece.style.height =
        8 + Math.random() * 12 + "px";

      piece.style.animationDelay =
        Math.random() * 1.5 + "s";

      piece.style.animationDuration =
        3 + Math.random() * 2 + "s";

      confettiContainer.appendChild(
        piece
      );

      setTimeout(() => {
        piece.remove();
      }, 6000);

    }

  };

  if (celebrateButton) {

    celebrateButton.addEventListener(
      "click",
      () => {

        window.createConfetti(120);

        celebrateButton.textContent =
          "Happy Birthday, Vanshika! 🎂";

        celebrateButton.disabled =
          true;

        setTimeout(() => {

          celebrateButton.textContent =
            "Celebrate Again 🎉";

          celebrateButton.disabled =
            false;

        }, 2500);

      }
    );

  }

});
