// User Dashboard JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Collapsible download section
    const downloadToggle = document.getElementById('downloadToggle');
    const downloadContent = document.getElementById('downloadContent');
    const toggleIcon = downloadToggle.querySelector('.toggle-icon');
    const fingerprint = document.getElementById('fingerprint');
    
    // Initially expanded
    let isExpanded = true;
    
    downloadToggle.addEventListener('click', function() {
        isExpanded = !isExpanded;
        
        if (isExpanded) {
            // Expand
            downloadContent.classList.remove('collapsed');
            if (fingerprint) {
                fingerprint.classList.remove('collapsed');
            }
            toggleIcon.classList.remove('rotated');
        } else {
            // Collapse
            downloadContent.classList.add('collapsed');
            if (fingerprint) {
                fingerprint.classList.add('collapsed');
            }
            toggleIcon.classList.add('rotated');
        }
    });
});
