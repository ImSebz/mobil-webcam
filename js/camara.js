document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const overlaySrc = urlParams.get('overlay');
    const video = document.getElementById('video');
    const canvas = document.getElementById('canvas');
    const captureButton = document.getElementById('capture');
    const overlay = document.getElementById('overlay');
    const capturedImage = document.getElementById('captured-image');

    if (overlaySrc) {
        overlay.src = `assets/${overlaySrc}`;
    }

    function startCamera() {
        navigator.mediaDevices.getUserMedia({ video: { width: 756, height: 1344 } })
            .then(stream => {
                video.srcObject = stream;
                video.play();
            })
            .catch(err => {
                console.error("Error accessing the camera: ", err);
            });
    }

    captureButton.addEventListener('click', () => {
        const context = canvas.getContext('2d');
        
        const scale = Math.max(canvas.width / video.videoWidth, canvas.height / video.videoHeight);
        const x = (canvas.width / 2) - (video.videoWidth / 2) * scale;
        const y = (canvas.height / 2) - (video.videoHeight / 2) * scale;
        
        context.drawImage(video, x, y, video.videoWidth * scale, video.videoHeight * scale);
        
        const overlayWidth = canvas.width * 0.8;
        const overlayHeight = overlay.naturalHeight * (overlayWidth / overlay.naturalWidth);
        const overlayX = (canvas.width - overlayWidth) / 2;
        const overlayY = canvas.height - overlayHeight;
        
        context.drawImage(overlay, overlayX, overlayY, overlayWidth, overlayHeight);
        
        const dataURL = canvas.toDataURL('image/png');
        capturedImage.src = dataURL;
        capturedImage.style.display = 'block';
    });

    startCamera();
});