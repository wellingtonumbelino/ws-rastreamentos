import InfoCardStyle from "./style.css" with { type: "css" };

class InfoCard extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });
    this.shadowRoot.adoptedStyleSheets = [InfoCardStyle];
  }

  static observedAttributes = ["label", "value"];

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if ((name === "label" || name === "value") && oldValue !== newValue) {
      this.render();
    }
  }

  render() {
    const label = this.getAttribute("label") ?? "";
    const value = this.getAttribute("value") ?? "";

    this.shadowRoot.innerHTML = `
      <div class="info-card">
        <span class="info-card-label">${label ?? ""}</span>
        <span class="info-card-value">${value ?? ""}</span>
      </div>
    `;
  }
}

customElements.define("info-card", InfoCard);
