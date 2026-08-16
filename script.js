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
    const proofThumbs = document.querySelectorAll(".proof-thumb");

    // Check that the modal elements exist
    if (!proofModal || !proofModalImage || !proofModalClose) {
        console.log("Proof of Work modal elements not found.");
        return;
    }

    // Make each thumbnail clickable
    proofThumbs.forEach(function (thumb) {

        thumb.addEventListener("click", function () {

            const image = thumb.querySelector("img");

            if (!image) return;

            proofModalImage.src = image.src;
            proofModalImage.alt = image.alt;

            proofModal.style.display = "flex";
            document.body.style.overflow = "hidden";
        });

    });

    // Close button
    proofModalClose.addEventListener("click", function () {
        closeProofModal();
    });

    // Click outside image to close
    proofModal.addEventListener("click", function (event) {

        if (event.target === proofModal) {
            closeProofModal();
        }

    });

    // ESC key to close
    document.addEventListener("keydown", function (event) {

        if (event.key === "Escape") {
            closeProofModal();
        }

    });

    function closeProofModal() {

        proofModal.style.display = "none";
        proofModalImage.src = "";
        document.body.style.overflow = "";

    }

});
