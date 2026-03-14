// User Dashboard JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // ── Collapsible download section ──────────────────────
    const downloadToggle = document.getElementById('downloadToggle');
    const downloadContent = document.getElementById('downloadContent');
    const toggleIcon = downloadToggle.querySelector('.toggle-icon');
    const fingerprint = document.getElementById('fingerprint');

    let isExpanded = true;

    downloadToggle.addEventListener('click', function() {
        isExpanded = !isExpanded;
        if (isExpanded) {
            downloadContent.classList.remove('collapsed');
            if (fingerprint) fingerprint.classList.remove('collapsed');
            toggleIcon.classList.remove('rotated');
        } else {
            downloadContent.classList.add('collapsed');
            if (fingerprint) fingerprint.classList.add('collapsed');
            toggleIcon.classList.add('rotated');
        }
    });

    // ── Result Modal ──────────────────────────────────────
    const viewResultBtn = document.getElementById('viewResultBtn');
    const resultModal   = document.getElementById('resultModal');
    const closeModalBtn = document.getElementById('closeResultModal');

    viewResultBtn.addEventListener('click', function() {
        resultModal.classList.add('open');
        document.body.style.overflow = 'hidden';
    });

    function closeModal() {
        resultModal.classList.remove('open');
        document.body.style.overflow = '';
    }

    closeModalBtn.addEventListener('click', closeModal);

    // Close when clicking outside the modal box
    resultModal.addEventListener('click', function(e) {
        if (e.target === resultModal) closeModal();
    });

    // Close with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && resultModal.classList.contains('open')) closeModal();
    });
});
