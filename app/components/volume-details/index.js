import VolumeDetailsStyle from "./style.css" with { type: "css" };

class VolumeDetails extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });
    this.shadowRoot.adoptedStyleSheets = [VolumeDetailsStyle];
  }

  static observedAttributes = [
    "code",
    "weight",
    "service",
    "recipient-first-name",
    "recipient-last-name",
  ];

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback(_, oldValue, newValue) {
    if (oldValue !== newValue && this.isConnected) {
      this.render();
    }
  }

  formatWeight(value) {
    const weightInGrams = Number(value);

    if (!Number.isFinite(weightInGrams) || weightInGrams < 0) {
      return "";
    }

    if (weightInGrams >= 1000) {
      const weightInKilograms = weightInGrams / 1000;
      return `${weightInKilograms.toLocaleString("pt-BR", {
        maximumFractionDigits: 3,
      })} kg`;
    }

    return `${weightInGrams.toLocaleString("pt-BR")} g`;
  }

  formatRecipient(firstName, lastName) {
    const name = firstName.trim();
    const surnameInitial = lastName.trim().charAt(0);

    return name && surnameInitial ? `${name} ${surnameInitial}.` : name;
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

    for (const field of ["code", "weight", "service"]) {
      const valueElement = this.shadowRoot.querySelector(
        `[data-field="${field}"]`,
      );
      const value = this.getAttribute(field);
      valueElement.textContent =
        field === "weight" ? this.formatWeight(value) : (value ?? "");
    }

    this.shadowRoot.querySelector('[data-field="recipient"]').textContent =
      this.formatRecipient(
        this.getAttribute("recipient-first-name") ?? "",
        this.getAttribute("recipient-last-name") ?? "",
      );
  }
}

customElements.define("volume-details", VolumeDetails);
