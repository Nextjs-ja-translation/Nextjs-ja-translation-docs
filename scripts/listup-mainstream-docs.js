const fetch = require('node-fetch');

const organization = 'vercel';
const repository = 'next.js';
const basePath = 'docs';

const auth = { Accept: 'application/vnd.github.v3+json' };

const githubURL = `https://api.github.com/repos/${organization}/${repository}/contents/${basePath}`;

const getAllFilesInRepository = async function (githubURL) {
  const res = await fetch(githubURL, { method: 'GET', headers: auth });
  const data = await res.json();

  return (
    await Promise.all(
      data.map(async ({ path, name, type, html_url }) => {
        if (type === 'dir') {
          return await getAllFilesInRepository(`${githubURL}/${name}`);
        }

        return {
          name: path,
          url: html_url
        };
      })
    )
  ).flat();
};

(async () => {
  const files = await getAllFilesInRepository(githubURL);

  console.log(`${files.map(file => `- [ ] [${file.name}](${file.url})`).join('\n')}`);
})();
