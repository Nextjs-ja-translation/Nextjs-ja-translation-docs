import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Error from 'next/error';
import Head from 'next/head';
import matter from 'gray-matter';
import hashMap from '../../lib/docs/hash-map.json';
import { getSlug, removeFromLast, addTagToSlug } from '../../lib/docs/utils';
import { getPaths, getCurrentTag, findRouteByPath, fetchDocsManifest } from '../../lib/docs/page';
import { getRawFileFromRepo } from '../../lib/github/raw';
import markdownToHtml from '../../lib/docs/markdown-to-html';
import getRouteContext from '../../lib/get-route-context';
import PageContent from '../../components/page-content';
import Container from '../../components/container';
import DocsPage from '../../components/docs/docs-page';
import SocialMeta from '../../components/social-meta';
import { Sidebar, SidebarMobile, Post, Category, Heading } from '../../components/sidebar';
import Page from '../../components/page';
import Sticky from '../../components/sticky';
import { useIsMobile } from '../../components/media-query';
import FeedbackContext from '../../components/feedback-context';
import Skeleton from '../../components/skeleton';

function getCategoryPath(routes) {
  const route = routes.find(r => r.path);
  return route && removeFromLast(route.path, '/');
}

function SidebarRoutes({ isMobile, routes: currentRoutes, level = 1 }) {
  const { query } = useRouter();
  const { tag, slug } = getSlug(query);

  return currentRoutes.map(({ path, title, routes, heading, open }) => {
    if (routes) {
      const pathname = getCategoryPath(routes);
      const selected = slug.startsWith(pathname);
      const opened = selected || isMobile ? false : open;

      if (heading) {
        return (
          <Heading key={pathname} title={title}>
            <SidebarRoutes isMobile={isMobile} routes={routes} level={level + 1} />
          </Heading>
        );
      }

      return (
        <Category
          key={pathname}
          isMobile={isMobile}
          level={level}
          title={title}
          selected={selected}
          opened={opened}
        >
          <SidebarRoutes isMobile={isMobile} routes={routes} level={level + 1} />
        </Category>
      );
    }

    const href = '/docs/[...slug]';
    const pagePath = removeFromLast(path, '.');
    const pathname = addTagToSlug(pagePath, tag);
    const selected = slug.startsWith(pagePath);
    const route = { href, path, title, pathname, selected };

    return <Post key={title} isMobile={isMobile} level={level} route={route} />;
  });
}

const Docs = ({ routes, route: _route, data, html }) => {
  const router = useRouter();
  const { asPath, isFallback, query } = router;
  const isMobile = useIsMobile();
  const { route, prevRoute, nextRoute } = _route ? getRouteContext(_route, routes) : {};

  useEffect(() => {
    if (asPath.startsWith('/docs#')) {
      const hash = asPath.split('#')[1];

      // excluded hashes don't need to be redirected to the olds docs because they are covered
      // by the first page of the new docs (/docs/getting-started)
      if (!hashMap.excluded.includes(hash)) {
        const to = hashMap.redirects[hash];
        // Redirect the user to the section in the new docs that corresponds to the hash,
        // or to the old docs if a redirect for that hash is not set
        router.push(`/docs${to || `/old#${hash}`}`);
      }
    }
  }, [asPath]);

  if (!route && !isFallback) {
    return <Error statusCode={404} />;
  }

  const title = route && `${data.title || route.title} | Next.js`;
  const { tag } = getSlug(query);

  return (
    <FeedbackContext.Provider value={{ label: 'next-docs' }}>
      {tag && (
        <Head>
          <meta name="robots" content="noindex" />
        </Head>
      )}
      <Page title={title} description={false} sticky={!isMobile}>
        {route ? (
          <PageContent>
            <Sticky shadow>
              <SidebarMobile>
                <SidebarRoutes isMobile routes={routes} />
              </SidebarMobile>
            </Sticky>
            <Container>
              <div className="content">
                <Sidebar fixed>
                  <SidebarRoutes routes={routes} />
                </Sidebar>
                <DocsPage route={route} html={html} prevRoute={prevRoute} nextRoute={nextRoute} />
              </div>
              <style jsx>{`
                .content {
                  position: relative;
                  display: flex;
                  margin-top: 2rem;
                }

                @media (max-width: 950px) {
                  .content {
                    margin-top: 1rem;
                  }
                }

                /* Remove the top margin of the first heading in the sidebar */
                :global(.heading:first-child > h4) {
                  margin-top: 0;
                }
              `}</style>
            </Container>
            <SocialMeta
              title={title}
              url={`https://nextjs.org${asPath}`}
              image="/static/twitter-cards/documentation.png"
              description={data.description}
            />
          </PageContent>
        ) : (
          <Container>
            <div className="content">
              <aside>
                <Skeleton style={{ height: '2.5rem', margin: '1.5rem 0' }} />
                <Skeleton style={{ height: 'calc(100% - 5.5rem)' }} />
              </aside>
              <Skeleton style={{ maxWidth: '100%', margin: '1.5rem 0 0' }} />
            </div>

            <style jsx>{`
              aside {
                min-width: 300px;
                height: calc(((100vh - 2rem) - 81px) - 50px);
                padding-right: 1.5rem;
                margin-right: 1rem;
              }
              .content {
                position: relative;
                display: flex;
                margin-top: 2rem;
              }
            `}</style>
          </Container>
        )}
      </Page>
    </FeedbackContext.Provider>
  );
};

export async function getStaticPaths() {
  const tag = await getCurrentTag();
  const manifest = await fetchDocsManifest(tag);
  return { paths: getPaths(manifest.routes), fallback: true };
}

export async function getStaticProps({ params }) {
  const { tag, slug } = getSlug(params);
  const currentTag = await getCurrentTag(tag);
  const manifest = await fetchDocsManifest(currentTag).catch(error => {
    // If a manifest wasn't found for a custom tag, show a 404 instead
    if (error.status === 404) return;
    throw error;
  });
  const route = manifest && findRouteByPath(slug, manifest.routes);

  if (!route) return { props: {} };

  const md = await getRawFileFromRepo(route.path, currentTag);
  const { content, data } = matter(md);
  const html = await markdownToHtml(route.path, tag, content);

  return { props: { routes: manifest.routes, data, route, html } };
}

export default Docs;
