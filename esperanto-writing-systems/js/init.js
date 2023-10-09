const init = () => {
  swap(
    document.querySelector(".phoenician textarea"),
    document.querySelector(".phoenician .output"),
    phoenician
  );

  swap(
    document.querySelector(".carian textarea"),
    document.querySelector(".carian .output"),
    carian
  );

  swap(
    document.querySelector(".custom textarea"),
    document.querySelector(".custom .output"),
    custom
  );

  diag(
    document.querySelector(".dia-g textarea"),
    document.querySelector(".dia-g .output")
  );

  diav(
    document.querySelector(".dia-v textarea"),
    document.querySelector(".dia-v .output")
  );
};

document.addEventListener("DOMContentLoaded", init);
