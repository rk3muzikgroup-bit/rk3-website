/* ───────── TAG UTILITIES ───────── */
/**
 * Tag format: "namespace:value"
 * Example: "chakra:heart", "frequency:528"
 */

export type Tag = string;

/* ───────── PARSERS ───────── */

/**
 * Safely parse a tag into namespace + value
 */
export function parseTag(
  tag: Tag
): { namespace: string; value: string } {
  const idx = tag.indexOf(":");

  if (idx === -1) {
    return { namespace: tag, value: "" };
  }

  return {
    namespace: tag.slice(0, idx),
    value: tag.slice(idx + 1),
  };
}

/* ───────── MATCHERS ───────── */

export function hasTag(
  tags: Tag[],
  match: Tag
): boolean {
  return tags.includes(match);
}

export function hasAnyTag(
  tags: Tag[],
  matches: Tag[]
): boolean {
  return matches.some(m => tags.includes(m));
}

export function hasAllTags(
  tags: Tag[],
  matches: Tag[]
): boolean {
  return matches.every(m => tags.includes(m));
}

export function hasNamespace(
  tags: Tag[],
  namespace: string
): boolean {
  return tags.some(
    t => t.startsWith(`${namespace}:`)
  );
}

export function getTagValues(
  tags: Tag[],
  namespace: string
): string[] {
  const prefix = `${namespace}:`;

  return tags
    .filter(t => t.startsWith(prefix))
    .map(t => t.slice(prefix.length))
    .filter(Boolean);
}
