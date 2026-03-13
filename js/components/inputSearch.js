class InputSearch extends HTMLElement {
  connectedCallback() {
    this.render();
    this.setupEventListener();
  }

  render() {
    this.innerHTML = `
      <div id="input-search">
        <input type="text" placeholder="Digite o código de rastreamento" />
        <button>
          <img src="images/icons/search.svg" alt="Buscar" />
        </button>
      </div>
    `;
  }

  setupEventListener() {
    const btn = this.querySelector("button");

    if (btn) {
      btn.onclick = () => this.handleSearch();
    }
  }

  async handleSearch() {
    const duration = parseInt(this.getAttribute("duration") || 3000);
    const inputCode = this.querySelector("input").value.trim().toUpperCase();

    if (!inputCode)
      return alert("Por favor, insira um código de rastreamento válido.");

    const spinner = document.createElement("spinner-loading");
    const btn = this.querySelector("button");
    const input = this.querySelector("input");

    document.body.appendChild(spinner);
    btn.disabled = true;
    input.disabled = true;
    this.style.opacity = "0.6";

    try {
      const response = await fetch("./data/tracking.json");
      const data = await response.json();

      if (data[inputCode]) {
        const card = document.querySelector("result-card");

        if (card) {
          card.showCard({
            trackingCode: inputCode,
            status: data[inputCode].status,
            history: data[inputCode].history,
          });
        } else {
          alert("Card de resultado não encontrado.");
        }
      }
    } catch (error) {
      console.error("Erro ao buscar dados de rastreamento:", error);
    } finally {
      spinner.remove();
      btn.disabled = false;
      input.disabled = false;
      this.style.opacity = "1";
      btn.disabled = false;
    }
  }
}

customElements.define("input-search", InputSearch);
