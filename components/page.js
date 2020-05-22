import PageContainer from './page-container';
import Header from './header';

export default function Page({ title, description, sticky, isOldDocs, children }) {
  return (
    <PageContainer title={title} description={description}>
      <Header sticky={sticky} isOldDocs={isOldDocs} />
      {children}
    </PageContainer>
  );
}
