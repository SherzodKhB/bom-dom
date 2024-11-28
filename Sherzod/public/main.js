 // Elementlar
 const video = document.getElementById('video');
 const canvas = document.getElementById('canvas');
 const captureButton = document.getElementById('capture');
 const submitButton = document.getElementById('submit');

 // Kamerani ishga tushirish
 navigator.mediaDevices.getUserMedia({ video: true })
     .then(stream => {
         video.srcObject = stream;
     })
     .catch(error => {
         alert("Unable to access the camera: " + error.message);
     });

 // Surat olish
 captureButton.addEventListener('click', () => {
     const context = canvas.getContext('2d');
     context.drawImage(video, 0, 0, canvas.width, canvas.height);
     canvas.style.display = 'block';
     submitButton.style.display = 'inline-block';
 });

 // Rasmni yuborish
 submitButton.addEventListener('click', () => {
     const imageData = canvas.toDataURL('image/png');
     
     // Serverga yuborish (quyi qism backend bilan ishlaydi)
     fetch('/verify', {
         method: 'POST',
         headers: {
             'Content-Type': 'application/json'
         },
         body: JSON.stringify({ image: imageData })
     })
     .then(response => response.json())
     .then(data => {
         if (data.success) {
             alert("Access granted! Redirecting to the secure page...");
             // Sahifaga yo'naltirish
             window.location.href = "/secure-page";
         } else {
             alert("Verification failed. Please register or try again.");
         }
     })
     .catch(error => {
         console.error('Error:', error);
         alert("An error occurred during verification.");
     });
 });