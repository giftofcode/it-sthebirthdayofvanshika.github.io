"use strict";

document.addEventListener("DOMContentLoaded", () => {

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


  if (
    !bookModal ||
    !closeBookModal ||
    !modalBookCategory ||
    !modalBookTitle ||
    !modalBookAuthor ||
    !modalBookSummary ||
    !modalBookWhy
  ) {
    return;
  }


  const bookData = {

    atomic: {
      title: "Atomic Habits",
      author: "James Clear",
      category: "Habits & Self Growth",

      summary: [
        "Small habits create big changes.",
        "Improve only one percent every day.",
        "Focus on systems instead of goals.",
        "Good habits should be easy.",
        "Bad habits should be difficult.",
        "Your habits build your identity.",
        "Consistency is more important than motivation.",
        "Tiny actions create huge success.",
        "Every action is a vote for your future self.",
        "Keep improving patiently."
      ],

      why:
        "Perfect for building discipline and daily growth."
    },

    money: {
      title: "The Psychology of Money",
      author: "Morgan Housel",
      category: "Money & Behaviour",

      summary: [
        "Money is mostly about behaviour.",
        "Saving creates freedom.",
        "Patience creates wealth.",
        "Don't compare yourself to others.",
        "Financial success needs self control.",
        "Luck and risk both matter.",
        "Think long term.",
        "Protect your future.",
        "Control emotions.",
        "Money should create peace."
      ],

      why:
        "A perfect business and finance book."
    },

    thinking: {
      title: "Thinking, Fast and Slow",
      author: "Daniel Kahneman",
      category: "Psychology",

      summary: [
        "The brain has two thinking systems.",
        "One is fast.",
        "One is slow.",
        "Fast thinking creates shortcuts.",
        "Slow thinking creates better decisions.",
        "Bias affects judgement.",
        "Emotions affect choices.",
        "Think carefully before important decisions.",
        "Don't trust first impressions always.",
        "Logic wins over assumptions."
      ],

      why:
        "Excellent for understanding human psychology."
    },

    zero: {
      title: "Zero to One",
      author: "Peter Thiel",
      category: "Business",

      summary: [
        "Create something new.",
        "Don't copy others.",
        "Innovation builds great companies.",
        "Small markets are powerful.",
        "Think differently.",
        "Solve unique problems.",
        "Create the future.",
        "Technology changes the world.",
        "Original ideas matter.",
        "Build instead of compete."
      ],

      why:
        "Perfect for startup thinking."
    },

    courage: {
      title: "The Courage to Be Disliked",
      author: "Ichiro Kishimi",
      category: "Psychology",

      summary: [
        "You are not controlled by your past.",
        "Comparison steals happiness.",
        "Accept yourself.",
        "Be independent.",
        "Don't live for approval.",
        "Relationships matter.",
        "Choose your future.",
        "Freedom needs courage.",
        "Respect yourself.",
        "Live your own life."
      ],

      why:
        "One of the best psychology books."
    },

    idiots: {
      title: "Surrounded by Idiots",
      author: "Thomas Erikson",
      category: "Communication",

      summary: [
        "People communicate differently.",
        "Understand personality types.",
        "Improve teamwork.",
        "Improve communication.",
        "Listen carefully.",
        "Don't judge quickly.",
        "Adapt your style.",
        "Understand behaviour.",
        "Build relationships.",
        "Respect differences."
      ],

      why:
        "Helps understand different personalities."
    },

    laws: {
      title: "The 48 Laws of Power",
      author: "Robert Greene",
      category: "Strategy",

      summary: [
        "Learn from history.",
        "Observe people carefully.",
        "Protect your reputation.",
        "Stay patient.",
        "Think strategically.",
        "Understand influence.",
        "Avoid unnecessary conflict.",
        "Notice manipulation.",
        "Control emotions.",
        "Use wisdom with ethics."
      ],

      why:
        "A strategy book, not a rulebook."
    },

    mountain: {
      title: "The Mountain Is You",
      author: "Brianna Wiest",
      category: "Self Growth",

      summary: [
        "Face your fears.",
        "Stop self sabotage.",
        "Accept emotions.",
        "Heal yourself.",
        "Small changes matter.",
        "Trust yourself.",
        "Become stronger.",
        "Growth is uncomfortable.",
        "Believe in yourself.",
        "Transform your life."
      ],

      why:
        "Wonderful for personal growth."
    }

  };


  document
    .querySelectorAll(".read-button")
    .forEach((button) => {

      button.addEventListener("click", () => {

        const book =
          bookData[button.dataset.book];

        if (!book) return;

        modalBookCategory.textContent =
          book.category;

        modalBookTitle.textContent =
          book.title;

        modalBookAuthor.textContent =
          book.author;

        modalBookSummary.innerHTML = "";

        book.summary.forEach((line) => {

          const paragraph =
            document.createElement("p");

          paragraph.className =
            "summary-line";

          paragraph.textContent =
            line;

          modalBookSummary.appendChild(
            paragraph
          );

        });

        modalBookWhy.textContent =
          book.why;

        bookModal.classList.add(
          "show-modal"
        );

        document.body.classList.add(
          "modal-open"
        );

      });

    });


  function closeSummary() {

    bookModal.classList.remove(
      "show-modal"
    );

    document.body.classList.remove(
      "modal-open"
    );

  }


  closeBookModal.addEventListener(
    "click",
    closeSummary
  );


  bookModal.addEventListener(
    "click",
    (event) => {

      if (
        event.target === bookModal
      ) {
        closeSummary();
      }

    }
  );


  document.addEventListener(
    "keydown",
    (event) => {

      if (
        event.key === "Escape" &&
        bookModal.classList.contains(
          "show-modal"
        )
      ) {
        closeSummary();
      }

    }
  );

});
