import appButtonStyle from "./style.css" with { type: "css" };

class AppButton extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });
    this.shadowRoot.adoptedStyleSheets = [appButtonStyle];
  }

  static observedAttributes = ["label", "type"];

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback(_, oldValue, newValue) {
    if (oldValue !== newValue && this.isConnected) {
      this.render();
    }
  }

  render() {
    const allowedTypes = new Set(["button", "submit", "reset"]);
    const requestedType = this.getAttribute("type");
    const button = document.createElement("button");

    button.className = "btn";
    button.type = allowedTypes.has(requestedType) ? requestedType : "button";
    button.textContent = this.getAttribute("label") ?? "Button";

    button.addEventListener("click", () => {
      this.dispatchEvent(
        new CustomEvent("on-click", {
          bubbles: true,
          composed: true,
          detail: {
            button: this,
          },
        }),
      );
    });

    this.shadowRoot.replaceChildren(button);
  }
}

customElements.define("app-button", AppButton);
