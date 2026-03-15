class MainHeader extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <header id="main-header">
        <section class="info-container">
          <img src="images/logo.png" alt="WS Rastreamentos" />
          <div>WS Rastreamentos</div>
        </section>
        <nav>
          <ul>
            <li><a href="#support">Ajuda</a></li>
            <li><a href="#contact">Contato</a></li>
          </ul>
        </nav>
      </header>
    `;
  }
}

customElements.define("main-header", MainHeader);
