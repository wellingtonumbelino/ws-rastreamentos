import SupportModalStyle from "./style.css" with { type: "css" };

class SupportModal extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });
    this.shadowRoot.adoptedStyleSheets = [SupportModalStyle];

    this.handleClose = this.handleClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.isSubmitted = false;
    this.protocol = "";
  }

  static get observedAttributes() {
    return ["hidden"];
  }

  connectedCallback() {
    this.render();
    this.bindEvents();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "hidden" && oldValue !== newValue && this.isConnected) {
      this.render();
    }
  }

  disconnectedCallback() {
    this.removeEventListeners();
  }

  bindEvents() {
    const closeButton = this.shadowRoot.querySelector(".close-button");
    const form = this.shadowRoot.querySelector(".support-form");

    closeButton?.addEventListener("click", this.handleClose);
    form?.addEventListener("submit", this.handleSubmit);

    this.shadowRoot.querySelectorAll("app-button").forEach((button) => {
      const label = button.getAttribute("label");
      if (label === "Cancelar" || label === "Fechar") {
        button.addEventListener("on-click", this.handleCancel);
      }
      if (label === "Enviar Chamado") {
        button.addEventListener("on-click", this.handleSubmit);
      }
    });
  }

  removeEventListeners() {
    const closeButton = this.shadowRoot.querySelector(".close-button");
    const form = this.shadowRoot.querySelector(".support-form");

    closeButton?.removeEventListener("click", this.handleClose);
    form?.removeEventListener("submit", this.handleSubmit);

    this.shadowRoot.querySelectorAll("app-button").forEach((button) => {
      const label = button.getAttribute("label");
      if (label === "Cancelar" || label === "Fechar") {
        button.removeEventListener("on-click", this.handleCancel);
      }
      if (label === "Enviar Chamado") {
        button.removeEventListener("on-click", this.handleSubmit);
      }
    });
  }

  handleClose() {
    this.isSubmitted = false;
    this.protocol = "";
    this.setAttribute("hidden", "hidden");
    this.dispatchEvent(
      new CustomEvent("support-close", {
        bubbles: true,
        composed: true,
      }),
    );
  }

  handleCancel() {
    this.handleClose();
  }

  generateProtocol() {
    const year = new Date().getFullYear();
    const sequence = Math.floor(1000 + Math.random() * 9000);
    return `PROT-WS-${year}-${sequence}`;
  }

  handleSubmit(event) {
    event?.preventDefault();

    const dropdown = this.shadowRoot.querySelector("app-dropdown");
    const textarea = this.shadowRoot.querySelector("textarea");
    const detail = {
      reason: dropdown?.value ?? "",
      message: textarea?.value?.trim() ?? "",
    };

    this.isSubmitted = true;
    this.protocol = this.generateProtocol();

    this.dispatchEvent(
      new CustomEvent("support-submit", {
        bubbles: true,
        composed: true,
        detail,
      }),
    );

    this.render();
  }

  render() {
    const isHidden = this.hasAttribute("hidden");
    const cancelLabel = this.isSubmitted ? "Fechar" : "Cancelar";

    this.shadowRoot.innerHTML = `
      <div class="modal-backdrop" ${isHidden ? "hidden" : ""}>
        <div class="modal" role="dialog" aria-modal="true" aria-labelledby="support-modal-title">
          <div class="modal-header">
            <div>
              <h2 class="modal-title" id="support-modal-title">${this.isSubmitted ? "Chamado registrado" : "Abrir Chamado de Suporte"}</h2>
            </div>
            <button type="button" class="close-button" aria-label="Fechar modal">×</button>
          </div>

          ${
            this.isSubmitted
              ? `
            <div class="success-state">
              <p class="success-message">
                Sua solicitação foi registrada com sucesso. Guarde seu número de protocolo:
              </p>
              <div class="protocol-box">${this.protocol}</div>
            </div>
          `
              : `
            <p class="modal-subtitle">
              Conte-nos o que aconteceu e nossa equipe ajudará a resolver o problema.
            </p>

            <form class="support-form">
              <div class="field">
                <label class="field-label" for="contact-reason">Motivo do contato</label>
                <app-dropdown id="contact-reason" label="Motivo do contato" placeholder="Selecione o motivo" options='[{"value":"entrega","label":"Entrega"},{"value":"rastreio","label":"Rastreio"},{"value":"documentacao","label":"Documentação"},{"value":"outro","label":"Outro"}]'></app-dropdown>
              </div>

              <div class="field">
                <label class="field-label" for="contact-message">Descrição do problema</label>
                <textarea id="contact-message" name="problem" placeholder="Descreva detalhadamente o que aconteceu..." required></textarea>
              </div>

              <div class="actions">
                <app-button class="w-full" label="Cancelar" variant="secondary"></app-button>
                <app-button class="w-full" label="Enviar Chamado" type="submit"></app-button>
              </div>
            </form>
          `
          }

          ${
            this.isSubmitted
              ? `
            <div class="actions success-actions">
              <app-button class="w-full" label="Fechar" variant="secondary"></app-button>
            </div>
          `
              : ""
          }
        </div>
      </div>
    `;

    this.bindEvents();
  }
}

customElements.define("support-modal", SupportModal);
