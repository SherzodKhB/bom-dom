const elBtn = document.getElementById("getLocation");
const elInfo = document.getElementById("details");
let map;

elBtn.addEventListener("click", () => {
  // DOM ma'lumotlarini tozalash
  elInfo.innerText = "Manzilni aniqlayapmiz...";
  if (map) map.remove();

  // Geolokatsiyani olish
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        const response = await fetch(
          `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=8f2ad4537c634023bc376aa8a29b628a`
        );
        const data = await response.json();
        const location = data.results[0].formatted;

        document.getElementById("details").innerHTML = `
                <b>Manzil:</b> ${location} <br>
                <b>Koordinatalar:</b> ${lat}, ${lng}
            `;

        map = L.map("map").setView([lat, lng], 15);
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          maxZoom: 19,
        }).addTo(map);
        L.marker([lat, lng])
          .addTo(map)
          .bindPopup("Sizning joylashuvingiz!")
          .openPopup();
      },
      (error) => {
        elInfo.innerText = "Manzilni aniqlab bo'lmadi.";
      }
    );
  } else {
    elInfo.innerText = "Geolokatsiya qo'llab-quvvatlanmaydi.";
  }
});

