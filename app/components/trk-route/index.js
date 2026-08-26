import TrkRouteStyle from "./style.css" with { type: "css" };

class TrkRoute extends HTMLElement {
  constructor() {
    super();

    this._status = "";
    this._route = { currentCity: "", cities: [] };

    this.attachShadow({ mode: "open" });
    this.shadowRoot.adoptedStyleSheets = [TrkRouteStyle];
  }

  set status(value) {
    this._status = value ?? "";

    if (this.isConnected) {
      this.render();
    }
  }

  set route(value) {
    this._route = value && Array.isArray(value.cities) ? value : this._route;

    if (this.isConnected) {
      this.render();
    }
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const cities = this._route.cities;

    this.shadowRoot.innerHTML = `
      <div class="trk-route">
        <h3>Rota do Objeto</h3>

        <div class="mini-map" role="img" aria-label="Mapa da rota do objeto">
          <svg viewBox="0 0 220 240" aria-hidden="true">
            <path class="brazil-map" d="M52 28 80 16 111 22 133 13 163 28 185 57 180 82 196 105 184 133 190 158 168 178 146 211 116 202 94 218 71 200 57 177 34 163 39 135 24 114 36 91 26 63Z"></path>
            <path class="route-line" d="M66 183 C90 152 111 126 140 92"></path>
            <circle class="route-point" cx="66" cy="183" r="5"></circle>
            <circle class="route-point current" cx="112" cy="126" r="6"></circle>
            <circle class="route-point" cx="140" cy="92" r="5"></circle>
          </svg>
          <span class="route-status"></span>
        </div>

        <div class="cities-route">
          <div class="city-acronyms"></div>
          <div class="city-names" aria-label="Percurso"></div>
        </div>
      </div>
    `;

    this.shadowRoot.querySelector(".route-status").textContent = this._status;

    const acronyms = this.shadowRoot.querySelector(".city-acronyms");
    const names = this.shadowRoot.querySelector(".city-names");

    cities.forEach((city, index) => {
      if (city.name === this._route.currentCity) {
        const currentCity = document.createElement("span");
        currentCity.className = "in-location";
        currentCity.textContent = city.name ?? "";
        acronyms.append(currentCity);
      } else {
        const acronym = document.createElement("span");
        acronym.className = "city-acronym";
        acronym.textContent = city.acronym ?? "";
        acronyms.append(acronym);
      }

      const name = document.createElement("span");
      name.textContent = city.name ?? "";
      names.append(name);

      if (index < cities.length - 1) {
        const arrow = document.createElement("span");
        arrow.className = "route-arrow";
        arrow.setAttribute("aria-hidden", "true");
        arrow.textContent = "→";
        names.append(arrow);
      }
    });
  }
}

customElements.define("trk-route", TrkRoute);
