import { messages } from "../config/messages.js";
import { historyList } from './HistoryList.js';
import { tagStatus } from "./TagStatus.js";
import { trackLoading } from "./TrackLoading.js";

export function trackerOrderFound() {
  const section = document.createElement('section');
  section.id = 'tracker-order-found-panel';
  section.className = 'tracker-order-found-panel';

  const content = document.createElement('div');
  content.id = 'tracker-order-found-panel-content';
  content.className = 'tracker-content';

  const infoContainer = document.createElement('div');
  infoContainer.className = 'info-container';

  const infoImage = document.createElement('img');
  infoImage.src = './images/location_icon.svg';
  const infoMessage = document.createElement('p');
  infoMessage.textContent = messages.infoMessage;

  infoContainer.appendChild(infoImage);
  infoContainer.appendChild(infoMessage);

  content.appendChild(infoContainer);
  section.appendChild(content);

  return section;
}

export function showLoadingTracking() {
  const content = document.getElementById('tracker-order-found-panel-content');
  if (!content) return;

  content.innerHTML = '';
  content.appendChild(trackLoading());
}

export function trackerOrderFoundUpdate(data, message = 'Ops! Algo deu errado.') {
  const content = document.getElementById('tracker-order-found-panel-content');
  if (!content) return;

  content.innerHTML = '';

  if (Array.isArray(data) && data.length > 0) {
    const latest = data[0];
    const tagStatusComponent = tagStatus(latest.status);
    content.appendChild(tagStatusComponent);

    const historyContainer = historyList(data);
    content.appendChild(historyContainer);
  } else {
    const p = document.createElement('p');
    p.textContent = message;
    content.appendChild(p);
  }

  const section = document.getElementById('tracker-order-found-panel');
  if (section) section.classList.add('visible');
}