const diav = ($in, $out) => {
  const points = {
    a: String.fromCodePoint(0x0320),
    e: String.fromCodePoint(0x0324),
    i: String.fromCodePoint(0x0323),
    o: String.fromCodePoint(0x0325),
    u: String.fromCodePoint(0x0348),
  };

  const transform = (text) => {
    return text
      .split(/(\n| )/)
      .map((w) => {
        if (w === "\n") {
          return "<br/>";
        }

        if (w.trim() === "" || w.length === 1) {
          return w;
        }

        w = w.replace(/(?<!^)[a|A]/g, points.a);
        w = w.replace(/(?<!^)[e|E]/g, points.e);
        w = w.replace(/(?<!^)[i|I]/g, points.i);
        w = w.replace(/(?<!^)[o|O]/g, points.o);
        return w.replace(/(?<!^)[u|U]/g, points.u);
      })
      .join(" ");
  };

  const replaceText = () => ($out.innerHTML = transform($in.value));

  $in.addEventListener("input", replaceText);
  replaceText();
};
