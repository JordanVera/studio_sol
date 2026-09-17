// Run in browser console on an Instagram post page.
(async () => {
  const imgs = new Set();
  for (let i = 0; i < 15; i++) {
    document.querySelectorAll('article img').forEach((img) => {
      if (
        img.src &&
        img.src.includes('cdninstagram') &&
        img.src.includes('82787-15') &&
        !img.src.includes('s150x150')
      ) {
        imgs.add(img.src);
      }
    });
    const next = [...document.querySelectorAll('button')].find(
      (b) => b.getAttribute('aria-label') === 'Next',
    );
    if (!next) break;
    next.click();
    await new Promise((r) => setTimeout(r, 900));
  }
  return [...imgs];
})();
