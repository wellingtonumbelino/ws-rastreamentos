import CurrentStatusCardStyle from "./style.css" with { type: "css" };

class CurrentStatusCard extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });
    this.shadowRoot.adoptedStyleSheets = [CurrentStatusCardStyle];
  }

  static observedAttributes = ["status", "delivery-date", "last-update"];

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback(_, oldValue, newValue) {
    if (oldValue !== newValue && this.isConnected) {
      this.render();
    }
  }

  get statusSteps() {
    return [
      { label: "postado", values: ["postado"] },
      { label: "coletado", values: ["coletado"] },
      { label: "enviado", values: ["enviado", "em trânsito", "em transporte"] },
      { label: "saiu entrega", values: ["saiu para entrega", "saiu entrega"] },
      { label: "entregue", values: ["entregue"] },
    ];
  }

  getCurrentStepIndex() {
    const status = (this.getAttribute("status") ?? "").trim().toLowerCase();

    return this.statusSteps.findIndex((step) =>
      step.values.some((value) => status.includes(value)),
    );
  }

  render() {
    const currentStepIndex = this.getCurrentStepIndex();
    const progress = currentStepIndex < 0 ? 0 : (currentStepIndex / 4) * 100;

    this.shadowRoot.innerHTML = `
      <div class="trk-current-status-container">
        <div class="trk-current-status-header">
          <div class="trk-delivery-info-text">
            <p>STATUS ATUAL</p>
            <h2 data-field="status"></h2>
          </div>
          <div class="trk-estimated-delivery-date">
            <info-card label="previsão" data-field="delivery-date"></info-card>
            <info-card label="última atualização" variant="secondary" data-field="last-update"></info-card>
          </div>
        </div>

        <!-- Tracking Location Statuses -->
        <div class="trk-current-statuses-location">
          <div class="statuses-line-track" style="--progress: ${progress}%" role="list" aria-label="Etapas da entrega">
            ${this.statusSteps
              .map((step, index) => {
                const state =
                  index < currentStepIndex
                    ? "completed"
                    : index === currentStepIndex
                      ? "active"
                      : "";

                return `
                  <div class="status-step ${state}" role="listitem">
                    <span class="status-step-dot"></span>
                    <span class="status-step-label">${step.label}</span>
                  </div>
                `;
              })
              .join("")}
          </div>
        </div>
      </div>
    `;

    this.shadowRoot.querySelector('[data-field="status"]').textContent =
      this.getAttribute("status") ?? "";

    for (const field of ["delivery-date", "last-update"]) {
      const infoCard = this.shadowRoot.querySelector(`[data-field="${field}"]`);
      infoCard.setAttribute("value", this.getAttribute(field) ?? "");
    }
  }
}

customElements.define("current-status-card", CurrentStatusCard);
