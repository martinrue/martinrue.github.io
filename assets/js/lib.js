const lib = (() => {
  const onReady = (fn) => {
    document.addEventListener("DOMContentLoaded", fn);
  };

  const copy = (text) => {
    navigator.clipboard.writeText(text);
  };

  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => document.querySelectorAll(selector);

  return { onReady, copy, $, $$ };
})();
