
document.getElementById("qish").addEventListener("click", function () {
    setSeason("❄️", "snowflake", "#87ceeb");
  });
  
  document.getElementById("bahor").addEventListener("click", function () {
    setSeason("🌸", "flower", "#a8e6cf");
  });
  
  document.getElementById("yoz").addEventListener("click", function () {
    setSeason("☀️", "sunray", "#ffeb3b");
  });
  
  document.getElementById("kuz").addEventListener("click", function () {
    setSeason("🍂", "leaf", "#ffa726");
  });
  
  function setSeason(symbol, className, bgColor) {
    const container = document.getElementById("animation-container");
    container.innerHTML = ""; 
    document.body.style.background = bgColor; 
    for (let i = 0; i < 100; i++) {
      const element = document.createElement("div");
      element.className = className;
      element.style.left = Math.random() * 100 + "vw";
      element.style.animationDuration = Math.random() * 3 + 2 + "s";
      element.innerHTML = symbol;
      container.appendChild(element);
    }
  }
  