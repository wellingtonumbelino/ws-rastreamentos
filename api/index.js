const simulateDelay = () => new Promise(resolve => {
  const delay = Math.random() * 3000;
  setTimeout(resolve, delay);
});

export async function fetchTrackingInfo(code = '') {
  await simulateDelay();

  const response = await fetch('./data/mockData.json');
  const data = await response.json();

  return data[code] || null;
}