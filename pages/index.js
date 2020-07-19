import { SkipNavContent } from '@reach/skip-nav';
import { useAmp } from 'next/amp';

import Page from '../components/page';
import Footer from '../components/footer';

import Intro from '../components/home/intro';
import SocialMeta from '../components/social-meta';
import { ORG_NAME, DOCUMENT_URL } from '../lib/constants';

export default () => {
  const isAmp = useAmp();

  return (
    <Page>
      <SocialMeta
        image="/static/twitter-cards/home.jpg"
        title="Next.js非公式日本語翻訳ドキュメント"
        url={DOCUMENT_URL}
        description="Next.js ドキュメント非公式日本語翻訳サイト"
      />
      <SkipNavContent />
      <Intro isAmp={isAmp} />
      <Footer />
    </Page>
  );
};

export const config = {
  amp: 'hybrid'
};
