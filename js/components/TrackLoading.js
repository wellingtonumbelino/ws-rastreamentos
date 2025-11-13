export function trackLoading() {
  const content = document.createElement('div');
  content.className = 'track-loading';

  const image = document.createElement('img');
  image.src = './images/package_icon.svg';
  const infoText = document.createElement('p');
  infoText.textContent = 'Buscando Informações'

  const loadingBar = document.createElement('div');
  loadingBar.id = 'loading-bar';
  loadingBar.className = 'loading-bar';

  const loadingDot = document.createElement('div');
  loadingDot.id = 'loading-dot';
  loadingDot.className = 'loading-dot';

  loadingBar.appendChild(loadingDot);

  content.appendChild(image);
  content.appendChild(infoText);
  content.appendChild(loadingBar);

  return content;
}
