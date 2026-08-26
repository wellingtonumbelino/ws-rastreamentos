import SupportContactStyle from "./style.css" with { type: "css" };

class SupportContact extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });
    this.shadowRoot.adoptedStyleSheets = [SupportContactStyle];
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <div class="support-contact">
        <h3>Precisa de ajuda com esta entrega?</h3>
        <p>
          Nossa equipe de suporte logístico está pronta para te atender
          agora.
        </p>
        <app-button class="w-full" label="abrir chamado" variant="secondary"></app-button>
      </div>
    `;
  }
}

customElements.define("support-contact", SupportContact);
