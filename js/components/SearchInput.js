export function searchInput(onSubmit) {
  const form = document.createElement('form');
  form.id = 'tracking-form';

  const container = document.createElement('div');
  container.className = 'tracking-search-container';

  const input = document.createElement('input');
  input.type = 'text';
  input.id = 'tracking-code';
  input.name = 'tracking-code';
  input.placeholder = 'Digite o código de rastreamento';
  input.required = true;

  const button = document.createElement('button');
  button.type = 'submit';
  button.id = 'tracking-search-button'
  button.textContent = 'Buscar'

  container.appendChild(input)
  container.appendChild(button)

  form.appendChild(container);

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const code = input.value.trim();
    onSubmit(code);
  });

  return form;
}