export function trackImage() {
  const img = document.createElement('img');
  img.src = './images/track_background.svg';
  img.alt = 'Imagem ilustrativa de rastreamento';
  img.className = 'tracking-image';
  return img;
}