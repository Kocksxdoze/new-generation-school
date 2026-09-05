import slugifyLib from "slugify";

// Transliterates Cyrillic titles into clean URL-safe slugs, e.g.
// "Кампус №-2 выходит на связь!" -> "kampus-2-vykhodit-na-svyaz".
const cyrillicToLatin = {
  а: "a", б: "b", в: "v", г: "g", д: "d", е: "e", ё: "e", ж: "zh", з: "z",
  и: "i", й: "y", к: "k", л: "l", м: "m", н: "n", о: "o", п: "p", р: "r",
  с: "s", т: "t", у: "u", ф: "f", х: "kh", ц: "ts", ч: "ch", ш: "sh",
  щ: "shch", ъ: "", ы: "y", ь: "", э: "e", ю: "yu", я: "ya",
};

function transliterate(text) {
  return text
    .toLowerCase()
    .split("")
    .map((char) => cyrillicToLatin[char] ?? char)
    .join("");
}

export function slugify(text, { suffix } = {}) {
  const base = slugifyLib(transliterate(text), { strict: true, trim: true });
  return suffix ? `${base}-${suffix}` : base;
}
