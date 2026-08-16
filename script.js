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

const proofModal = document.getElementById("proofModal");
const proofModalImage = document.getElementById("proofModalImage");
const proofModalClose = document.querySelector(".proof-modal-close");
const proofThumbs = document.querySelectorAll(".proof-thumb");

proofThumbs.forEach((thumb) => {
    thumb.addEventListener("click", () => {
        const image = thumb.querySelector("img");

        if (!image) return;

        proofModalImage.src = image.src;
        proofModalImage.alt = image.alt;

        proofModal.style.display = "flex";
        document.body.style.overflow = "hidden";
    });
});

function closeProofModal() {
    proofModal.style.display = "none";
    proofModalImage.src = "";
    document.body.style.overflow = "";
}

proofModalClose.addEventListener("click", closeProofModal);

proofModal.addEventListener("click", (event) => {
    if (event.target === proofModal) {
        closeProofModal();
    }
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        closeProofModal();
    }
});
