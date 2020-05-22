import fs from 'fs';
import RSS from 'rss';

function importAll(r) {
  return r.keys().map(r);
}

const previewItems = importAll(require.context('../blog', false, /\-preview\.mdx$/));

function dateSortDesc(a, b) {
  const date1 = new Date(a.meta.date);
  const date2 = new Date(b.meta.date);
  if (date1 > date2) return -1;
  if (date1 < date2) return 1;
  return 0;
}

function generate() {
  const feed = new RSS({
    title: 'Next.js Blog',
    site_url: 'https://nextjs.org',
    feed_url: 'https://nextjs.org/feed.xml'
  });

  previewItems.sort(dateSortDesc).map(({ meta }) => {
    feed.item({
      title: meta.title,
      guid: meta.link,
      url: meta.url,
      date: meta.date,
      description: meta.description,
      custom_elements: [].concat(meta.authors.map(author => ({ author: [{ name: author.name }] })))
    });
  });

  const rss = feed.xml({ indent: true });

  fs.writeFileSync('./.next/static/feed.xml', rss);
}

generate();
