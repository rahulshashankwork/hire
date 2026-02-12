const form = document.getElementById('resume-form');
const printBtn = document.getElementById('print-btn');

const directFields = [
  'fullName',
  'title',
  'email',
  'phone',
  'location',
  'summary',
];

function sanitizeText(value) {
  return value.trim().replace(/\s+/g, ' ');
}

function renderList(container, content, separator = ',') {
  const entries = content
    .split(separator)
    .map((item) => sanitizeText(item))
    .filter(Boolean);

  container.innerHTML = '';
  entries.forEach((entry) => {
    const li = document.createElement('li');
    li.textContent = entry;
    container.appendChild(li);
  });

  if (!entries.length) {
    const fallback = document.createElement('li');
    fallback.textContent = 'N/A';
    container.appendChild(fallback);
  }
}

function renderBlocks(container, content) {
  const lines = content
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);

  container.innerHTML = '';
  lines.forEach((line) => {
    const item = document.createElement('p');
    item.className = 'line-item';
    item.textContent = line;
    container.appendChild(item);
  });

  if (!lines.length) {
    container.textContent = 'N/A';
  }
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(form);

  directFields.forEach((field) => {
    const node = document.querySelector(`[data-field="${field}"]`);
    if (node) {
      node.textContent = sanitizeText(data.get(field) || '');
    }
  });

  renderList(document.getElementById('skills-list'), data.get('skills') || '');
  renderBlocks(document.getElementById('experience-content'), data.get('experience') || '');
  renderBlocks(document.getElementById('education-content'), data.get('education') || '');
});

printBtn.addEventListener('click', () => {
  window.print();
});

form.requestSubmit();
