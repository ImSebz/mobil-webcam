document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const overlaySrc = urlParams.get('overlay');
    const video = document.getElementById('video');
    const canvas = document.getElementById('canvas');
    const captureButton = document.getElementById('capture');
    const overlay = document.getElementById('overlay');

    if (overlaySrc) {
        overlay.src = `assets/${overlaySrc}`;
    }

    function startCamara() {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(stream => {
                video.srcObject = stream;
                video.play();
            })
            .catch(err => {
                console.error("Error accessing the camara: ", err);
            });
    }

    captureButton.addEventListener('click', () => {
        const context = canvas.getContext('2d');
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        context.drawImage(overlay, 0, 0, canvas.width, canvas.height);
        const dataURL = canvas.toDataURL('image/png');
        console.log(dataURL); // You can use this data URL to save the image or display it
    });

    startCamara();
});