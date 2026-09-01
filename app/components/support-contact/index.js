import SupportContactStyle from "./style.css" with { type: "css" };

class SupportContact extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });
    this.shadowRoot.adoptedStyleSheets = [SupportContactStyle];
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.modal = null;
  }

  connectedCallback() {
    this.ensureModal();
    this.render();
    this.bindEvents();
  }

  disconnectedCallback() {
    const button = this.shadowRoot.querySelector("app-button");
    button?.removeEventListener("on-click", this.handleOpenModal);

    if (this.modal) {
      this.modal.removeEventListener("support-close", this.handleCloseModal);
      this.modal.remove();
      this.modal = null;
    }
  }

  ensureModal() {
    const existingModal = document.body.querySelector("support-modal");

    if (existingModal) {
      this.modal = existingModal;
      this.modal.addEventListener("support-close", this.handleCloseModal);
      return existingModal;
    }

    const modal = document.createElement("support-modal");
    modal.setAttribute("hidden", "hidden");
    document.body.appendChild(modal);
    this.modal = modal;
    this.modal.addEventListener("support-close", this.handleCloseModal);
    return modal;
  }

  bindEvents() {
    const button = this.shadowRoot.querySelector("app-button");
    button?.addEventListener("on-click", this.handleOpenModal);
  }

  handleOpenModal() {
    this.modal?.removeAttribute("hidden");
  }

  handleCloseModal() {
    this.modal?.setAttribute("hidden", "hidden");
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

    this.bindEvents();
  }
}

customElements.define("support-contact", SupportContact);
