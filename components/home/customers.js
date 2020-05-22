import Container from '../container';
import Button from '../button';
import SectionHeader from '../section-header';
import CaseStudiesSlider from '../case-studies/slider';
import ShowcasePreview from './showcase-preview';

export default function Customers() {
  return (
    <Container gray wide overflow center padding role="region" aria-labelledby="customers">
      <div className="case-studies-box">
        <CaseStudiesSlider />
        <style jsx>{`
          .case-studies-box {
            position: relative;
            margin-top: -8.5rem;
            margin-bottom: 4rem;
          }
        `}</style>
      </div>
      <SectionHeader
        anchor="showcases"
        id="customers"
        title="Who’s Using Next.js"
        description="We’re honored some of the most talented creatives out there build with Next.js"
      />
      <ShowcasePreview />
      <Button href="/showcase" invert>
        View Gallery
      </Button>
    </Container>
  );
}
