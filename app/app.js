// Layout
import "./layout/app-header/index.js";
import "./layout/page-content/index.js";

// Components
import "./components/app-button/index.js";

// Sections | Modules
import "./modules/hero-section/index.js";

const inputCode = document.getElementById("trk-code-input");
const searchBtn = document.getElementById("trk-btn");
const resultsSection = document.getElementById("trk-results-sec");

searchBtn.addEventListener("click", () => {
  const code = inputCode.value.trim();

  if (!code) {
    alert("Digite um código de rastreio válido.");
    return;
  }

  document.body.classList.add("search-active");
  resultsSection.classList.add("is-visible");
});
