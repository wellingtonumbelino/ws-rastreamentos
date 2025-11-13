import { historyItem } from './HistoryItem.js';

export function historyList(data = []) {
  const historyContainer = document.createElement('div');
  historyContainer.className = 'tracker-history';

  data.forEach(entry => {
    historyContainer.appendChild(historyItem(entry));
  });

  return historyContainer;
}
