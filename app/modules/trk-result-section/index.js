import TrkResultSectionStyle from "./style.css" with { type: "css" };

class TrkResultSection extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });
    this.shadowRoot.adoptedStyleSheets = [TrkResultSectionStyle];
  }

  connectedCallback() {
    this.render();
    this.loadTrackingData();
  }

  async loadTrackingData() {
    const trackingCode = this.getAttribute("tracking-code") ?? "WS923874923BR";

    try {
      const response = await fetch("./data/tracking.json");
      const trackingData = await response.json();
      const tracking = trackingData[trackingCode];
      const statusCard = this.shadowRoot.querySelector("current-status-card");
      const history = this.shadowRoot.querySelector("trk-history");

      if (tracking && statusCard) {
        statusCard.setAttribute("status", tracking.status);
      }

      if (tracking && history) {
        history.history = tracking.history;
      }
    } catch (error) {
      console.error(
        "Não foi possível carregar os dados de rastreamento.",
        error,
      );
    }
  }

  render() {
    this.shadowRoot.innerHTML = `
      <section class="trk-result-section">
        <current-status-card
          delivery-date="15 JAN 2025"
          last-update="Hoje, 10:49"
        ></current-status-card>

        <volume-details
          code="WS923874923BR"
          weight="1.250 kg"
          service="Premium Express"
          recipient="Eduardo M."
        ></volume-details>

        <div>
          <trk-history></trk-history>
        </div>
      </section>
    `;
  }
}

customElements.define("trk-result-section", TrkResultSection);
