import AppDropdownStyle from "./style.css" with { type: "css" };

class AppDropdown extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });
    this.shadowRoot.adoptedStyleSheets = [AppDropdownStyle];

    this.handleDropdownClick = this.handleDropdownClick.bind(this);
    this.handleDocumentClick = this.handleDocumentClick.bind(this);

    this._options = [];
    this._value = "";
    this._label = "";
    this._placeholder = "Selecione uma opção";
    this._open = false;
    this._name = "";
    this._disabled = false;
    this.selectionCallback = null;
    this.onSelect = null;
  }

  static get observedAttributes() {
    return ["label", "placeholder", "value", "name", "disabled", "options"];
  }

  connectedCallback() {
    this.shadowRoot.addEventListener("click", this.handleDropdownClick);
    document.addEventListener("click", this.handleDocumentClick);
    this.syncFromAttributes();
    this.render();
  }

  disconnectedCallback() {
    this.shadowRoot.removeEventListener("click", this.handleDropdownClick);
    document.removeEventListener("click", this.handleDocumentClick);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) {
      return;
    }

    if (name === "options" && newValue !== null) {
      try {
        this.options = JSON.parse(newValue);
      } catch (error) {
        this.options = [];
      }
      return;
    }

    if (name === "value") {
      this._value = newValue ?? "";
    }

    if (name === "label") {
      this._label = newValue ?? "";
    }

    if (name === "placeholder") {
      this._placeholder = newValue ?? "Selecione uma opção";
    }

    if (name === "name") {
      this._name = newValue ?? "";
    }

    if (name === "disabled") {
      this._disabled = newValue !== null;
    }

    if (this.isConnected) {
      this.render();
    }
  }

  syncFromAttributes() {
    const label = this.getAttribute("label") ?? this._label;
    const placeholder = this.getAttribute("placeholder") ?? this._placeholder;
    const value = this.getAttribute("value") ?? this._value;
    const name = this.getAttribute("name") ?? this._name;
    const disabled = this.hasAttribute("disabled");
    const options = this.getAttribute("options");

    this._label = label;
    this._placeholder = placeholder;
    this._value = value ?? "";
    this._name = name;
    this._disabled = disabled;

    if (options) {
      try {
        this.options = JSON.parse(options);
      } catch (error) {
        this.options = [];
      }
    }
  }

  set options(value) {
    this._options = Array.isArray(value)
      ? value.map((option) => ({
          value: option?.value ?? "",
          label: option?.label ?? option?.text ?? option?.value ?? "",
          disabled: Boolean(option?.disabled),
          selected: Boolean(option?.selected),
        }))
      : [];

    const hasSelected = this._options.some(
      (option) => option.selected && !option.disabled,
    );

    if (!this._value && hasSelected) {
      const defaultOption = this._options.find(
        (option) => option.selected && !option.disabled,
      );
      this._value = String(defaultOption.value);
      this.setAttribute("value", this._value);
    }

    if (this.isConnected) {
      this.render();
    }
  }

  get options() {
    return this._options;
  }

  set value(nextValue) {
    const normalizedValue = nextValue == null ? "" : String(nextValue);
    this._value = normalizedValue;

    if (normalizedValue) {
      this.setAttribute("value", normalizedValue);
    } else {
      this.removeAttribute("value");
    }

    if (this.isConnected) {
      this.render();
    }
  }

  get value() {
    return this._value;
  }

  set label(nextLabel) {
    this._label = nextLabel ?? "";

    if (this._label) {
      this.setAttribute("label", this._label);
    } else {
      this.removeAttribute("label");
    }

    if (this.isConnected) {
      this.render();
    }
  }

  get label() {
    return this._label;
  }

  set placeholder(nextPlaceholder) {
    this._placeholder = nextPlaceholder ?? "Selecione uma opção";

    if (this._placeholder) {
      this.setAttribute("placeholder", this._placeholder);
    } else {
      this.removeAttribute("placeholder");
    }

    if (this.isConnected) {
      this.render();
    }
  }

  get placeholder() {
    return this._placeholder;
  }

  set disabled(nextDisabled) {
    this._disabled = Boolean(nextDisabled);

    if (this._disabled) {
      this.setAttribute("disabled", "");
    } else {
      this.removeAttribute("disabled");
    }

    if (this.isConnected) {
      this.render();
    }
  }

  get disabled() {
    return this._disabled;
  }

  set open(nextOpen) {
    this._open = Boolean(nextOpen);
    if (this.isConnected) {
      this.render();
    }
  }

  get open() {
    return this._open;
  }

  get selectedOption() {
    return (
      this._options.find(
        (option) => String(option.value) === String(this._value),
      ) ?? null
    );
  }

  handleDocumentClick(event) {
    if (!event.composedPath().includes(this)) {
      this._open = false;
      if (this.isConnected) {
        this.render();
      }
    }
  }

  handleDropdownClick(event) {
    const trigger = event.target.closest(".dropdown-trigger");
    const optionButton = event.target.closest(".dropdown-option");

    if (trigger) {
      if (this._disabled) {
        return;
      }

      this._open = !this._open;
      this.render();
      return;
    }

    if (optionButton && !this._disabled) {
      const { value } = optionButton.dataset;
      const option = this._options.find(
        (item) => String(item.value) === String(value),
      );

      if (!option || option.disabled) {
        return;
      }

      this.selectOption(option, event);
    }
  }

  selectOption(option, originalEvent) {
    this._value = String(option.value);
    this._open = false;
    this.setAttribute("value", this._value);

    const selectionDetail = {
      value: option.value,
      label: option.label,
      option,
      index: this._options.indexOf(option),
      originalEvent,
      target: this,
    };

    this.dispatchEvent(
      new CustomEvent("selection-change", {
        bubbles: true,
        composed: true,
        detail: selectionDetail,
      }),
    );

    if (typeof this.selectionCallback === "function") {
      this.selectionCallback(selectionDetail);
    }

    if (typeof this.onSelect === "function") {
      this.onSelect(selectionDetail);
    }

    this.render();
  }

  escapeHTML(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  render() {
    const selectedOption = this.selectedOption;
    const triggerLabel = selectedOption
      ? selectedOption.label
      : this._placeholder;
    const optionsMarkup = this._options.length
      ? this._options
          .map((option) => {
            const isSelected = String(option.value) === String(this._value);
            const safeValue = this.escapeHTML(String(option.value));
            const safeLabel = this.escapeHTML(
              option.label ?? option.value ?? "",
            );

            return `
              <li>
                <button
                  type="button"
                  class="dropdown-option ${isSelected ? "is-selected" : ""}"
                  data-value="${safeValue}"
                  ${option.disabled ? "disabled" : ""}
                  aria-selected="${isSelected ? "true" : "false"}"
                >
                  ${safeLabel}
                </button>
              </li>
            `;
          })
          .join("")
      : '<li><span class="dropdown-empty">Nenhuma opção disponível</span></li>';

    this.shadowRoot.innerHTML = `
      <div class="dropdown ${this._open ? "open" : ""}">
        <button
          type="button"
          class="dropdown-trigger"
          aria-haspopup="listbox"
          aria-expanded="${this._open ? "true" : "false"}"
          aria-label="${this.escapeHTML(this._label || this._placeholder)}"
          ${this._disabled ? "disabled" : ""}
        >
          <span class="dropdown-label">${this.escapeHTML(triggerLabel)}</span>
          <span class="dropdown-arrow" aria-hidden="true">▾</span>
        </button>

        <ul class="dropdown-menu" role="listbox" aria-label="${this.escapeHTML(this._label || this._placeholder)}" ${this._open ? "" : "hidden"}>
          ${optionsMarkup}
        </ul>
      </div>
    `;
  }
}

customElements.define("app-dropdown", AppDropdown);
