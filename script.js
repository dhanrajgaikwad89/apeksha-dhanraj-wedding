const hero = document.querySelector('.hero');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
if (window.matchMedia('(pointer: fine)').matches) {
  hero.addEventListener('pointermove', (event) => {
    if (reduceMotion.matches) return;
    const bounds = hero.getBoundingClientRect();
    hero.style.setProperty('--move-x', `${(event.clientX - bounds.left - bounds.width / 2) * -0.012}px`);
    hero.style.setProperty('--move-y', `${(event.clientY - bounds.top - bounds.height / 2) * -0.012}px`);
  });
  hero.addEventListener('pointerleave', () => {
    hero.style.setProperty('--move-x', '0px');
    hero.style.setProperty('--move-y', '0px');
  });
}
const dialog = document.querySelector('#share-dialog');
const shareUrl = document.querySelector('#share-url');
document.querySelector('#share').addEventListener('click', () => {
  const isLocal = location.hostname === 'localhost' || location.hostname === '127.0.0.1' || location.protocol === 'file:';
  shareUrl.value = isLocal ? '' : location.origin + location.pathname;
  shareUrl.placeholder = isLocal ? 'Your invitation link will appear after publishing' : '';
  document.querySelector('#copy-link').disabled = isLocal;
  document.querySelector('#copy-status').textContent = isLocal ? 'This is a local preview. Publish the website to share its link.' : '';
  dialog.showModal();
});
document.querySelector('#copy-link').addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(shareUrl.value);
    document.querySelector('#copy-status').textContent = 'Invitation link copied.';
  } catch {
    shareUrl.focus();
    shareUrl.select();
    document.querySelector('#copy-status').textContent = 'Select and copy the link above.';
  }
});
dialog.addEventListener('click', (event) => {
  if (event.target !== dialog) return;
  const rect = dialog.getBoundingClientRect();
  if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
});
