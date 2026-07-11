"use strict";

/* ----------------------------------
   Main element references
---------------------------------- */

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


/* ----------------------------------
   Password system
---------------------------------- */

const correctPassword = "happy birthday";

function normalizePassword(value) {
  return value
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ");
}

function unlockSurprise() {
  const enteredPassword =
    normalizePassword(passwordInput.value);

  if (!enteredPassword) {
    passwordMessage.textContent =
      "Please enter the password first.";

    return;
  }

  if (enteredPassword !== correctPassword) {
    passwordMessage.textContent =
      "That password did not unlock the surprise. Try again ♡";

    passwordInput.classList.add("input-error");

    setTimeout(() => {
      passwordInput.classList.remove("input-error");
    }, 500);

    return;
  }

  passwordMessage.textContent =
    "Access granted. Your surprise is ready ♡";

  setTimeout(() => {
    passwordScreen.classList.remove("active-screen");
    questionScreen.classList.add("active-screen");
  }, 800);
}

unlockButton.addEventListener(
  "click",
  unlockSurprise
);

passwordInput.addEventListener(
  "keydown",
  (event) => {
    if (event.key === "Enter") {
      unlockSurprise();
    }
  }
);

togglePassword.addEventListener(
  "click",
  () => {
    const isPassword =
      passwordInput.type === "password";

    passwordInput.type =
      isPassword ? "text" : "password";

    togglePassword.textContent =
      isPassword ? "🙈" : "👁";
  }
);


/* ----------------------------------
   Birthday question
---------------------------------- */

yesButton.addEventListener(
  "click",
  () => {
    questionMessage.textContent =
      "Then your surprise officially begins! 🎂";

    setTimeout(() => {
      questionScreen.classList.remove("active-screen");
      loadingScreen.classList.add("active-screen");

      runLoadingSequence();
    }, 800);
  }
);

noButton.addEventListener(
  "click",
  () => {
    questionMessage.textContent =
      "Nice try, Vanshika! This surprise only opens for the birthday girl 🎂";

    noButton.animate(
      [
        { transform: "translateX(0)" },
        { transform: "translateX(-12px)" },
        { transform: "translateX(12px)" },
        { transform: "translateX(0)" }
      ],
      {
        duration: 400
      }
    );
  }
);


/* ----------------------------------
   Loading sequence
---------------------------------- */

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
    loadingMessages[messageIndex];

  const messageTimer = setInterval(() => {
    messageIndex += 1;

    if (messageIndex < loadingMessages.length) {
      loadingText.textContent =
        loadingMessages[messageIndex];
    }
  }, 750);

  setTimeout(() => {
    clearInterval(messageTimer);

    loadingScreen.classList.remove("active-screen");

    mainWebsite.classList.remove("website-hidden");
    mainWebsite.classList.add("website-visible");

    document.body.style.overflow = "auto";

    initializeRevealAnimations();
    createConfetti(80);

    window.scrollTo({
      top: 0,
      behavior: "instant"
    });
  }, 3900);
}


/* ----------------------------------
   Mobile navigation
---------------------------------- */

menuButton.addEventListener(
  "click",
  () => {
    navigationMenu.classList.toggle("open");

    menuButton.textContent =
      navigationMenu.classList.contains("open")
        ? "×"
        : "☰";
  }
);

navigationMenu
  .querySelectorAll("a")
  .forEach((navigationLink) => {
    navigationLink.addEventListener(
      "click",
      () => {
        navigationMenu.classList.remove("open");
        menuButton.textContent = "☰";
      }
    );
  });


/* ----------------------------------
   Scroll reveal animation
---------------------------------- */

function initializeRevealAnimations() {
  const revealElements =
    document.querySelectorAll(".reveal");

  const revealObserver =
    new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.14
      }
    );

  revealElements.forEach((element) => {
    revealObserver.observe(element);
  });
}


/* ----------------------------------
   Memory image modal
---------------------------------- */

const memoryCards =
  document.querySelectorAll(".memory-card");

memoryCards.forEach((memoryCard) => {
  memoryCard.addEventListener(
    "click",
    () => {
      modalImage.src =
        memoryCard.dataset.image;

      modalCaption.textContent =
        memoryCard.dataset.caption;

      imageModal.classList.add("show-modal");
      document.body.classList.add("modal-open");
    }
  );
});

function closeMemoryModal() {
  imageModal.classList.remove("show-modal");
  document.body.classList.remove("modal-open");

  setTimeout(() => {
    modalImage.src = "";
  }, 250);
}

closeImageModal.addEventListener(
  "click",
  closeMemoryModal
);

imageModal.addEventListener(
  "click",
  (event) => {
    if (event.target === imageModal) {
      closeMemoryModal();
    }
  }
);


/* ----------------------------------
   Book summaries
---------------------------------- */

const bookData = {
  atomic: {
    title: "Atomic Habits",
    author: "James Clear",
    category: "Habits & Self-growth",

    summary: [
      "This book explains how very small habits can create very big results.",
      "James Clear says that improvement does not always need a huge change.",
      "Getting only one percent better each day can change your life over time.",
      "The book teaches us to focus on systems instead of only thinking about goals.",
      "A goal tells us what we want, but a system shows us what to do every day.",
      "Our habits become stronger when they are easy, clear and satisfying.",
      "Good habits should be made visible and simple to follow.",
      "Bad habits should be made difficult and less attractive.",
      "The book also says that habits are connected to our identity.",
      "Instead of saying you want to read, think of yourself as a reader.",
      "Every small action is like a vote for the person you want to become.",
      "Progress may feel slow at first, but the results grow with time.",
      "The main lesson is to trust small improvements and remain consistent."
    ],

    why:
      "This book suits Vanshika because she loves learning and building new skills. It can help her turn big dreams into simple daily actions."
  },

  money: {
    title: "The Psychology of Money",
    author: "Morgan Housel",
    category: "Money & Human Behaviour",

    summary: [
      "This book explains that money decisions are strongly connected to human behaviour.",
      "Being good with money is not only about intelligence or mathematical knowledge.",
      "People make financial decisions based on their experiences, fears and beliefs.",
      "Two people can see the same situation and still make very different choices.",
      "The book explains the importance of saving even without a fixed reason.",
      "Savings give people freedom, control and time to make better decisions.",
      "It also teaches that becoming wealthy and staying wealthy are different skills.",
      "Earning money may require courage, but keeping it requires patience and humility.",
      "The author warns us not to compare our financial life with other people.",
      "Many people show expensive things, but we cannot see their real financial condition.",
      "Long-term growth often comes from patience and the power of compounding.",
      "A good financial plan should allow space for unexpected events and mistakes.",
      "The main lesson is that controlling behaviour is more important than predicting markets."
    ],

    why:
      "This book combines psychology, decision-making and money. It is a strong choice for someone interested in both human behaviour and business."
  },

  thinking: {
    title: "Thinking, Fast and Slow",
    author: "Daniel Kahneman",
    category: "Thinking & Decisions",

    summary: [
      "This book explains that our mind uses two different ways of thinking.",
      "The first way is fast, automatic and based on emotions or quick impressions.",
      "The second way is slower, careful and requires more mental effort.",
      "Fast thinking helps us make quick decisions in normal situations.",
      "However, it can also create mistakes, assumptions and unfair judgements.",
      "Slow thinking helps us solve difficult problems and examine facts carefully.",
      "The book explains many mental shortcuts called cognitive biases.",
      "These biases can influence how we understand risk, money and other people.",
      "We often trust information that is easy to remember even when it is incomplete.",
      "We also become too confident in our own predictions and opinions.",
      "The author shows that people may fear losses more than they value equal gains.",
      "Understanding these patterns can help us make more thoughtful decisions.",
      "The main lesson is to slow down when a decision is important or uncertain."
    ],

    why:
      "This book is excellent for a deep thinker. It can help Vanshika understand how the mind forms judgements and why people sometimes make irrational decisions."
  },

  zero: {
    title: "Zero to One",
    author: "Peter Thiel with Blake Masters",
    category: "Business & Startups",

    summary: [
      "This book is about creating something new instead of only copying existing ideas.",
      "Going from zero to one means bringing a new idea into the world.",
      "Going from one to many means repeating something that already exists.",
      "The author believes great companies solve problems in a unique way.",
      "A startup should not try to compete with everyone in a crowded market.",
      "It should begin by serving a small market extremely well.",
      "The book encourages founders to think about the future differently.",
      "A strong business should have useful technology, a good team and clear planning.",
      "The author also explains why long-term thinking is important.",
      "Successful founders often believe in an idea that most people do not yet understand.",
      "The book asks readers to identify valuable truths that other people may have missed.",
      "It teaches that innovation requires courage, focus and original thinking.",
      "The main lesson is to build something meaningful that did not exist before."
    ],

    why:
      "This book suits Vanshika because she is curious about business, technology and building original ideas instead of following ordinary paths."
  },

  courage: {
    title: "The Courage to Be Disliked",
    author: "Ichiro Kishimi & Fumitake Koga",
    category: "Psychology & Freedom",

    summary: [
      "This book presents psychological ideas through a conversation between a philosopher and a young man.",
      "It is mainly based on the ideas of psychologist Alfred Adler.",
      "The book says that our past does not have to control our entire future.",
      "We can choose how we respond to our experiences and what they mean to us.",
      "Many problems in life are connected to our relationships with other people.",
      "We often become unhappy because we compare ourselves with others.",
      "The book teaches us to separate our responsibilities from the responsibilities of others.",
      "We cannot control what another person thinks or feels about us.",
      "Trying to please everyone can take away our freedom.",
      "Being disliked by someone does not always mean we have done something wrong.",
      "Real freedom requires the courage to live according to our own values.",
      "The book also explains that happiness can come from contributing to other people.",
      "The main lesson is to accept yourself and stop building your life around approval."
    ],

    why:
      "This book can support independent thinking, confidence and emotional strength. It is ideal for someone who wants to understand both freedom and relationships."
  },

  idiots: {
    title: "Surrounded by Idiots",
    author: "Thomas Erikson",
    category: "Personality & Communication",

    summary: [
      "This book explains that people communicate and behave in different ways.",
      "The author uses four colours to describe four broad communication styles.",
      "Red personalities are direct, fast and focused on results.",
      "Yellow personalities are social, creative and enthusiastic.",
      "Green personalities are patient, calm and supportive.",
      "Blue personalities are careful, detailed and interested in facts.",
      "A person may show a mixture of more than one style.",
      "The book says that communication problems often happen because people expect others to think like them.",
      "Understanding different styles can help us speak in a way other people understand.",
      "For example, a direct person may want a quick answer without a long explanation.",
      "A detailed person may want facts before making a decision.",
      "The colour system is a simple communication tool, not a complete scientific diagnosis.",
      "The main lesson is to adapt our communication instead of immediately judging others."
    ],

    why:
      "This book is useful for understanding communication, teamwork and different personalities. It can also support business and leadership skills."
  },

  laws: {
    title: "The 48 Laws of Power",
    author: "Robert Greene",
    category: "Power & Human Behaviour",

    summary: [
      "This book studies how power has been gained, used and lost throughout history.",
      "It presents forty-eight ideas based on stories about leaders, rulers and strategists.",
      "The author explains that people often compete for influence, respect and control.",
      "Some laws focus on protecting your reputation and understanding other people's motives.",
      "The book warns against showing every plan or intention too early.",
      "It also explains how timing and patience can affect an outcome.",
      "Readers are encouraged to observe behaviour instead of trusting only words.",
      "Some examples show how pride, anger and overconfidence can create failure.",
      "The book can help readers notice manipulation and unhealthy power games.",
      "However, not every law should be followed literally or used against others.",
      "Some ideas are ethically controversial and should be examined carefully.",
      "The most useful approach is to read the book as a study of human behaviour.",
      "The main lesson is to understand power wisely without losing personal values."
    ],

    why:
      "This book may interest Vanshika because it studies strategy, leadership and human behaviour. It is best read critically, with strong personal ethics."
  },

  mountain: {
    title: "The Mountain Is You",
    author: "Brianna Wiest",
    category: "Healing & Self-growth",

    summary: [
      "This book explains how people sometimes become an obstacle in their own lives.",
      "The mountain in the title represents our fears, habits and emotional struggles.",
      "Self-sabotage happens when one part of us wants change but another part wants safety.",
      "The book encourages readers to understand their behaviour instead of only blaming themselves.",
      "Difficult emotions can carry useful information about unmet needs or fears.",
      "Avoiding emotions does not remove them and may make problems stronger.",
      "Growth requires honesty about the patterns that repeatedly hold us back.",
      "The author encourages small daily actions instead of waiting for perfect motivation.",
      "Healing also includes learning to trust yourself and accept discomfort.",
      "A new life often requires leaving behind an older version of yourself.",
      "The book teaches that emotional strength grows through awareness and responsibility.",
      "It reminds readers that change is difficult but still possible.",
      "The main lesson is that overcoming yourself can become your greatest transformation."
    ],

    why:
      "This book is reflective and encouraging. It may suit Vanshika if she enjoys thinking deeply about personal growth, emotions and becoming a stronger version of herself."
  }
};

const readButtons =
  document.querySelectorAll(".read-button");

readButtons.forEach((readButton) => {
  readButton.addEventListener(
    "click",
    () => {
      const selectedBook =
        bookData[readButton.dataset.book];

      if (!selectedBook) {
        return;
      }

      modalBookCategory.textContent =
        selectedBook.category;

      modalBookTitle.textContent =
        selectedBook.title;

      modalBookAuthor.textContent =
        selectedBook.author;

      modalBookSummary.innerHTML =
        selectedBook.summary
          .map(
            (line) =>
              `<p class="summary-line">${line}</p>`
          )
          .join("");

      modalBookWhy.textContent =
        selectedBook.why;

      bookModal.classList.add("show-modal");
      document.body.classList.add("modal-open");
    }
  );
});

function closeSummaryModal() {
  bookModal.classList.remove("show-modal");
  document.body.classList.remove("modal-open");
}

closeBookModal.addEventListener(
  "click",
  closeSummaryModal
);

bookModal.addEventListener(
  "click",
  (event) => {
    if (event.target === bookModal) {
      closeSummaryModal();
    }
  }
);


/* ----------------------------------
   Close modals using Escape key
---------------------------------- */

document.addEventListener(
  "keydown",
  (event) => {
    if (event.key !== "Escape") {
      return;
    }

    if (imageModal.classList.c
