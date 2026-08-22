import appHeaderStyle from "./style.css" with { type: "css" };

class AppHeader extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });
    this.shadowRoot.adoptedStyleSheets = [appHeaderStyle];
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <header>
        <div class="app-header-container">
          <a aria-label="WS Rastreamento, página inicial." href="/">
            WS Rastreamento
          </a>
        </div>
      </header>
    `;
  }
}

customElements.define("app-header", AppHeader);
