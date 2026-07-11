"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const $ = (id) => document.getElementById(id);

  const passwordScreen = $("passwordScreen");
  const questionScreen = $("questionScreen");
  const loadingScreen = $("loadingScreen");
  const mainWebsite = $("mainWebsite");

  const passwordInput = $("passwordInput");
  const unlockButton = $("unlockButton");
  const togglePassword = $("togglePassword");
  const passwordMessage = $("passwordMessage");
  const inputRow = document.querySelector(".input-row");

  const yesButton = $("yesButton");
  const noButton = $("noButton");
  const questionMessage = $("questionMessage");
  const loadingText = $("loadingText");

  const menuButton = $("menuButton");
  const navigationMenu = $("navigationMenu");

  const requiredElements = [
    passwordScreen,
    questionScreen,
    loadingScreen,
    mainWebsite,
    passwordInput,
    unlockButton,
    togglePassword,
    passwordMessage,
    yesButton,
    noButton,
    questionMessage,
    loadingText
  ];

  if (requiredElements.some((element) => !element)) {
    console.error(
      "Required HTML elements are missing. Check the IDs in index.html."
    );

    return;
  }

  function showGateScreen(screenToShow) {
    const gateScreens =
      document.querySelectorAll(".gate-screen");

    gateScreens.forEach((screen) => {
      screen.classList.remove("active-screen");
    });

    if (screenToShow) {
      screenToShow.classList.add("active-screen");
    }
  }

  const correctPassword = "happy birthday";

  function normalizePassword(value) {
    return String(value)
      .trim()
      .toLowerCase()
      .replace(/\s+/g, " ");
  }

  function showPasswordError(message) {
    passwordMessage.textContent = message;

    passwordMessage.classList.remove(
      "success-message"
    );

    if (inputRow) {
      inputRow.classList.remove(
        "input-error"
      );

      void inputRow.offsetWidth;

      inputRow.classList.add(
        "input-error"
      );

      window.setTimeout(() => {
        inputRow.classList.remove(
          "input-error"
        );
      }, 500);
    }
  }

  function unlockSurprise() {
    const enteredPassword =
      normalizePassword(
        passwordInput.value
      );

    if (!enteredPassword) {
      showPasswordError(
        "Please enter the password first."
      );

      passwordInput.focus();

      return;
    }

    if (
      enteredPassword !==
      correctPassword
    ) {
      showPasswordError(
        "Incorrect password. Type: happy birthday"
      );

      passwordInput.select();

      return;
    }

    passwordMessage.textContent =
      "Access granted. Your surprise is ready ♡";

    passwordMessage.classList.add(
      "success-message"
    );

    unlockButton.disabled = true;

    window.setTimeout(() => {
      showGateScreen(
        questionScreen
      );

      unlockButton.disabled = false;
    }, 650);
  }

  unlockButton.addEventListener(
    "click",
    unlockSurprise
  );

  passwordInput.addEventListener(
    "keydown",
    (event) => {
      if (event.key === "Enter") {
        event.preventDefault();

        unlockSurprise();
      }
    }
  );

  passwordInput.addEventListener(
    "input",
    () => {
      passwordMessage.textContent = "";

      passwordMessage.classList.remove(
        "success-message"
      );
    }
  );

  togglePassword.addEventListener(
    "click",
    () => {
      const isHidden =
        passwordInput.type ===
        "password";

      passwordInput.type =
        isHidden
          ? "text"
          : "password";

      togglePassword.textContent =
        isHidden
          ? "🙈"
          : "👁";

      passwordInput.focus();
    }
  );

  yesButton.addEventListener(
    "click",
    () => {
      questionMessage.textContent =
        "Then your surprise officially begins! 🎂";

      questionMessage.classList.add(
        "success-message"
      );

      yesButton.disabled = true;
      noButton.disabled = true;

      window.setTimeout(() => {
        showGateScreen(
          loadingScreen
        );

        loadingScreen.classList.add(
          "loading-screen-running"
        );

        runLoadingSequence();
      }, 650);
    }
  );

  noButton.addEventListener(
    "click",
    () => {
      questionMessage.textContent =
        "Nice try, Vanshika! This surprise only opens for the birthday girl 🎂";

      questionMessage.classList.remove(
        "success-message"
      );

      if (
        typeof noButton.animate ===
        "function"
      ) {
        noButton.animate(
          [
            {
              transform:
                "translateX(0)"
            },
            {
              transform:
                "translateX(-12px)"
            },
            {
              transform:
                "translateX(12px)"
            },
            {
              transform:
                "translateX(0)"
            }
          ],
          {
            duration: 400
          }
        );
      }
    }
  );

  const loadingMessages = [
    "Preparing your surprise…",
    "Collecting beautiful memories…",
    "Unlocking your secret library…",
    "Adding a little birthday magic…",
    "Welcome, Vanshika ♡"
  ];

  function runLoadingSequence() {
    let index = 0;

    loadingText.textContent =
      loadingMessages[index];

    const timer =
      window.setInterval(() => {
        index += 1;

        if (
          index <
          loadingMessages.length
        ) {
          loadingText.textContent =
            loadingMessages[index];
        }
      }, 700);

    window.setTimeout(() => {
      window.clearInterval(timer);

      showGateScreen(null);

      mainWebsite.classList.remove(
        "website-hidden"
      );

      mainWebsite.classList.add(
        "website-visible"
      );

      document.body.style.overflow =
        "auto";

      window.scrollTo({
        top: 0,
        behavior: "auto"
      });

      initializeRevealAnimations();

      if (
        typeof window.createConfetti ===
        "function"
      ) {
        window.setTimeout(() => {
          window.createConfetti(80);
        }, 400);
      }
    }, 3600);
  }

  if (
    menuButton &&
    navigationMenu
  ) {
    menuButton.addEventListener(
      "click",
      () => {
        const menuIsOpen =
          navigationMenu.classList.toggle(
            "open"
          );

        menuButton.textContent =
          menuIsOpen
            ? "×"
            : "☰";

        menuButton.setAttribute(
          "aria-expanded",
          String(menuIsOpen)
        );
      }
    );

    navigationMenu
      .querySelectorAll("a")
      .forEach((link) => {
        link.addEventListener(
          "click",
          () => {
            navigationMenu.classList.remove(
              "open"
            );

            menuButton.textContent =
              "☰";

            menuButton.setAttribute(
              "aria-expanded",
              "false"
            );
          }
        );
      });
  }

  function initializeRevealAnimations() {
    const revealElements =
      document.querySelectorAll(
        ".reveal"
      );

    if (
      !(
        "IntersectionObserver" in
        window
      )
    ) {
      revealElements.forEach(
        (element) => {
          element.classList.add(
            "visible"
          );
        }
      );

      return;
    }

    const observer =
      new IntersectionObserver(
        (
          entries,
          currentObserver
        ) => {
          entries.forEach(
            (entry) => {
              if (
                entry.isIntersecting
              ) {
                entry.target.classList.add(
                  "visible"
                );

                currentObserver.unobserve(
                  entry.target
                );
              }
            }
          );
        },
        {
          threshold: 0.12
        }
      );

    revealElements.forEach(
      (element) => {
        observer.observe(
          element
        );
      }
    );

    const hero =
      document.querySelector(
        ".hero-content.reveal"
      );

    if (hero) {
      window.setTimeout(() => {
        hero.classList.add(
          "visible"
        );
      }, 150);
    }
  }

  document.addEventListener(
    "keydown",
    (event) => {
      if (event.key !== "Escape") {
        return;
      }

      if (
        navigationMenu &&
        navigationMenu.classList.contains(
          "open"
        )
      ) {
        navigationMenu.classList.remove(
          "open"
        );

        if (menuButton) {
          menuButton.textContent =
            "☰";

          menuButton.setAttribute(
            "aria-expanded",
            "false"
          );
        }
      }
    }
  );

  showGateScreen(
    passwordScreen
  );

  mainWebsite.classList.add(
    "website-hidden"
  );

  document.body.style.overflow =
    "hidden";

  window.setTimeout(() => {
    passwordInput.focus();
  }, 300);
});
