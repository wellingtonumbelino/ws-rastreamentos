class Spinner extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <div id="spinner-overlay">
        <div class="spinner"></div>
      </div>
    `;
  }
}

customElements.define('spinner-loading', Spinner);