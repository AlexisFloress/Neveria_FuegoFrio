(() => {
  'use strict';

  // Cada resultado ocupa dos sectores exactamente opuestos (índices 0/3, 1/4, 2/5).
  const outcomes = [
    { title: 'Ganaste una paleta', image: './assets/ganaste-una-paleta.png' },
    { title: 'Vuelve a intentarlo', image: './assets/vuelve-a-intentarlo.png' },
    { title: '50% de descuento en tu segunda paleta', image: './assets/descuento-segunda-paleta.png' },
    { title: 'Ganaste una paleta', image: './assets/ganaste-una-paleta.png' },
    { title: 'Vuelve a intentarlo', image: './assets/vuelve-a-intentarlo.png' },
    { title: '50% de descuento en tu segunda paleta', image: './assets/descuento-segunda-paleta.png' }
  ];

  const wheel = document.getElementById('wheel');
  const spinButton = document.getElementById('spin-button');
  const buttonLabel = document.getElementById('button-label');
  const status = document.getElementById('status');
  const dialog = document.getElementById('result-dialog');
  const resultTitle = document.getElementById('result-title');
  const resultImage = document.getElementById('result-image');
  const closeDialog = document.getElementById('close-dialog');
  const againButton = document.getElementById('again-button');

  let rotation = 0;
  let spinning = false;

  function randomIndex() {
    const values = new Uint32Array(1);
    if (globalThis.crypto?.getRandomValues) {
      globalThis.crypto.getRandomValues(values);
      // Rejection sampling removes modulo bias for six equally likely sectors.
      const limit = Math.floor(0x100000000 / 6) * 6;
      while (values[0] >= limit) globalThis.crypto.getRandomValues(values);
      return values[0] % 6;
    }
    return Math.floor(Math.random() * 6);
  }

  function reveal(index) {
    const result = outcomes[index];
    resultTitle.textContent = result.title;
    resultImage.src = result.image;
    resultImage.alt = `Resultado de la ruleta: ${result.title}`;
    status.textContent = `Resultado: ${result.title}.`;
    spinning = false;
    spinButton.disabled = false;
    buttonLabel.textContent = 'GIRAR LA RULETA';
    dialog.showModal();
  }

  function spin() {
    if (spinning) return;
    if (dialog.open) dialog.close();
    spinning = true;
    spinButton.disabled = true;
    buttonLabel.textContent = 'GIRANDO...';
    status.textContent = 'La ruleta está girando.';

    const index = randomIndex();
    const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const duration = reducedMotion ? 80 : 5200;
    const current = ((rotation % 360) + 360) % 360;
    // Los centros están en 0°, 60°, ...; el puntero fijo indica las 12.
    const desired = ((360 - index * 60) % 360 + 360) % 360;
    const advance = (desired - current + 360) % 360;
    rotation += (reducedMotion ? 0 : 6 * 360) + advance;
    wheel.style.transition = `transform ${duration}ms ${reducedMotion ? 'linear' : 'cubic-bezier(.13,.78,.12,1)'}`;
    requestAnimationFrame(() => {
      requestAnimationFrame(() => { wheel.style.transform = `rotate(${rotation}deg)`; });
    });
    window.setTimeout(() => reveal(index), duration + 80);
  }

  spinButton.addEventListener('click', spin);
  againButton.addEventListener('click', () => { dialog.close(); spinButton.focus(); spin(); });
  closeDialog.addEventListener('click', () => { dialog.close(); spinButton.focus(); });
  dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
})();
