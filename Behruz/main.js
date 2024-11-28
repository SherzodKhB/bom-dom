function changeSeason(season) {
    const body = document.body;
    const seasonImage = document.getElementById('seasonImage');
    const title = document.querySelector('h1');

    if (season === 'winter') {
        body.style.background = 'linear-gradient(to bottom, #00c6fb, #005bea)';
        seasonImage.src = 'https://cdn-icons-png.flaticon.com/512/4151/4151022.png';
        title.textContent = "Qish fasli! Hammasi muzlab qoldi ❄️";
    } else if (season === 'spring') {
        body.style.background = 'linear-gradient(to bottom, #00c853, #b9fbc0)';
        seasonImage.src = 'https://cdn-icons-png.flaticon.com/512/4151/4151000.png';
        title.textContent = "Bahor fasli! Gullar ochilmoqda 🌸";
    } else if (season === 'summer') {
        body.style.background = 'linear-gradient(to bottom, #ffb347, #ffcc33)';
        seasonImage.src = 'https://cdn-icons-png.flaticon.com/512/869/869869.png';
        title.textContent = "Yoz fasli! Quyosh charaqlayapti 🌞";
    } else if (season === 'autumn') {
        body.style.background = 'linear-gradient(to bottom, #ff7e5f, #feb47b)';
        seasonImage.src = 'https://cdn-icons-png.flaticon.com/512/4151/4151003.png';
        title.textContent = "Kuz fasli! Barglar to'kilmoqda 🍂";
    }
}