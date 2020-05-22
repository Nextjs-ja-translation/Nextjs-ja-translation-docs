import { SkipNavContent } from '@reach/skip-nav';
import { useAmp } from 'next/amp';

import Page from '../components/page';
import Footer from '../components/footer';
import Notification from '../components/notification';

import Intro from '../components/home/intro';
import Demo from '../components/home/demo';
import Features from '../components/home/features';
import Customers from '../components/home/customers';
import Newsletter from '../components/home/newsletter';
import Learn from '../components/home/learn';
import SocialMeta from '../components/social-meta';
import { ORG_NAME } from '../lib/constants';

export default () => {
  const isAmp = useAmp();

  return (
    <Page title={`Next.js by ${ORG_NAME} - The React Framework`}>
      <SocialMeta
        image="/static/twitter-cards/home.jpg"
        title={`Next.js by ${ORG_NAME} - The React Framework`}
        url="https://nextjs.org"
        description={`Production grade React applications that scale. The world’s leading companies use Next.js by ${ORG_NAME} to build static and dynamic websites and web applications.`}
      />
      <SkipNavContent />
      <Notification href="/blog/next-9-4" title="Next 9.4 is out!" titleMobile="Next 9.4 is out!">
        <b>Next 9.4 is out!</b> — React Fast Refresh, Incremental Static Regeneration, New
        Environment Support, Built-in Fetch, and more!
        <span className="highlight">Learn More →</span>
      </Notification>
      <Intro isAmp={isAmp} />
      <Demo />
      <Features />
      <Customers />
      <Learn />
      <Newsletter />
      <Footer />
    </Page>
  );
};

export const config = {
  amp: 'hybrid'
};
