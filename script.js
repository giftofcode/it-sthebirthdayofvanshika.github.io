"use strict";

document.addEventListener("DOMContentLoaded", () => {
  /* ==================================================
     ELEMENT REFERENCES
  ================================================== */

  const passwordScreen =
    document.getElementById("passwordScreen");

  const questionScreen =
    document.getElementById("questionScreen");

  const loadingScreen =
    document.getElementById("loadingScreen");

  const mainWebsite =
    document.getElementById("mainWebsite");

  const passwordInput =
    document.getElementById("passwordInput");

  const unlockButton =
    document.getElementById("unlockButton");

  const togglePassword =
    document.getElementById("togglePassword");

  const passwordMessage =
    document.getElementById("passwordMessage");

  const inputRow =
    document.querySelector(".input-row");

  const yesButton =
    document.getElementById("yesButton");

  const noButton =
    document.getElementById("noButton");

  const questionMessage =
    document.getElementById("questionMessage");

  const loadingText =
    document.getElementById("loadingText");

  const menuButton =
    document.getElementById("menuButton");

  const navigationMenu =
    document.getElementById("navigationMenu");

  const imageModal =
    document.getElementById("imageModal");

  const modalImage =
    document.getElementById("modalImage");

  const modalCaption =
    document.getElementById("modalCaption");

  const closeImageModal =
    document.getElementById("closeImageModal");

  const bookModal =
    document.getElementById("bookModal");

  const closeBookModal =
    document.getElementById("closeBookModal");

  const modalBookCategory =
    document.getElementById("modalBookCategory");

  const modalBookTitle =
    document.getElementById("modalBookTitle");

  const modalBookAuthor =
    document.getElementById("modalBookAuthor");

  const modalBookSummary =
    document.getElementById("modalBookSummary");

  const modalBookWhy =
    document.getElementById("modalBookWhy");

  const celebrateButton =
    document.getElementById("celebrateButton");

  const confettiContainer =
    document.getElementById("confettiContainer");


  /* ==================================================
     SAFETY CHECK
  ================================================== */

  if (
    !passwordScreen ||
    !questionScreen ||
    !loadingScreen ||
    !mainWebsite ||
    !passwordInput ||
    !unlockButton ||
    !togglePassword ||
    !passwordMessage ||
    !yesButton ||
    !noButton ||
    !questionMessage ||
    !loadingText
  ) {
    console.error(
      "Important HTML elements are missing. Check the IDs in index.html."
    );

    return;
  }


  /* ==================================================
     SCREEN CONTROL
  ================================================== */

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


  /* ==================================================
     PASSWORD SYSTEM
  ================================================== */

  const correctPassword =
    "happy birthday";

  function normalizePassword(value) {
    return String(value)
      .trim()
      .toLowerCase()
      .replace(/\s+/g, " ");
  }

  function showPasswordError(message) {
    passwordMessage.textContent =
      message;

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
        "Incorrect password. Try: happy birthday ♡"
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
    }, 700);
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
      passwordMessage.textContent =
        "";

      passwordMessage.classList.remove(
        "success-message"
      );
    }
  );

  togglePassword.addEventListener(
    "click",
    () => {
      const passwordIsHidden =
        passwordInput.type ===
        "password";

      passwordInput.type =
        passwordIsHidden
          ? "text"
          : "password";

      togglePassword.textContent =
        passwordIsHidden
          ? "🙈"
          : "👁";

      passwordInput.focus();
    }
  );


  /* ==================================================
     YES / NO BIRTHDAY QUESTION
  ================================================== */

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
      }, 700);
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
            duration: 400,
            iterations: 1
          }
        );
      }
    }
  );


  /* ==================================================
     LOADING SEQUENCE
  ================================================== */

  const loadingMessages = [
    "Preparing your surprise…",
    "Collecting beautiful memories…",
    "Unlocking your secret library…",
    "Adding a little birthday magic…",
    "Welcome, Vanshika ♡"
  ];

  function runLoadingSequence() {
    let messageIndex = 0;

    loadingText.textContent =
      loadingMessages[0];

    const messageTimer =
      window.setInterval(() => {
        messageIndex += 1;

        if (
          messageIndex <
          loadingMessages.length
        ) {
          loadingText.textContent =
            loadingMessages[
              messageIndex
            ];
        }
      }, 750);

    window.setTimeout(() => {
      window.clearInterval(
        messageTimer
      );

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

      window.setTimeout(() => {
        createConfetti(80);
      }, 500);
    }, 3900);
  }


  /* ==================================================
     MOBILE NAVIGATION
  ================================================== */

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
          menuIsOpen ? "×" : "☰";

        menuButton.setAttribute(
          "aria-expanded",
          String(menuIsOpen)
        );
      }
    );

    navigationMenu
      .querySelectorAll("a")
      .forEach(
        (navigationLink) => {
          navigationLink.addEventListener(
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
        }
      );
  }


  /* ==================================================
     SCROLL REVEAL
  ================================================== */

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

    const revealObserver =
      new IntersectionObserver(
        (entries, observer) => {
          entries.forEach(
            (entry) => {
              if (
                entry.isIntersecting
              ) {
                entry.target.classList.add(
                  "visible"
                );

                observer.unobserve(
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
        revealObserver.observe(
          element
        );
      }
    );

    const heroReveal =
      document.querySelector(
        ".hero-content.reveal"
      );

    if (heroReveal) {
      window.setTimeout(() => {
        heroReveal.classList.add(
          "visible"
        );
      }, 150);
    }
  }


  /* ==================================================
     MEMORY IMAGE MODAL
  ================================================== */

  const memoryCards =
    document.querySelectorAll(
      ".memory-card"
    );

  memoryCards.forEach(
    (memoryCard) => {
      memoryCard.addEventListener(
        "click",
        () => {
          if (
            !imageModal ||
            !modalImage ||
            !modalCaption
          ) {
            return;
          }

          const selectedImage =
            memoryCard.dataset.image;

          const selectedCaption =
            memoryCard.dataset.caption;

          if (!selectedImage) {
            return;
          }

          modalImage.src =
            selectedImage;

          modalCaption.textContent =
            selectedCaption || "";

          imageModal.classList.add(
            "show-modal"
          );

          document.body.classList.add(
            "modal-open"
          );
        }
      );
    }
  );

  function closeMemoryModal() {
    if (!imageModal) {
      return;
    }

    imageModal.classList.remove(
      "show-modal"
    );

    document.body.classList.remove(
      "modal-open"
    );

    window.setTimeout(() => {
      if (modalImage) {
        modalImage.src = "";
      }
    }, 250);
  }

  if (closeImageModal) {
    closeImageModal.addEventListener(
      "click",
      closeMemoryModal
    );
  }

  if (imageModal) {
    imageModal.addEventListener(
      "click",
      (event) => {
        if (
          event.target === imageModal
        ) {
          closeMemoryModal();
        }
      }
    );
  }


  /* ==================================================
     BOOK DATA
  ================================================== */

  const bookData = {
    atomic: {
      title:
        "Atomic Habits",

      author:
        "James Clear",

      category:
        "Habits & Self-growth",

      summary: [
        "This book explains how very small habits can create very big results.",
        "Improvement does not always require one huge change.",
        "Getting one percent better each day can transform your life over time.",
        "The book teaches us to focus on systems instead of only focusing on goals.",
        "A goal tells us what we want, while a system tells us what to do every day.",
        "Good habits become easier when they are clear, simple and satisfying.",
        "Bad habits become weaker when they are difficult and less attractive.",
        "Habits also influence the way we see ourselves.",
        "Every useful action is a small vote for the person we want to become.",
        "Progress may feel slow at first, but consistency produces powerful results.",
        "The main lesson is to make small improvements and continue them patiently."
      ],

      why:
        "This book suits Vanshika because it can help her turn big dreams into small daily actions."
    },

    money: {
      title:
        "The Psychology of Money",

      author:
        "Morgan Housel",

      category:
        "Money & Human Behaviour",

      summary: [
        "This book explains that money decisions are closely connected to human behaviour.",
        "Being good with money is not only about intelligence or mathematics.",
        "People make financial choices based on their experiences, fears and beliefs.",
        "Two people can see the same situation and still make different decisions.",
        "Saving money gives people freedom, control and more choices.",
        "Becoming wealthy and staying wealthy require different skills.",
        "Earning money can require courage, while keeping it requires patience.",
        "The book warns us not to compare our financial life with other people.",
        "Expensive possessions do not always show a person's true financial condition.",
        "Long-term growth often comes from patience and compounding.",
        "The main lesson is that behaviour matters more than financial predictions."
      ],

      why:
        "This book combines psychology, business, money and decision-making in a simple and useful way."
    },

    thinking: {
      title:
        "Thinking, Fast and Slow",

      author:
        "Daniel Kahneman",

      category:
        "Thinking & Decisions",

      summary: [
        "This book explains that our mind uses two different ways of thinking.",
        "The first system is fast, automatic and emotional.",
        "The second system is slower, careful and logical.",
        "Fast thinking helps us make quick decisions in everyday situations.",
        "However, it can also create mistakes and unfair assumptions.",
        "Slow thinking helps us examine facts and solve difficult problems.",
        "The book explains mental shortcuts called cognitive biases.",
        "These biases influence how we understand risk, money and other people.",
        "We often become too confident in our own opinions and predictions.",
        "People usually fear losses more than they value equal gains.",
        "The main lesson is to slow down when a decision is important."
      ],

      why:
        "This book suits a deep thinker who wants to understand how people make decisions."
    },

    zero: {
      title:
        "Zero to One",

      author:
        "Peter Thiel with Blake Masters",

      category:
        "Business & Startups",

      summary: [
        "This book is about creating something new instead of copying existing ideas.",
        "Going from zero to one means bringing a new idea into the world.",
        "Going from one to many means repeating something that already exists.",
        "Great companies solve important problems in a unique way.",
        "A startup should first serve a small market extremely well.",
        "The book encourages founders to think differently about the future.",
        "A strong business needs useful technology, a good team and clear planning.",
        "Successful founders often believe in ideas other people do not yet understand.",
        "Innovation requires courage, focus and original thinking.",
        "The book asks readers to notice valuable opportunities that others have missed.",
        "The main lesson is to create something meaningful and genuinely new."
      ],

      why:
        "This book suits Vanshika because she is interested in business, technology and original ideas."
    },

    courage: {
      title:
        "The Courage to Be Disliked",

      author:
        "Ichiro Kishimi & Fumitake Koga",

      category:
        "Psychology & Freedom",

      summary: [
        "This book presents psychology through a conversation between a philosopher and a young man.",
        "It is based mainly on the ideas of psychologist Alfred Adler.",
        "The book says that our past does not have to control our future.",
        "We can choose how we respond to our experiences.",
        "Many personal problems are connected to relationships with other people.",
        "Comparison often makes people unhappy and insecure.",
        "The book teaches us to separate our responsibilities from those of others.",
        "We cannot control what other people think about us.",
        "Trying to please everyone can take away our freedom.",
        "Being disliked does not always mean that we have done something wrong.",
        "The main lesson is to accept yourself and stop living only for approval."
      ],

      why:
        "This book can support confidence, independent thinking and emotional strength."
    },

    idiots: {
      title:
        "Surrounded by Idiots",

      author:
        "Thomas Erikson",

      category:
        "Personality & Communication",

      summary: [
        "This book explains that people communicate and behave in different ways.",
        "The author uses four colours to describe broad communication styles.",
        "Red personalities are direct and focused on results.",
        "Yellow personalities are social, energetic and creative.",
        "Green personalities are calm, patient and supportive.",
        "Blue personalities are careful, detailed and interested in facts.",
        "A person can show a mixture of more than one style.",
        "Communication problems happen when we expect others to think exactly like us.",
        "Understanding different styles can improve teamwork and relationships.",
        "The colour system is a simple communication tool, not a medical diagnosis.",
        "The main lesson is to adapt our communication instead of judging people quickly."
      ],

      why:
        "This book can help Vanshika understand personalities, teamwork, communication and leadership."
    },

    laws: {
      title:
        "The 48 Laws of Power",

      author:
        "Robert Greene",

      category:
        "Power & Human Behaviour",

      summary: [
        "This book studies how power has been gained, used and lost throughout history.",
        "It presents forty-eight ideas based on rulers, leaders and strategists.",
        "The book explains that people often compete for influence, respect and control.",
        "Some laws focus on reputation, timing and understanding other people's motives.",
        "It warns aga
