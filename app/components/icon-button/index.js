import IconButtonStyle from "./style.css" with { type: "css" };

class IconButton extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });
    this.shadowRoot.adoptedStyleSheets = [IconButtonStyle];
  }

  static observedAttributes = ["icon", "aria-label", "aria-expanded"];

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback(_, oldValue, newValue) {
    if (oldValue !== newValue && this.isConnected) {
      this.render();
    }
  }

  render() {
    const iconName = this.getAttribute("icon") ?? "";
    const button = document.createElement("button");
    const icon = document.createElement("img");
    const label =
      this.getAttribute("aria-label") ??
      (iconName.includes("copy") ? "Copiar código" : "Botão de ajuda");

    button.type = "button";
    button.setAttribute("aria-label", label);
    if (this.hasAttribute("aria-expanded")) {
      button.setAttribute("aria-expanded", this.getAttribute("aria-expanded"));
    }
    icon.alt = "";
    icon.src = new URL(`../../../images/icons/${iconName}`, import.meta.url);
    icon.setAttribute("aria-hidden", "true");
    button.append(icon);
    this.shadowRoot.replaceChildren(button);
  }
}

customElements.define("icon-button", IconButton);
