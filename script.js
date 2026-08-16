document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');

        if (targetId && targetId.startsWith('#')) {
            const target = document.querySelector(targetId);

            if (target) {
                e.preventDefault();

                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});
// =========================
// PROOF OF WORK IMAGE MODAL
// =========================

document.addEventListener("DOMContentLoaded", function () {

    const proofModal = document.getElementById("proofModal");
    const proofModalImage = document.getElementById("proofModalImage");
    const proofModalClose = document.querySelector(".proof-modal-close");

    const proofPrev = document.querySelector(".proof-modal-prev");
    const proofNext = document.querySelector(".proof-modal-next");
    const proofCounter = document.querySelector(".proof-modal-counter");

    const proofThumbs = Array.from(
        document.querySelectorAll(".proof-thumb")
    );

    // Check that the modal elements exist
    if (!proofModal || !proofModalImage || !proofModalClose) {
        console.log("Proof of Work modal elements not found.");
        return;
    }

    let currentIndex = 0;


    // =========================
    // OPEN IMAGE
    // =========================

    function openProofModal(index) {

        if (!proofThumbs[index]) return;

        const image = proofThumbs[index].querySelector("img");

        if (!image) return;

        currentIndex = index;

        proofModalImage.src = image.src;
        proofModalImage.alt = image.alt;

        proofModal.style.display = "flex";

        document.body.style.overflow = "hidden";

        updateProofNavigation();
    }


    // =========================
    // UPDATE NAVIGATION
    // =========================

    function updateProofNavigation() {

        const total = proofThumbs.length;

        // Counter
        if (proofCounter) {
            proofCounter.textContent =
                (currentIndex + 1) + " / " + total;
        }

        // Previous button
        if (proofPrev) {
            proofPrev.style.display =
                currentIndex === 0 ? "none" : "flex";
        }

        // Next button
        if (proofNext) {
            proofNext.style.display =
                currentIndex === total - 1 ? "none" : "flex";
        }
    }


    // =========================
    // THUMBNAIL CLICK
    // =========================

    proofThumbs.forEach(function (thumb, index) {

        thumb.addEventListener("click", function () {

            openProofModal(index);

        });

    });


    // =========================
    // PREVIOUS
    // =========================

    if (proofPrev) {

        proofPrev.addEventListener("click", function (event) {

            event.stopPropagation();

            if (currentIndex > 0) {
                openProofModal(currentIndex - 1);
            }

        });

    }


    // =========================
    // NEXT
    // =========================

    if (proofNext) {

        proofNext.addEventListener("click", function (event) {

            event.stopPropagation();

            if (currentIndex < proofThumbs.length - 1) {
                openProofModal(currentIndex + 1);
            }

        });

    }


    // =========================
    // CLOSE BUTTON
    // =========================

    proofModalClose.addEventListener("click", function (event) {

        event.stopPropagation();

        closeProofModal();

    });


    // =========================
    // CLICK OUTSIDE IMAGE
    // =========================

    proofModal.addEventListener("click", function (event) {

        if (event.target === proofModal) {
            closeProofModal();
        }

    });


    // =========================
    // KEYBOARD CONTROLS
    // =========================

    document.addEventListener("keydown", function (event) {

        // Only work when modal is open
        if (proofModal.style.display !== "flex") {
            return;
        }

        // ESC = close
        if (event.key === "Escape") {

            closeProofModal();

        }

        // LEFT ARROW = previous
        if (event.key === "ArrowLeft") {

            if (currentIndex > 0) {
                openProofModal(currentIndex - 1);
            }

        }

        // RIGHT ARROW = next
        if (event.key === "ArrowRight") {

            if (currentIndex < proofThumbs.length - 1) {
                openProofModal(currentIndex + 1);
            }

        }

    });


    // =========================
    // CLOSE MODAL
    // =========================

    function closeProofModal() {

        proofModal.style.display = "none";

        proofModalImage.src = "";

        document.body.style.overflow = "";

    }

});
