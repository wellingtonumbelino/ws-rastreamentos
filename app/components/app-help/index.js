import AppHelpStyle from "./style.css" with { type: "css" };

class AppHelp extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });
    this.shadowRoot.adoptedStyleSheets = [AppHelpStyle];
    this.handleIconButtonClick = this.handleIconButtonClick.bind(this);
    this.handleDocumentClick = this.handleDocumentClick.bind(this);
    this.trackingCodes = [];
  }

  connectedCallback() {
    this.render();
    this.iconButton = this.shadowRoot.querySelector("icon-button");
    this.addEventListener("click", this.handleIconButtonClick);
    document.addEventListener("click", this.handleDocumentClick);
    this.loadTrackingCodes();
  }

  disconnectedCallback() {
    this.removeEventListener("click", this.handleIconButtonClick);
    document.removeEventListener("click", this.handleDocumentClick);
  }

  async loadTrackingCodes() {
    try {
      const response = await fetch("./data/tracking.json");

      if (!response.ok) {
        throw new Error(`Falha ao carregar códigos: ${response.status}`);
      }

      const trackingData = await response.json();
      this.trackingCodes = Object.keys(trackingData);
      this.renderCodes();
    } catch (error) {
      console.error(
        "Não foi possível carregar os códigos de rastreamento.",
        error,
      );
    }
  }

  handleIconButtonClick(event) {
    const copyButton = event
      .composedPath()
      .find((element) => element?.dataset?.copyCode);
    const code = copyButton?.dataset.copyCode;

    if (code) {
      this.copyTrackingCode(code, copyButton);
    }

    const dropdown = this.shadowRoot.querySelector(".tracking-codes");
    const isOpen = dropdown.classList.toggle("is-open");
    this.iconButton.setAttribute("aria-expanded", String(isOpen));
  }

  handleDocumentClick(event) {
    if (!event.composedPath().includes(this)) {
      const dropdown = this.shadowRoot.querySelector(".tracking-codes");
      dropdown.classList.remove("is-open");
      this.iconButton.setAttribute("aria-expanded", "false");
    }
  }

  async copyTrackingCode(code, button) {
    try {
      await navigator.clipboard.writeText(code);
      button.setAttribute("data-copied", "true");
      button.setAttribute("aria-label", "Código copiado");
      setTimeout(() => {
        button.removeAttribute("data-copied");
        button.setAttribute("aria-label", "Copiar código");
      }, 1500);
    } catch (error) {
      console.error("Não foi possível copiar o código de rastreamento.", error);
    }
  }

  render() {
    this.shadowRoot.innerHTML = `
      <icon-button icon="help-circle-svgrepo-com.svg"></icon-button>
      <div class="tracking-codes" aria-label="Códigos de rastreamento">
        <p class="tracking-codes-empty">Carregando códigos...</p>
      </div>
    `;

    this.iconButton = this.shadowRoot.querySelector("icon-button");
    this.iconButton.setAttribute("aria-expanded", "false");
  }

  renderCodes() {
    const dropdown = this.shadowRoot.querySelector(".tracking-codes");
    dropdown.replaceChildren();

    for (const code of this.trackingCodes) {
      const item = document.createElement("div");
      item.className = "tracking-code-item";

      const codeText = document.createElement("span");
      codeText.textContent = code;

      const copyButton = document.createElement("icon-button");
      copyButton.setAttribute("icon", "copy-svgrepo-com.svg");
      copyButton.dataset.copyCode = code;

      item.append(codeText, copyButton);
      dropdown.append(item);
    }
  }
}

customElements.define("app-help", AppHelp);
