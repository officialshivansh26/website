// User Dashboard JavaScript
document.addEventListener('DOMContentLoaded', function() {
    function getActionDelay(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

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
        setTimeout(function() {
            resultModal.classList.add('open');
            document.body.style.overflow = 'hidden';
        }, getActionDelay(450, 900));
    });

    document.querySelectorAll('.btn-download[href]').forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetUrl = link.getAttribute('href');

            setTimeout(function() {
                window.open(targetUrl, '_blank', 'noopener,noreferrer');
            }, getActionDelay(400, 850));
        });
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
