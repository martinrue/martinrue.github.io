const hello = (() => {
  const start = () => {
    const $english = lib.$(".typewriter .english");
    const $hebrew = lib.$(".typewriter .hebrew");
    const $german = lib.$(".typewriter .german");
    const $spanish = lib.$(".typewriter .spanish");
    const $esperanto = lib.$(".typewriter .esperanto");

    const all = [$english, $hebrew, $german, $spanish, $esperanto];
    let current = 0;

    const hideAll = () => {
      all.forEach(($elem) => ($elem.style.display = "none"));
    };

    const showNext = () => {
      if (current >= all.length) {
        current = 0;
      }

      hideAll();

      all[current].style.display = "inline-block";
      current += 1;
    };

    setTimeout(() => {
      showNext();
      setInterval(showNext, 5000);
    }, 500);
  };

  return {
    start: start,
  };
})();

lib.onReady(hello.start);
