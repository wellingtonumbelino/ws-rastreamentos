import { formatDate } from '../helpers/date.js';

export function historyItem(entry = {}) {
  const divContainerContent = document.createElement('div');
  divContainerContent.className = 'tracker-container-content';

  const imgLocation = document.createElement('img');
  imgLocation.src = './images/location_small_icon.svg';

  const divInfo = document.createElement('div');
  divInfo.className = 'tracker-info-container';

  const spanDate = document.createElement('span');
  spanDate.className = 'tracker-date';
  spanDate.textContent = formatDate(entry.date);

  const spanDescription = document.createElement('span');
  spanDescription.className = 'tracker-description';
  spanDescription.textContent = entry.description || '';

  const spanLocal = document.createElement('span');
  spanLocal.className = 'tracker-local';
  spanLocal.textContent = entry.local || '';

  divInfo.appendChild(spanDate);
  divInfo.appendChild(spanDescription);
  divInfo.appendChild(spanLocal);

  divContainerContent.appendChild(imgLocation);
  divContainerContent.appendChild(divInfo);

  return divContainerContent;
}
