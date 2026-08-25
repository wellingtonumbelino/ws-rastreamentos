import VolumeDetailsStyle from "./style.css" with { type: "css" };

class VolumeDetails extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });
    this.shadowRoot.adoptedStyleSheets = [VolumeDetailsStyle];
  }

  static observedAttributes = ["code", "weight", "service", "recipient"];

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback(_, oldValue, newValue) {
    if (oldValue !== newValue && this.isConnected) {
      this.render();
    }
  }

  render() {
    this.shadowRoot.innerHTML = `
      <div class="volume-details">
        <span class="volume-details-title">Detalhes do Volume</span>

        <div class="volume-detail-data">
          <span class="volume-detail-info">
            <span class="data-text">código</span>
            <span class="data-value" data-field="code"></span>
          </span>
          <span class="volume-detail-info">
            <span class="data-text">peso</span>
            <span class="data-value" data-field="weight"></span>
          </span>
          <span class="volume-detail-info">
            <span class="data-text">serviço</span>
            <span class="data-value" data-field="service"></span>
          </span>
          <span class="volume-detail-info">
            <span class="data-text">destinatário</span>
            <span class="data-value" data-field="recipient"></span>
          </span>
        </div>
      </div>
    `;

    for (const field of this.constructor.observedAttributes) {
      const valueElement = this.shadowRoot.querySelector(
        `[data-field="${field}"]`,
      );
      valueElement.textContent = this.getAttribute(field) ?? "";
    }
  }
}

customElements.define("volume-details", VolumeDetails);
