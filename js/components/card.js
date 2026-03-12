class Card extends HTMLElement {
  constructor() {
    super();
    this.style.display = 'none';
  }
  
  connectedCallback() {
    this.render();
  }

  render() {
    
  }

  showCard(data) {
    this.style.display = 'block';

    const content = this.querySelector('.card-content');
  }
}