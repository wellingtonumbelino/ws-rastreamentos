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

  static observedAttributes = ["tracking-code"];

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "tracking-code" && oldValue !== newValue && this.isConnected) {
      this.loadTrackingData();
    }
  }

  async loadTrackingData() {
    const trackingCode = this.getAttribute("tracking-code") ?? "WS923874923BR";

    try {
      const response = await fetch("./data/tracking.json");
      const trackingData = await response.json();
      const tracking = trackingData[trackingCode];
      const statusCard = this.shadowRoot.querySelector("current-status-card");
      const volumeDetails = this.shadowRoot.querySelector("volume-details");
      const history = this.shadowRoot.querySelector("trk-history");
      const route = this.shadowRoot.querySelector("trk-route");

      if (tracking && statusCard) {
        statusCard.setAttribute("status", tracking.status);
        statusCard.setAttribute("delivery-date", tracking.deliveryDate);
        statusCard.setAttribute("last-update", tracking.lastUpdate);
      }

      if (tracking?.volume && volumeDetails) {
        for (const field of ["code", "weight", "service"]) {
          volumeDetails.setAttribute(field, tracking.volume[field] ?? "");
        }

        volumeDetails.setAttribute(
          "recipient-first-name",
          tracking.volume.firstName ?? "",
        );
        volumeDetails.setAttribute(
          "recipient-last-name",
          tracking.volume.lastName ?? "",
        );
      }

      if (tracking && history) {
        history.history = tracking.history;
      }

      if (tracking && route) {
        route.status = tracking.status;
        route.route = tracking.route;
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
      <section class="trk-result-section" aria-live="polite">
        <aside class="trk-result-col">
          <current-status-card
            delivery-date=""
            last-update=""
          ></current-status-card>
        
          <div class="trk-history-route">
            <trk-history></trk-history>
            <trk-route></trk-route>
          </div>
        </aside>

        <aside class="trk-result-col">
          <volume-details
            code=""
            weight=""
            service=""
            recipient-first-name=""
            recipient-last-name=""
          ></volume-details>

          <support-contact></support-contact>
        </aside>

      </section>
    `;
  }
}

customElements.define("trk-result-section", TrkResultSection);
