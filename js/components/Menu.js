export function trackerMenu() {
  const nav = document.createElement('nav');
  nav.id = 'tracker-menu';
  nav.className = 'tracker-menu';

  const content = document.createElement('div');
  content.className = 'tracker-menu-content';

  const span = document.createElement('span');
  span.className = 'tracker-menu-system-name';
  span.textContent = 'WS Rastreamentos';

  content.appendChild(span);
  nav.appendChild(content);

  return nav;
}