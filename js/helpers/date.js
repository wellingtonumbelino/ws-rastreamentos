export function formatDate(dateString = "") {
  const date = new Date(dateString);
  if (isNaN(date)) return "";

  const day = String(date.getDate()).padStart(2, '0');
  const monthIndex = date.getMonth();
  const year = date.getFullYear();
  const months = [
    'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
    'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
  ];
  const monthAbbrev = months[monthIndex] || '';

  return `${day} ${monthAbbrev}. ${year}`;
}