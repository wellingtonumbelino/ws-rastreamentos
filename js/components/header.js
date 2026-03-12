class MainHeader extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <header id="main-header">
        <img src="images/logo.png" alt="WS Rastreamentos" />
        <div>WS Rastreamentos</div>
      </header>
    `
  }
}

customElements.define('main-header', MainHeader);