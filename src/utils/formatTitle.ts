export function formatTitle(title: string): string {
  return title
    .toLowerCase()
    .trim() // supprime les espaces au début et à la fin
    .normalize('NFD') // normalise les caractères accentués
    .replace(/[\u0300-\u036f]/g, '') // supprime les accents
    .replace(/\s+/g, '-') // remplace les espaces par des tirets
    .replace(/[^a-z0-9-]/g, '') // supprime les caractères spéciaux
    .replace(/^-+|-+$/g, ''); // supprime les tirets au début et à la fin
}
