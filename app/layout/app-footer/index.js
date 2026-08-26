import AppFooterStyle from "./style.css" with { type: "css" };

class AppFooter extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });
    this.shadowRoot.adoptedStyleSheets = [AppFooterStyle];
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <footer>
        <div class="footer-container">
          <div class="footer-copyright">
            <h4>WS Rastreamento</h4>
            <span>© 2026 WS Rastreamento. Kinetic Logistics Solutions.</span>
          </div>
          <div class="footer-links">
            <div class="col-links">
              <span>privacy policy</span>
              <span>terms of service</span>
            </div>
            <div class="col-links">
              <span>support center</span>
              <span>global network</span>
            </div>
          </div>
        </div>
      </footer>
    `;
  }
}

customElements.define("app-footer", AppFooter);
