import { SkipNavContent } from '@reach/skip-nav';

import PageContainer from '../../components/page-container';
import withPure from '../../components/hoc/pure';
import Container from '../../components/container';
import DocumentationHeader from '../../components/docs/documentation-header';
import Markdown, { headings } from '../../components/docs/docs.mdx';
import Documentation, { components } from '../../components/docs/documentation';

const Content = withPure(() => <Markdown components={components} />);

export default () => (
  <PageContainer>
    <DocumentationHeader />
    <Container>
      <Documentation headings={headings}>
        <SkipNavContent />
        <Content />
      </Documentation>
    </Container>
  </PageContainer>
);

export const config = {
  amp: true
};
