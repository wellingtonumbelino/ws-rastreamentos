import heroSectionStyles from "./style.css" with { type: "css" };

class HeroSection extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });
    this.shadowRoot.adoptedStyleSheets = [heroSectionStyles];
    this.handleSubmitButtonClick = this.handleSubmitButtonClick.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  connectedCallback() {
    this.render();

    this.form = this.shadowRoot.querySelector(".form-trk-search");
    this.input = this.shadowRoot.querySelector("#tracking-code");
    this.errorMessage = this.shadowRoot.querySelector("#tracking-code-error");

    this.addEventListener("on-click", this.handleSubmitButtonClick);
    this.form.addEventListener("submit", this.handleFormSubmit);
    this.input.addEventListener("input", this.handleInput);
  }

  disconnectedCallback() {
    this.removeEventListener("on-click", this.handleSubmitButtonClick);
    this.form.removeEventListener("submit", this.handleFormSubmit);
    this.input.removeEventListener("input", this.handleInput);
  }

  handleSubmitButtonClick() {
    const code = this.input.value.trim().toUpperCase();
    const codePattern = /^WS\d{9}BR$/;

    if (!codePattern.test(code)) {
      const message = "Digite um código válido no formato WS923874923BR.";

      this.errorMessage.textContent = message;
      this.input.setCustomValidity(message);
      this.input.reportValidity();
      this.input.focus();

      return;
    }

    this.input.value = code;
    this.input.setCustomValidity("");
    this.errorMessage.textContent = "";
    this.form.requestSubmit();
  }

  handleFormSubmit(event) {
    event.preventDefault();

    const resultsSection = document.querySelector("trk-result-section");

    if (!resultsSection) {
      return;
    }

    resultsSection.setAttribute("tracking-code", this.input.value);
    document.body.classList.add("search-active");
    resultsSection.classList.add("is-visible");
  }

  handleInput(event) {
    event.currentTarget.setCustomValidity("");

    if (this.errorMessage && this.errorMessage.textContent) {
      this.errorMessage.textContent = "";
    }
  }

  render() {
    this.shadowRoot.innerHTML = `
      <section
        aria-label="WS Rastreamento. Rastreio prático, rápido e transparente. Acompanhe sua encomenda em tempo real."
        class="hero-section"
        role="banner"
        tabindex="0"
      >
        <h1>Rastreio prático, rápido e transparente</h1>
        <span>Acompanhe sua encomenda em tempo real.</span>

        <form class="form-trk-search" novalidate>
          <input
            aria-describedby="tracking-code-error"
            autocomplete="off"
            id="tracking-code"
            maxlength="13"
            name="trackingCode"
            pattern="WS[0-9]{9}BR"
            placeholder="Digite seu código (ex: WS123456789BR)"
            required
            type="text"
          />
          <app-button class="lg w-full" label="consultar" type="submit"></app-button>
        </form>
        
        <p aria-live="polite" id="tracking-code-error"></p>
      </section>
    `;
  }
}

customElements.define("hero-section", HeroSection);
