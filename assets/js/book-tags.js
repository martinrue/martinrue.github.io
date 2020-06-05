const booktags = (() => {
  let $tags = null;
  let $books = null;

  const selectTag = ($tag) => {
    $tags.forEach(($t) => $t.classList.remove("active"));
    $tag.classList.add("active");
  };

  const filterBooks = (type) => {
    $books.forEach(($b) => {
      $b.style.display = "none";

      if (type === "all" || $b.dataset.tags.indexOf(type) !== -1) {
        $b.style.display = "block";
      }
    });
  };

  const init = () => {
    $tags = lib.$$(".tags a");
    $books = lib.$$(".books a");

    $tags.forEach(($tag) => {
      $tag.addEventListener("click", (e) => {
        e.preventDefault();
        selectTag(e.target);
        filterBooks(e.target.dataset.tag);
      });
    });
  };

  return {
    init: init,
  };
})();

lib.onReady(booktags.init);
