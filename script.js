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

    const projects = document.querySelectorAll(".work-project");

    let currentGallery = [];
    let currentIndex = 0;


    // =========================
    // OPEN IMAGE
    // =========================

    function openProofModal(gallery, index) {

        if (!gallery[index]) return;

        const image = gallery[index].querySelector("img");

        if (!image) return;

        currentGallery = gallery;
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

        const total = currentGallery.length;

        if (proofCounter) {
            proofCounter.textContent =
                (currentIndex + 1) + " / " + total;
        }

        if (proofPrev) {
            proofPrev.style.display =
                currentIndex === 0 ? "none" : "flex";
        }

        if (proofNext) {
            proofNext.style.display =
                currentIndex === total - 1 ? "none" : "flex";
        }
    }


    // =========================
    // SET UP EACH PROJECT
    // =========================

    projects.forEach(function (project) {

        const thumbs = Array.from(
            project.querySelectorAll(".proof-thumb")
        );

        thumbs.forEach(function (thumb, index) {

            thumb.addEventListener("click", function () {

                openProofModal(thumbs, index);

            });

        });

    });


    // =========================
    // PREVIOUS
    // =========================

    if (proofPrev) {

        proofPrev.addEventListener("click", function (event) {

            event.stopPropagation();

            if (currentIndex > 0) {

                openProofModal(
                    currentGallery,
                    currentIndex - 1
                );

            }

        });

    }


    // =========================
    // NEXT
    // =========================

    if (proofNext) {

        proofNext.addEventListener("click", function (event) {

            event.stopPropagation();

            if (
                currentIndex <
                currentGallery.length - 1
            ) {

                openProofModal(
                    currentGallery,
                    currentIndex + 1
                );

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

        if (proofModal.style.display !== "flex") {
            return;
        }


        // ESC
        if (event.key === "Escape") {

            closeProofModal();

        }


        // LEFT ARROW
        if (event.key === "ArrowLeft") {

            if (currentIndex > 0) {

                openProofModal(
                    currentGallery,
                    currentIndex - 1
                );

            }

        }


        // RIGHT ARROW
        if (event.key === "ArrowRight") {

            if (
                currentIndex <
                currentGallery.length - 1
            ) {

                openProofModal(
                    currentGallery,
                    currentIndex + 1
                );

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

        currentGallery = [];
        currentIndex = 0;

    }

});
