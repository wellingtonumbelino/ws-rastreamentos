import heroSectionStyles from "./style.css" with { type: "css" };

class HeroSection extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });
    this.shadowRoot.adoptedStyleSheets = [heroSectionStyles];
  }

  connectedCallback() {
    this.render();

    this.addEventListener("on-click", this.handleSubmitButtonClick);
  }

  disconnectedCallback() {
    this.removeEventListener("app-button-click", this.handleButtonClick);
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

        <form class="form-trk-search">
          <input
            placeholder="Digite seu código (ex: WS923874923BR)"
            type="text"
          />
          <app-button class="lg" label="consultar" type="submit"></app-button>
        </form>
      </section>
    `;
  }

  handleSubmitButtonClick(event) {
    event.preventDefault();

    console.log("Button clicked: ", event.detail.button);
  }
}

customElements.define("hero-section", HeroSection);
