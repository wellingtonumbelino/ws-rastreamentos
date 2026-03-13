class TimelineStep extends HTMLElement {
  connectedCallback() {
    const desc = this.getAttribute("description") || "";
    const date = this.getAttribute("date") || "";
    const location = this.getAttribute("location") || "";

    this.render(desc, date, location);
  }

  render(description, date, location) {
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
