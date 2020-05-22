import Container from '../container';
import SectionHeader from '../section-header';
import { ORG_NAME } from '../../lib/constants';

export default ({ height }) => {
  const defaultHeight = height.desktop || height.tablet || height.mobile || height;

  return (
    <Container center region="showcase">
      <div className="showcase-title">
        <style jsx>{`
          .showcase-title {
            display: flex;
            height: ${defaultHeight}px;
            padding-top: 48px;
            flex-direction: column;
            align-items: center;
            justify-content: flex-end;
          }
          @media screen and (max-width: 960px) {
            .showcase-title {
              height: ${height.tablet || defaultHeight}px;
            }
          }
          @media screen and (max-width: 640px) {
            .showcase-title {
              height: ${height.mobile || defaultHeight}px;
            }
          }
        `}</style>
        <SectionHeader
          id="showcase"
          title="Showcase"
          description={
            <span>
              Meet hundreds of beautiful websites <br className="display-mobile" />
              built with Next.js by {ORG_NAME}
            </span>
          }
        />
      </div>
    </Container>
  );
};
