import { SkipNavContent } from '@reach/skip-nav';

import Page from '../../components/page';
import Footer from '../../components/footer';
import Tabs from '../../components/tabs';

import Title from '../../components/showcase/title';
import List from '../../components/showcase/list';
import Filter from '../../components/showcase/filter';
import SiteDetail from '../../components/showcase/site-detail';
import SocialMeta from '../../components/social-meta';
import { ORG_NAME } from '../../lib/constants';
import { categories, mapping } from '../../showcase-manifest';

const HEADER_HEIGHT = 16 * 12;

function Showcase({ item }) {
  return (
    <Page title="Showcase | Next.js">
      <SocialMeta
        image="/static/twitter-cards/showcase.png"
        title="Showcase | Next.js"
        url="https://nextjs.org/showcase"
        description={`Meet hundreds of beautiful websites powered by Next.js by ${ORG_NAME}`}
      />
      <Tabs data={categories} anchor>
        {(onSelect, selectedId) => (
          <>
            <Title
              height={{
                desktop: HEADER_HEIGHT + 64,
                mobile: HEADER_HEIGHT + 64 + 32
              }}
            />
            <Filter onSelect={onSelect} selectedId={selectedId} />

            <div className="wrapList">
              <List category={selectedId} />
            </div>

            <style jsx>{`
              .wrapList {
                margin-top: 96px;
              }
              @media screen and (max-width: 640px) {
                .wrapList {
                  margin-top: 128px;
                }
              }
            `}</style>
          </>
        )}
      </Tabs>
      {item && mapping[item] && <SiteDetail siteData={mapping[item]} />}
      <SkipNavContent />
      <Footer />
    </Page>
  );
}

export async function getStaticProps() {
  return { props: {} };
}

export default Showcase;
