class Card extends HTMLElement {
  constructor() {
    super();
    this.style.display = "none";
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <div id="panel-card">
        <h3>Resultado do Rastreamento</h3>
        <hr>
        <div class="card-content"></div>
      </div>
    `;
  }

  showCard(data) {
    this.style.display = "block";

    const content = this.querySelector(".card-content");

    content.innerHTML = `
      <header class="result-header">
        <strong>Código de Rastreio:</strong> ${data.trackingCode}
      </header>
      <section class="result-status ${data.status.toLowerCase()}">
        <strong>Status:</strong> ${data.status}
      </section>
      <timeline-step status="${data.status}" date="2023-10-01" location="São Paulo, SP"></timeline-step>
    `;
  }
}

customElements.define("result-card", Card);
