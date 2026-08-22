import pageContentStyle from "./style.css" with { type: "css" };

class PageContent extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });
    this.shadowRoot.adoptedStyleSheets = [pageContentStyle];
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <main class="page-content">
        <div class="page-content-container">
          <slot></slot>
        </div>
      </main>
    `;
  }
}

customElements.define("page-content", PageContent);
