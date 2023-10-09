const swap = ($in, $out, letters) => {
  const transform = (text) => {
    return text
      .split("")
      .map((l) => {
        l = l.toLowerCase();

        if (letters[l]) {
          return `&lrm;${letters[l]}`;
        }

        if (l === "\n") {
          return "<br/>";
        }

        if (l === " ") {
          return "&nbsp;&nbsp;";
        }

        return `&lrm;${l}`;
      })
      .join("");
  };

  const replaceText = () => ($out.innerHTML = transform($in.value));

  $in.addEventListener("input", replaceText);
  replaceText();
};
