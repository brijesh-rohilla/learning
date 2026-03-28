function toggle(header) {
  const body = header.nextElementSibling;
  const chevron = header.querySelector('.chevron');
  const isOpen = body.classList.contains('open');
  body.classList.toggle('open', !isOpen);
  chevron.classList.toggle('open', !isOpen);
}

function copy(text) {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      showToast('Prompt copied — paste it into Claude');
    })
    .catch(() => {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      showToast('Prompt copied — paste it into Claude');
    });
}

let toastTimer;
function showToast(msg) {
  const toast = document.getElementById('toast');
  document.getElementById('toast-text').textContent = msg;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2500);
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.phase-body.open').forEach((b) => {
      b.classList.remove('open');
      b.previousElementSibling.querySelector('.chevron').classList.remove('open');
    });
  }
});
