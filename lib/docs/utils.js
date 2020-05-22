export function getSlug({ slug }) {
  if (slug[0] === 'tag') {
    return {
      tag: slug[1],
      slug: `/docs/${slug.slice(2).join('/')}`
    };
  }
  return { slug: `/docs/${slug.join('/')}` };
}

export function removeFromLast(path, key) {
  const i = path.lastIndexOf(key);
  return i === -1 ? path : path.substring(0, i);
}

export function addTagToSlug(slug, tag) {
  return tag ? slug.replace('/docs', `/docs/tag/${tag}`) : slug;
}
