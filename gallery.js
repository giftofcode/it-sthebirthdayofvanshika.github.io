"use strict";

document.addEventListener("DOMContentLoaded", () => {

  const imageModal =
    document.getElementById("imageModal");

  const modalImage =
    document.getElementById("modalImage");

  const modalCaption =
    document.getElementById("modalCaption");

  const closeImageModal =
    document.getElementById("closeImageModal");

  if (
    !imageModal ||
    !modalImage ||
    !modalCaption ||
    !closeImageModal
  ) {
    return;
  }

  const memoryCards =
    document.querySelectorAll(".memory-card");

  memoryCards.forEach((card) => {

    card.addEventListener("click", () => {

      modalImage.src =
        card.dataset.image || "";

      modalCaption.textContent =
        card.dataset.caption || "";

      imageModal.classList.add(
        "show-modal"
      );

      document.body.classList.add(
        "modal-open"
      );

    });

  });

  function closeMemoryModal() {

    imageModal.classList.remove(
      "show-modal"
    );

    document.body.classList.remove(
      "modal-open"
    );

    setTimeout(() => {
      modalImage.src = "";
    }, 200);

  }

  closeImageModal.addEventListener(
    "click",
    closeMemoryModal
  );

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

  document.addEventListener(
    "keydown",
    (event) => {

      if (
        event.key === "Escape" &&
        imageModal.classList.contains(
          "show-modal"
        )
      ) {
        closeMemoryModal();
      }

    }
  );

});
