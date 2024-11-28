// Qish uchun animatsiya
document.getElementById("qish").addEventListener("click", function () {
    setSeason("❄️", "snowflake", "#87ceeb");
  });
  
  // Bahor uchun animatsiya
  document.getElementById("bahor").addEventListener("click", function () {
    setSeason("🌸", "flower", "#a8e6cf");
  });
  
  // Yoz uchun animatsiya
  document.getElementById("yoz").addEventListener("click", function () {
    setSeason("☀️", "sunray", "#ffeb3b");
  });
  
  // Kuz uchun animatsiya
  document.getElementById("kuz").addEventListener("click", function () {
    setSeason("🍂", "leaf", "#ffa726");
  });
  
  // Fasllar uchun umumiy funksiya
  function setSeason(symbol, className, bgColor) {
    const container = document.getElementById("animation-container");
    container.innerHTML = ""; // Avvalgi animatsiyalarni tozalash
    document.body.style.background = bgColor; // Fon rangini o'zgartirish
  
    // 100 ta animatsion element yaratish
    for (let i = 0; i < 100; i++) {
      const element = document.createElement("div");
      element.className = className;
      element.style.left = Math.random() * 100 + "vw";
      element.style.animationDuration = Math.random() * 3 + 2 + "s";
      element.innerHTML = symbol;
      container.appendChild(element);
    }
  }
  