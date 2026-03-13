class TimelineStep extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render(
    description = "Objeto recebido na unidade",
    date = "2026-01-01:T00:00:00",
    location = "Local desconhecido",
  ) {
    this.innerHTML = `
      <div class="timeline-step">
        <div class="step-indicator"></div>
        <div class="step-content">
          <p class="step-description">${description}</p>
          <h4 class="step-date">${date}</h4>
          <p class="step-location">${location}</p>
        </div>
      </div>
    `;
  }
}

customElements.define("timeline-step", TimelineStep);
