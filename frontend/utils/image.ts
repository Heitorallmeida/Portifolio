export function resolveImageSrc(image?: string | null): string | undefined {
  if (!image) return undefined;
  if (/^https?:\/\//i.test(image)) return image;
  if (image.startsWith("www.")) return `https://${image}`;

  return `/images/${image}`;
}
