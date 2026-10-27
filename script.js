document.addEventListener('DOMContentLoaded', () => {
    const greetingOverlay = document.getElementById('greeting-overlay');
    const enterBtn = document.getElementById('enter-btn');
    const processBtn = document.getElementById('process-btn');
    const mediaUrlInput = document.getElementById('media-url');
    
    const loaderSection = document.getElementById('loader-section');
    const progressFill = document.getElementById('progress-fill');
    const loaderStatus = document.getElementById('loader-status');
    const resultSection = document.getElementById('result-section');
    
    const mediaTitle = document.getElementById('media-title');
    const mediaDuration = document.getElementById('media-duration');
    
    const downloadMp4 = document.getElementById('download-mp4');
    const downloadMp3 = document.getElementById('download-mp3');
    
    const historyList = document.getElementById('history-list');
    
    const prankModal = document.getElementById('prank-modal');
    const closeModal = document.getElementById('close-modal');
    const thanksBubble = document.getElementById('thanks-bubble');

    // 1. Handle entry greeting overlay (Button: 'Greetings')
    enterBtn.addEventListener('click', () => {
        greetingOverlay.classList.add('hidden');
    });

    // 2. Handle URL processing with simulated progress bar ('Fetching...')
    processBtn.addEventListener('click', () => {
        const url = mediaUrlInput.value.trim();
        if (url === '') {
            alert('Please paste a link first!');
            return;
        }

        // Hide results, show loader
        resultSection.classList.add('hidden');
        loaderSection.classList.remove('hidden');
        progressFill.style.width = '0%';
        loaderStatus.textContent = 'Fetching...';

        // Simulate progress steps
        setTimeout(() => {
            progressFill.style.width = '45%';
            loaderStatus.textContent = 'Fetching...';
        }, 400);

        setTimeout(() => {
            progressFill.style.width = '85%';
            loaderStatus.textContent = 'Fetching...';
        }, 850);

        setTimeout(() => {
            progressFill.style.width = '100%';
            loaderStatus.textContent = 'Fetching...';
            
            setTimeout(() => {
                loaderSection.classList.add('hidden');
                resultSection.classList.remove('hidden');
                
                // Update preview title based on URL
                mediaTitle.textContent = `Target: ${url.substring(0, 35)}...`;
                mediaDuration.textContent = `Duration: 00:32 | Format: Verified MP4/MP3`;

                // Add to history
                addToHistory(url);
            }, 300);
        }, 1200);
    });

    // 3. Add item to history
    function addToHistory(url) {
        const emptyMsg = historyList.querySelector('.empty-history');
        if (emptyMsg) {
            emptyMsg.remove();
        }

        const listItem = document.createElement('li');
        listItem.textContent = `🔗 ${url}`;
        historyList.prepend(listItem);
    }

    // 4. Handle download buttons (Trigger prank modal & 'Thanks' bubble notification)
    const triggerDownloadAction = () => {
        // Show 'Thanks' bubble notification
        thanksBubble.classList.remove('hidden');
        setTimeout(() => {
            thanksBubble.classList.add('hidden');
        }, 3000);

        // Show prank modal
        prankModal.classList.remove('hidden');
    };

    downloadMp4.addEventListener('click', triggerDownloadAction);
    downloadMp3.addEventListener('click', triggerDownloadAction);

    // 5. Close prank modal
    closeModal.addEventListener('click', () => {
        prankModal.classList.add('hidden');
    });

    window.addEventListener('click', (event) => {
        if (event.target === prankModal) {
            prankModal.classList.add('hidden');
        }
    });
});
