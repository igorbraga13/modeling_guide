document$.subscribe(() => {
  if (window.MathJax) {
    MathJax.typesetClear?.();
    MathJax.typesetPromise().catch(err => console.error("MathJax error:", err));
  }
});
