const diag = ($in, $out) => {
  const points = {
    iverb: String.fromCodePoint(0x0329),
    uverb: String.fromCodePoint(0x0323),
    isverb: String.fromCodePoint(0x0316),
    asverb: String.fromCodePoint(0x0331),
    osverb: String.fromCodePoint(0x0317),
    usverb: String.fromCodePoint(0x0330),
    adverb: String.fromCodePoint(0x0331),
    noun: String.fromCodePoint(0x0325),
    adjective: String.fromCodePoint(0x035a),
    singular: String.fromCodePoint(0x0329),
    plural: String.fromCodePoint(0x0348),
    object: String.fromCodePoint(0x0323),
  };

  const parseVerb = (word) => {
    const wordl = word.toLowerCase();

    const endings1 = ["i", "u"];
    const endings2 = ["as", "is", "os", "us"];

    const mapping = {
      i: points.iverb,
      u: points.uverb,
      is: points.isverb,
      as: points.asverb,
      os: points.osverb,
      us: points.usverb,
    };

    if (wordl.length >= 2) {
      const last2 = wordl.slice(-2);

      if (endings2.indexOf(last2) !== -1) {
        return `${word[0]}${mapping[last2]}${word.slice(1, word.length - 2)}`;
      }
    }

    if (wordl.length >= 1) {
      const last1 = wordl.slice(-1);

      if (endings1.indexOf(last1) !== -1) {
        return `${word[0]}${mapping[last1]}${word.slice(1, word.length - 1)}`;
      }
    }

    return word;
  };

  const parseAdverb = (word) => {
    const wordl = word.toLowerCase();

    if (wordl.match(/en$/g)) {
      const start = word.slice(0, word.length - 2);
      return `${start}${points.adverb}${points.object}`;
    }

    if (wordl.match(/e$/g)) {
      const start = word.slice(0, word.length - 1);
      return `${start}${points.adverb}`;
    }

    return word;
  };

  const parseRest = (word) => {
    const wordl = word.toLowerCase();

    let diacritics = [];

    if (wordl.match(/ojn$/g)) {
      diacritics = [points.noun, points.plural, points.object];
    }

    if (wordl.match(/ajn$/g)) {
      diacritics = [points.adjective, points.plural, points.object];
    }

    if (wordl.match(/oj$/g)) {
      diacritics = [points.noun, points.plural];
    }

    if (wordl.match(/aj$/g)) {
      diacritics = [points.adjective, points.plural];
    }

    if (wordl.match(/on$/g)) {
      diacritics = [points.noun, points.object];
    }

    if (wordl.match(/an$/g)) {
      diacritics = [points.adjective, points.object];
    }

    if (wordl.match(/o$/g)) {
      diacritics = [points.noun];
    }

    if (wordl.match(/a$/g)) {
      diacritics = [points.adjective];
    }

    if (diacritics.length > 0) {
      const root = word.slice(1, word.length - diacritics.length);
      return `${word[0]}${diacritics.join("")}${root}`;
    }

    return word;
  };

  const transform = (text) => {
    const exceptions = [
      "unu",
      "du",
      "tri",
      "plu",
      "ĵus",
      "mi",
      "vi",
      "ŝi",
      "li",
      "ĝi",
      "ili",
      "ni",
      "si",
      "oni",
      "ri",
      "ĉi",
      "ĉu",
      "jen",
      "je",
      "de",
      "ĉe",
      "kaj",
      "la",
      "da",
      "ie",
      "io",
      "ia",
      "iu",
      "kie",
      "kio",
      "kia",
      "kiu",
      "tie",
      "tio",
      "tia",
      "tiu",
      "ĉie",
      "ĉio",
      "ĉia",
      "ĉiu",
      "nenie",
      "nenio",
      "nenia",
      "neniu",
    ];

    return text
      .split(/(\n| )/)
      .map((w) => {
        if (w === "\n") {
          return "<br/>";
        }

        if (w.trim() === "" || w.length === 1) {
          return w;
        }

        if (exceptions.indexOf(w.toLowerCase()) !== -1) {
          return w;
        }

        const hasPunc = w.match(/[\.\,\?]$/);
        let punc = "";

        if (hasPunc) {
          punc = w[w.length - 1];
          w = w.slice(0, -1);
        }

        w = parseVerb(w);
        w = parseAdverb(w);
        w = parseRest(w);

        return `${w}${punc}`;
      })
      .join(" ");
  };

  const replaceText = () => ($out.innerHTML = transform($in.value));

  $in.addEventListener("input", replaceText);
  replaceText();
};
