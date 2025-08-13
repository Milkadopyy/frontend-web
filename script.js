const API = 'https://TON_BACKEND_RENDER_URL/predict';
const fileInput = document.getElementById('file');
const preview = document.getElementById('preview');
const analyzeBtn = document.getElementById('analyze');
const results = document.getElementById('results');
const scoreEl = document.getElementById('score');
const labelEl = document.getElementById('label');
const warningsEl = document.getElementById('warnings');
const heatmapEl = document.getElementById('heatmap');

fileInput.addEventListener('change', () => {
  const file = fileInput.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = e => preview.src = e.target.result;
    reader.readAsDataURL(file);
  }
});

analyzeBtn.addEventListener('click', async () => {
  const file = fileInput.files[0];
  if (!file) return alert('Choisis une image');
  const fd = new FormData();
  fd.append('file', file);
  const res = await fetch(API, { method: 'POST', body: fd });
  const data = await res.json();
  scoreEl.textContent = data.score.toFixed(3);
  labelEl.textContent = data.risk_label;
  warningsEl.innerHTML = data.warnings.map(w => `<div>${w}</div>`).join('');
  heatmapEl.src = 'data:image/png;base64,' + data.heatmap_base64;
  results.style.display = '';
});
