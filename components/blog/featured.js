import Link from 'next/link';

import Container from '../container';
import Button from '../button';

export default ({ type, link, title, featuredImage, subtitle }) => (
  <div className="case-study">
    <style jsx>{`
      .case-study {
        display: flex;
        align-items: center;
        height: 380px;
        text-align: left;
        background-image: linear-gradient(to right, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0.25) 110%),
          url(${featuredImage});
        background-size: cover;
        background-position: center 30%;
        box-sizing: border-box;
      }
      .wrapper {
        display: flex;
        flex-direction: column;
        color: white;
        height: 100%;
        max-width: 560px;
        padding: 1rem 1rem 2rem 0;
        text-shadow: 0 2px 2rem rgba(0, 0, 0, 0.8);
      }
      .wrapper h2 {
        margin-bottom: 2rem;
        cursor: pointer;
      }
      .content {
        flex: 1;
        margin-top: 0;
        margin-bottom: 2rem;
      }
      .remove-shadow {
        text-shadow: none;
      }
      .post-type {
        display: block;
        text-transform: uppercase;
        font-size: 12px;
      }
      // CSS only media query for mobile
      @media screen and (max-width: 640px) {
        .case-study {
          height: 320px;
        }
      }
    `}</style>
    <Container small>
      <div className="wrapper">
        {type && <span className="post-type fw6">{type}</span>}
        <Link href={link}>
          <h2 className="f1 fw7">{title}</h2>
        </Link>
        <div className="content">{subtitle}</div>
        <div className="remove-shadow">
          <Button href={link} invert>
            Read More
          </Button>
        </div>
      </div>
    </Container>
  </div>
);
