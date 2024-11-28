const video = document.getElementById('video');
        const captureButton = document.getElementById('capture-button');
        const photo = document.getElementById('photo');
        navigator.mediaDevices.getUserMedia({ video: true })
            .then((stream) => {
                video.srcObject = stream;
            })
            .catch((err) => {
                alert("Kameraga ulanishda xatolik yuz berdi: " + err.message);
            });
        captureButton.addEventListener('click', () => {
            const canvas = document.createElement('canvas');
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            const context = canvas.getContext('2d');
            context.drawImage(video, 0, 0, canvas.width, canvas.height);
            photo.src = canvas.toDataURL('image/png');
            photo.style.display = 'block';
        });