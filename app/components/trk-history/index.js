import TrkHistoryStyle from "./style.css" with { type: "css" };

class TrkHistory extends HTMLElement {
  constructor() {
    super();

    this._history = [];

    this.attachShadow({ mode: "open" });
    this.shadowRoot.adoptedStyleSheets = [TrkHistoryStyle];
  }

  set history(value) {
    this._history = Array.isArray(value) ? value : [];

    if (this.isConnected) {
      this.render();
    }
  }

  get history() {
    return this._history;
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <div class="trk-history">
        <div class="trk-history-header">
          <h3>Histórico de Movimentação</h3>
          <span>realtime</span>
        </div>

        <div class="trk-history-timeline">
        </div>
      </div>
    `;

    const timeline = this.shadowRoot.querySelector(".trk-history-timeline");

    for (const event of this._history) {
      const item = document.createElement("div");
      item.className = "timeline-item";
      item.innerHTML = `
        <div class="timeline-marker"></div>
        <div class="timeline-body">
          <div class="timeline-meta"></div>
          <div class="timeline-status"></div>
          <div class="timeline-location"></div>
        </div>
      `;

      item.querySelector(".timeline-meta").textContent = event.date ?? "";
      item.querySelector(".timeline-status").textContent =
        event.description ?? "";
      item.querySelector(".timeline-location").textContent =
        event.location ?? "";
      timeline.append(item);
    }
  }
}

customElements.define("trk-history", TrkHistory);
